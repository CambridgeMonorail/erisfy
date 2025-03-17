import { faker } from '@faker-js/faker';
import type { MarketSector } from '@erisfy/api';

const SECTORS: MarketSector[] = [
  "Energy",
  "Materials",
  "Industrials",
  "Utilities",
  "Healthcare",
  "Financials",
  "Consumer Discretionary",
  "Consumer Staples",
  "Information Technology",
  "Communication Services",
  "Real Estate"
];

const INDUSTRIES = ['Software', 'Banking', 'Pharmaceuticals', 'Oil & Gas'] as const;
const COUNTRIES = ['USA', 'Canada', 'UK', 'Germany'] as const;

type Industry = (typeof INDUSTRIES)[number];
type Country = (typeof COUNTRIES)[number];

export type StockData = {
  ticker: string;
  companyName: string;
  sector: MarketSector;
  industry: Industry;
  country: Country;
  currentPrice: number;
  marketCap: number;
  historicalPerformance: Array<{
    date: string;
    value: number;
  }>;
};

/**
 * Generates an array of mock stock data for testing purposes.
 * @param count - The number of mock stock entries to generate
 * @returns An array of StockData objects
 * @throws {Error} If count is negative
 */
export const generateMockData = (count: number): StockData[] => {
  if (count < 0) throw new Error('Count must be non-negative');

  return Array.from({ length: count }, () => ({
    ticker: faker.finance.currencyCode(),
    companyName: faker.company.name(),
    sector: faker.helpers.arrayElement(SECTORS),
    industry: faker.helpers.arrayElement(INDUSTRIES),
    country: faker.helpers.arrayElement(COUNTRIES),
    currentPrice: faker.number.float({ min: 10, max: 1000, fractionDigits: 2 }),
    marketCap: faker.number.float({ min: 1e6, max: 1e12, fractionDigits: 2 }),
    historicalPerformance: generateHistoricalData(30),
  }));
};

/**
 * Generates historical performance data for a given number of days
 * @param days - Number of days of historical data to generate
 * @returns Array of daily price data points
 */
const generateHistoricalData = (days: number) => {
  const baseValue = Number(faker.number.float({ min: 100, max: 1000 }).toFixed(2));
  return Array.from({ length: days }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
    value: Number((baseValue * (1 + faker.number.float({ min: -0.1, max: 0.1 }))).toFixed(2))
  }));
};

/**
 * Retrieves historical performance data from the first stock in an array
 * @param stocks - Array of StockData objects
 * @returns Historical performance data or empty array if no stocks provided
 */
export const getHistoricalPerformance = (
  stocks: StockData[]
): Array<{ date: string; price: number }> => {
  if (!Array.isArray(stocks) || stocks.length === 0) return [];

  return stocks[0].historicalPerformance.map(({ date, value }) => ({
    date,
    price: value
  }));
};
