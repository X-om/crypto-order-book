import BinanceWsManager from './binanceManager';
import WebSocket from 'ws';
class UserSubscriptionManager {
    private static instance: UserSubscriptionManager;
    private subscriptions = new Map<string, Set<WebSocket>>();

    private constructor(private binanceWs: BinanceWsManager) { };

    public static getInstance(binanceWs: BinanceWsManager) {
        if (!UserSubscriptionManager.instance) UserSubscriptionManager.instance = new UserSubscriptionManager(binanceWs);
        return UserSubscriptionManager.instance;
    }

    public subscribeUser(ws: WebSocket, symbol: string) {
        if (!this.subscriptions.has(symbol)) this.subscriptions.set(symbol, new Set());
        this.subscriptions.get(symbol)!.add(ws);

        if (this.subscriptions.get(symbol)!.size === 1) {
            this.binanceWs.subscribe(symbol.replace('/', 'USDT'));
            this.binanceWs.on(symbol.replace('/', 'USDT'), (data) => {
                this.emitToUsers(symbol, data);
            });
        }
    };

    unsubscribeUser(ws: WebSocket, symbol: string) {
        const set = this.subscriptions.get(symbol);
        if (!set) return;
        set.delete(ws);

        if (set.size === 0) {
            this.binanceWs.unsubscribe(symbol.replace('/', 'USDT'));
            this.binanceWs.removeAllListeners(symbol.replace('/', 'USDT'));
        }
    }

    private emitToUsers(symbol: string, data: unknown) {
        const users = this.subscriptions.get(symbol);
        if (!users) return;
        users.forEach(ws => (ws.readyState === WebSocket.OPEN) && ws.send(JSON.stringify(data)));
    }

    public unsubscribeUserFromAll(ws: WebSocket) {
        for (const [symbol, set] of this.subscriptions.entries()) {
            if (set.has(ws)) {
                set.delete(ws);
                if (set.size === 0) {
                    const binanceSymbol = symbol.replace('/', 'USDT').toLowerCase();
                    this.binanceWs.unsubscribe(binanceSymbol);
                    this.binanceWs.removeAllListeners(binanceSymbol);
                    this.subscriptions.delete(symbol);
                }
            }
        }
    }
}

export default UserSubscriptionManager;