import { faker } from '@faker-js/faker';

export interface StockData {
  ticker: string;
  companyName: string;
  sector: string;
  industry: string;
  country: string;
  marketCap: number;
  currentPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  volume: number;
  week52High: number;
  week52Low: number;
  dividendYield: number;
  peRatio: number;
  epsGrowth: number;
  roe: number;
  roa: number;
  profitabilityRatios: number[];
  news: { headline: string; date: string }[];
  events: { event: string; date: string }[];
  historicalPerformance: { date: string; price: number }[];
  peers: { ticker: string; companyName: string; metric: number }[];
}

export const generateMockData = (count: number): StockData[] => {
  const data: StockData[] = [];

  for (let i = 0; i < count; i++) {
    const currentPrice = parseFloat(faker.finance.amount());
    const priceChange = parseFloat(faker.finance.amount());
    const priceChangePercentage = parseFloat(((priceChange / currentPrice) * 100).toFixed(2));

    data.push({
      ticker: faker.finance.currencyCode(),
      companyName: faker.company.name(),
      sector: faker.commerce.department(),
      industry: faker.commerce.product(),
      country: faker.address.country(),
      marketCap: parseFloat(faker.finance.amount()),
      currentPrice,
      priceChange,
      priceChangePercentage,
      volume: parseInt(faker.finance.amount(), 10),
      week52High: parseFloat(faker.finance.amount()),
      week52Low: parseFloat(faker.finance.amount()),
      dividendYield: parseFloat(faker.finance.amount()),
      peRatio: parseFloat(faker.finance.amount()),
      epsGrowth: parseFloat(faker.finance.amount()),
      roe: parseFloat(faker.finance.amount()),
      roa: parseFloat(faker.finance.amount()),
      profitabilityRatios: [parseFloat(faker.finance.amount()), parseFloat(faker.finance.amount()), parseFloat(faker.finance.amount())],
      news: [
        { headline: faker.lorem.sentence(), date: faker.date.recent().toISOString() },
        { headline: faker.lorem.sentence(), date: faker.date.recent().toISOString() },
      ],
      events: [
        { event: faker.lorem.words(), date: faker.date.future().toISOString() },
        { event: faker.lorem.words(), date: faker.date.future().toISOString() },
      ],
      historicalPerformance: [
        { date: faker.date.past().toISOString(), price: parseFloat(faker.finance.amount()) },
        { date: faker.date.past().toISOString(), price: parseFloat(faker.finance.amount()) },
        { date: faker.date.past().toISOString(), price: parseFloat(faker.finance.amount()) },
      ],
      peers: [
        { ticker: faker.finance.currencyCode(), companyName: faker.company.name(), metric: parseFloat(faker.finance.amount()) },
        { ticker: faker.finance.currencyCode(), companyName: faker.company.name(), metric: parseFloat(faker.finance.amount()) },
      ],
    });
  }

  return data;
};
