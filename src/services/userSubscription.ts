import WebSocket from 'ws';
import BinanceWsManager from './binanceManager';

class UserSubscriptionManager {
    private static instance: UserSubscriptionManager;
    private subscriptions = new Map<string, Set<WebSocket>>();
    private constructor(private binanceWs: BinanceWsManager) { }

    public static getInstance(binanceWs: BinanceWsManager) {
        if (!UserSubscriptionManager.instance)
            UserSubscriptionManager.instance = new UserSubscriptionManager(binanceWs);

        return UserSubscriptionManager.instance;
    }

    public subscribeUser(ws: WebSocket, symbol: string) {
        if (!this.subscriptions.has(symbol)) this.subscriptions.set(symbol, new Set());
        const set = this.subscriptions.get(symbol)!;
        set.add(ws);

        if (set.size === 1) {
            this.binanceWs.subscribe(symbol);
            const binanceSymbol = this.binanceWs.toBinanceSymbol(symbol);
            this.binanceWs.on(binanceSymbol, (data) => { this.emitToUsers(symbol, data); });
        } console.info(`[UserManager] ${set.size} user(s) subscribed to ${symbol}`);
    }

    public unsubscribeUser(ws: WebSocket, symbol: string) {
        const set = this.subscriptions.get(symbol);
        if (!set) return;
        set.delete(ws);

        if (set.size === 0) {
            this.binanceWs.unsubscribe(symbol);
            const binanceSymbol = this.binanceWs.toBinanceSymbol(symbol);

            this.binanceWs.removeAllListeners(binanceSymbol);
            this.subscriptions.delete(symbol);
        } console.info(`[UserManager] User unsubscribed from ${symbol}. Remaining: ${set.size}`);
    }

    private emitToUsers(symbol: string, data: unknown) {
        const users = this.subscriptions.get(symbol);
        if (!users) return;

        const json = JSON.stringify(data);
        users.forEach((ws) => { if (ws.readyState === WebSocket.OPEN) ws.send(json); });
    }

    public unsubscribeUserFromAll(ws: WebSocket) {
        for (const [symbol, set] of this.subscriptions.entries()) {
            if (set.has(ws)) {
                set.delete(ws);
                if (set.size === 0) {
                    const binanceSymbol = this.binanceWs.toBinanceSymbol(symbol);
                    this.binanceWs.unsubscribe(symbol);
                    this.binanceWs.removeAllListeners(binanceSymbol);
                    this.subscriptions.delete(symbol);
                }
            }
        } console.log('[UserManager] User disconnected, removed from all subscriptions.');
    }
}

export default UserSubscriptionManager;
