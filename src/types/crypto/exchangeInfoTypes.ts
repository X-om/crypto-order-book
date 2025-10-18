export interface ExchangeInfo {
    timezone: string;
    serverTime: number;
    rateLimits: RateLimit[];
    exchangeFilters: ExchangeFilter[];
    symbols: Symbol[];
}

interface RateLimit {
    rateLimitType: string;
    interval: string;
    intervalNum: number;
    limit: number;
}

interface ExchangeFilter {
    filterType: string;
    [key: string]: any;
}

interface Symbol {
    symbol: string;
    status: string;
    baseAsset: string;
    baseAssetPrecision: number;
    quoteAsset: string;
    quotePrecision: number;
    quoteAssetPrecision: number;
    orderTypes: string[];
    icebergAllowed: boolean;
    ocoAllowed: boolean;
    quoteOrderQtyMarketAllowed: boolean;
    isSpotTradingAllowed: boolean;
    isMarginTradingAllowed: boolean;
    filters: SymbolFilter[];
    permissions: string[];
}

interface SymbolFilter {
    filterType: string;
    minPrice?: string;
    maxPrice?: string;
    tickSize?: string;
    minQty?: string;
    maxQty?: string;
    stepSize?: string;
    minNotional?: string;
    applyToMarket?: boolean;
    limit?: number;
    maxNumOrders?: number;
    maxNumAlgoOrders?: number;
    [key: string]: any;
}