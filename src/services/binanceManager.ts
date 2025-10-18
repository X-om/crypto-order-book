import WebSocket from 'ws';
import EventEmitter from 'events';
import { binaryToJSONParser } from '../utils/formatter';
import { BinanceDepthUpdate, BinanceTradeData } from '../types/BinanceWsManager/messageTypes';

type BinanceMessage = BinanceDepthUpdate | BinanceTradeData;

class BinanceWsManager extends EventEmitter {
    private static instance: BinanceWsManager;
    private symbolSockets = new Map<string, WebSocket>();
    private constructor() { super(); }

    public static getInstance() {
        if (!BinanceWsManager.instance) BinanceWsManager.instance = new BinanceWsManager();
        return BinanceWsManager.instance;
    }

    public toBinanceSymbol(symbol: string): string { return symbol.replace('/', '').toLowerCase(); }

    public subscribe(symbol: string) {
        const binanceSymbol = this.toBinanceSymbol(symbol);
        if (this.symbolSockets.has(binanceSymbol)) return;

        const wsUrl = `wss://stream.binance.com:9443/ws/${binanceSymbol}@depth`;
        const ws = new WebSocket(wsUrl);

        ws.on('open', () => console.info(`[Binance WS] Subscribed to ${binanceSymbol}`));
        ws.on('message', (msg) => this.handleMessage(binanceSymbol, msg));
        ws.on('error', (err) => console.error(`[Binance WS] Error for ${binanceSymbol}:`, err));
        ws.on('close', (code, reason) => {
            console.info(`[Binance WS] Closed for ${binanceSymbol}. Code: ${code}, Reason: ${reason}`);
            this.symbolSockets.delete(binanceSymbol);
        });

        this.symbolSockets.set(binanceSymbol, ws);
    }

    public unsubscribe(symbol: string) {
        const binanceSymbol = this.toBinanceSymbol(symbol);
        const ws = this.symbolSockets.get(binanceSymbol);
        if (!ws) return;

        console.info(`[Binance WS] Unsubscribing from ${binanceSymbol}`);
        ws.close();
        this.symbolSockets.delete(binanceSymbol);
    }

    private handleMessage(symbol: string, msg: WebSocket.Data) {
        try {
            const parsed = binaryToJSONParser(String(msg)) as BinanceMessage;
            this.emit(symbol, parsed);
        } catch (err) {
            console.error(`[Binance WS] Failed to parse message for ${symbol}:`, err);
        }
    }

    public activeConnections(): void {
        const data = Array.from(this.symbolSockets.keys()).map((symbol) => ({ symbol, connectionStatus: 'connected' }));
        console.table(data);
    }
}

export default BinanceWsManager;
