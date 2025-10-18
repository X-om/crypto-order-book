import express from 'express';
import routes from './routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import UserSubscriptionManager from './services/userSubscription';
import BinanceWsManager from './services/binanceManager';

import { WebSocketServer, WebSocket } from 'ws';
import { createServer, IncomingMessage } from 'http';
import { PORT } from './env';
import { binaryToJSONParser } from './utils/formatter';
import { extractIpMiddleware } from './middlewares/extractIpMiddleware';
import { apiLimiter } from './utils/limiters';
import { handleWsAuth } from './middlewares/ws/handleWsAuth';

const app = express();

app.set('trust proxy', false);

app.use(apiLimiter);
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));
app.use(extractIpMiddleware);

const binanceWs = BinanceWsManager.getInstance();
const userManager = UserSubscriptionManager.getInstance(binanceWs);

const server = createServer(app);
const wss = new WebSocketServer({ server: server, path: '/ws' });


// * Express Routes * //
app.get('/health', (_, res) => res.send('server is healthy'));
app.use('/api', routes);


// * WebSocket Connection Handling * //
wss.on('connection', async (ws: WebSocket, req: IncomingMessage) => {
    console.info('New client connected');

    const { success, message } = handleWsAuth(req, ws);
    if (!success) return ws.close(1008, message);
    console.info('WebSocket client authenticated successfully');

    ws.on('message', (rawData: string) => {
        const { type, symbol } = binaryToJSONParser(rawData) as { type: 'subscribe' | 'unsubscribe', symbol: string; };

        // TODO : => add zod validation for incoming message
        if (type === 'subscribe') userManager.subscribeUser(ws, symbol);
        if (type === 'unsubscribe') userManager.unsubscribeUser(ws, symbol);
    });

    ws.on('close', () => { userManager.unsubscribeUserFromAll(ws); });

});

setInterval(() => {
    console.clear();
    BinanceWsManager.getInstance().activeConnections();
}, 5000);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`WebSocket server is running on ws://localhost:${PORT}/ws`);
});
