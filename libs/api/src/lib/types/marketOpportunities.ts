import { MarketSector } from './marketInsights';

export interface StockData {
  ticker: string;
  companyName: string;
  sector: MarketSector;
  industry: string;
  country: string;
  currentPrice: number;
  marketCap: number;
  historicalPerformance: {
    date: string;
    value: number;
  }[];
}

export interface MarketOpportunity {
  stock: StockData;
  score: number;
  reasons: string[];
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface MarketOpportunitiesResponse {
  opportunities: MarketOpportunity[];
  timestamp: string;
  sectors: MarketSector[];
}
