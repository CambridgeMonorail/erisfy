import { MarketInsightsResponse, InsightCategory, MarketTrend } from '../../types/market.types';

export const DEFAULT_MARKET_INSIGHTS: Omit<MarketInsightsResponse, 'lastUpdated'> = {
  insights: [
    {
      category: 'Market Trend' as InsightCategory,
      text: 'AAPL showing strong upward momentum',
      trend: 'positive' as MarketTrend
    },
    {
      category: 'Sector Movement' as InsightCategory,
      text: 'Tech sector remains stable',
      trend: 'positive' as MarketTrend
    }
  ]
};

// Type for mock resources (you might want to create a proper type for this in market.types.ts)
type MockResource = {
  id: string;
  symbol: string;
  price: number;
};

export const DEFAULT_MOCK_RESOURCES: MockResource[] = [
  { id: '1', symbol: 'MOCK-AAPL', price: 150 },
  { id: '2', symbol: 'MOCK-MSFT', price: 280 }
];

export const MOCK_STOCKS_DATA = {
  'AAPL': { id: 'aapl', symbol: 'AAPL', price: 150, name: 'Apple Inc.' },
  'MSFT': { id: 'msft', symbol: 'MSFT', price: 280, name: 'Microsoft Corporation' },
  'GOOGL': { id: 'googl', symbol: 'GOOGL', price: 2800, name: 'Alphabet Inc.' }
};

export const MOCK_WATCHLISTS = [
  { id: '1', name: 'Tech Stocks', stocks: ['AAPL', 'MSFT', 'GOOGL'] },
  { id: '2', name: 'Market Leaders', stocks: ['AAPL', 'MSFT'] }
];
