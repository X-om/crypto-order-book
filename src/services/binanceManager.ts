import { BINANCE_CRYPTO_ORDER_BOOK_API_URL } from './../env';
import WebSocket from 'ws';
import EventEmitter from 'events';
import { binaryToJSONParser } from '../utils/formatter';
import { BinanceCombinedStreamMessage, BinanceDepthData, BinanceTradeData } from '../types/BinanceWsManager/messageTypes';

class BinanceWsManager extends EventEmitter {
    private static instance: BinanceWsManager;
    private ws: WebSocket | null = null;
    private subscribedSymbols: Set<string> = new Set();

    private constructor() {
        super();
    }

    public static getInstance() {
        if (!BinanceWsManager.instance) BinanceWsManager.instance = new BinanceWsManager();
        return BinanceWsManager.instance;
    }
    public connect() {
        if (this.ws) return; // Don't create a new connection if one exists

        this.ws = new WebSocket(`${BINANCE_CRYPTO_ORDER_BOOK_API_URL}?streams=`);
        this.ws.on('open', () => console.info(`Connected to Binance WS`));
        this.ws.on('message', (msg) => this.handleMessage(msg));
        this.ws.on('error', (error) => console.error('WebSocket error:', error));
        this.ws.on('close', () => console.info('Disconnected from Binance WS'));
    }

    private handleMessage(msg: WebSocket.Data) {
        const data = binaryToJSONParser(String(msg)) as BinanceCombinedStreamMessage<BinanceTradeData | BinanceDepthData>;
        const symbol = data.stream?.split('@')[0].toUpperCase();

        this.emit(symbol, data.data);
    }

    public subscribe(symbol: string) {
        if (this.subscribedSymbols.has(symbol)) return;
        this.subscribedSymbols.add(symbol);
        this.updateBinanceStreams();
    }

    public unsubscribe(symbol: string) {
        this.subscribedSymbols.delete(symbol);
        this.updateBinanceStreams();
    }

    private updateBinanceStreams() {
        if (!this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const streams = Array.from(this.subscribedSymbols).map(s => `${s.toLowerCase()}@depth`).join('/');
        this.ws.close();
        this.ws = new WebSocket(`wss://stream.binance.com:9443/stream?streams=${streams}`);
        this.ws.on('message', (msg) => this.handleMessage(msg));
    }
}

export default BinanceWsManager;
