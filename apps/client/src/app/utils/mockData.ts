import { faker } from '@faker-js/faker';

export type StockData = {
  ticker: string;
  companyName: string;
  sector: string;
  industry: string;
  country: string;
  currentPrice: number; // Changed from 'price' to 'currentPrice'
  marketCap: number;
  historicalPerformance: Array<{
    date: string;
    value: number;
  }>;
};

// Update the mock data generation to include all properties
export const generateMockData = (count: number): StockData[] => {
  return Array.from({ length: count }, (_, i) => ({
    ticker: `TICK${i}`,
    companyName: `Company ${i}`,
    sector: ['Technology', 'Finance', 'Healthcare', 'Energy'][Math.floor(Math.random() * 4)],
    industry: ['Software', 'Banking', 'Pharmaceuticals', 'Oil & Gas'][Math.floor(Math.random() * 4)],
    country: ['USA', 'Canada', 'UK', 'Germany'][Math.floor(Math.random() * 4)],
    currentPrice: Math.random() * 1000,
    marketCap: Math.random() * 1000000,
    historicalPerformance: Array.from({ length: 30 }, (_, j) => ({
      date: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
      value: Math.random() * 1000
    }))
  }));
};

/**
 * Filters the historical performance data from the first entry of the provided StockData array.
 * @param stocks - The array of StockData.
 * @returns The historical performance data of the first stock.
 */
export const getHistoricalPerformance = (stocks: StockData[]): { date: string; price: number }[] => {
  if (stocks.length === 0) return [];
  return stocks[0].historicalPerformance;
};
