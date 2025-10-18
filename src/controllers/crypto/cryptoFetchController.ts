import { BINANCE_EXCHANGE_INFO_API_URL } from '../../env';
import { ExchangeInfo } from '../../types/crypto/exchangeInfoTypes';
import { ICustomRequest, IUnifiedResponse } from '../../types/customHttpTypes';

interface IGetAllCryptosResponse {
    symbol: string;
    rawSymbol: string;
};

export const getAllCryptosController = async (_req: ICustomRequest, res: IUnifiedResponse<Array<IGetAllCryptosResponse>>) => {
    try {
        const response = await fetch(BINANCE_EXCHANGE_INFO_API_URL);
        const data: ExchangeInfo = await response.json();

        if (!data || !data.symbols) return void res.status(500).json({ success: false, error: "Failed to fetch exchange info from Binance" });
        const cryptoSymbols = data.symbols.filter(symbolInfo => symbolInfo.quoteAsset === 'USDT' && symbolInfo.status === 'TRADING')
            .map(symbolInfo => ({ symbol: `${symbolInfo.baseAsset}/USDT`, rawSymbol: symbolInfo.symbol }));

        return void res.status(200).json({ success: true, data: cryptoSymbols });
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};