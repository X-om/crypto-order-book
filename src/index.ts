import express from 'express';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer } from 'http';
import cookieParser from 'cookie-parser';
import { PORT } from './env';
import routes from './routes';
import cors from 'cors';
import { binaryToJSONParser } from './utils/formatter';
import BinanceWsManager from './services/binanceManager';
import UserSubscriptionManager from './services/userSubscription';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));

const binanceWs = BinanceWsManager.getInstance();
binanceWs.connect();

const userManager = UserSubscriptionManager.getInstance(binanceWs);

const server = createServer(app);
const wss = new WebSocketServer({ server: server, path: '/ws' });


// * Express Routes * //
app.get('/health', (_, res) => res.send('server is healthy'));
app.use('/api', routes);


// * WebSocket Connection Handling * //
wss.on('connection', async (ws: WebSocket) => {
    console.info('New client connected');

    ws.on('message', (rawData: string) => {
        const { type, symbol } = binaryToJSONParser(rawData) as { type: 'subscribe' | 'unsubscribe', symbol: string; };
        if (type === 'subscribe') userManager.subscribeUser(ws, symbol);
        if (type === 'unsubscribe') userManager.unsubscribeUser(ws, symbol);
    });

    ws.on('close', () => {
        userManager.unsubscribeUserFromAll(ws);
    });

});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`WebSocket server is running on ws://localhost:${PORT}/ws`);
});
