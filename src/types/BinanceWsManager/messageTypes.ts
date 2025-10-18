export interface BinanceCombinedStreamMessage<T = any> {
    stream: string;
    data: T;
}

export interface BinanceTradeData {
    e: 'trade';
    E: number;
    s: string;
    t: number;
    p: string;
    q: string;
    b: number;
    a: number;
    T: number;
    m: boolean;
    M: boolean;
}

export interface BinanceDepthUpdate {
    e: 'depthUpdate';
    E: number;
    s: string;
    U: number;
    u: number;
    b: [string, string][];
    a: [string, string][];
}