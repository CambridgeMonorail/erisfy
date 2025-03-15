export type SentimentType = 'bullish' | 'bearish' | 'neutral';

export type StockInfo = {
  ticker: string;
  price: number;
  dayChange: number;
  dayChangePercent: number;
  marketCap: number;
  time: string;
  error?: string;
};

export type StructuredAnalysis = {
  analysis: string;
  sectors: string[];
  marketSentiment: SentimentType;
  tickers: string[];
};

export type MarketData = {
  structuredAnalysis: StructuredAnalysis;
  sentiment: SentimentType;
  stockInfoMap: Record<string, StockInfo>;
  stockInfo: StockInfo;
};
