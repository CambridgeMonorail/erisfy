export type SentimentType = 'bullish' | 'bearish' | 'neutral';

export type StockInfo = {
  ticker: string;
  price: number;
  dayChange: number;
  dayChangePercent: number;
  marketCap: number;
  time: string;
};

export type MarketData = {
  structuredAnalysis: {
    analysis: string;
    sectors: string[];
    marketSentiment: SentimentType;
    tickers: string[];
  };
  sentiment: SentimentType;
  stockInfoMap: Record<string, StockInfo>;
  stockInfo: StockInfo;
};
