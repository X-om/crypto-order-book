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

export interface BinanceDepthData {
  lastUpdateId: number;
  bids: [string, string][];
  asks: [string, string][];
}
