import { faker } from '@faker-js/faker';

interface StockData {
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
}

const generateMockData = (count: number): StockData[] => {
  const data: StockData[] = [];

  for (let i = 0; i < count; i++) {
    const currentPrice = parseFloat(faker.finance.amount(10, 1000, 2));
    const priceChange = parseFloat(faker.finance.amount(-50, 50, 2));
    const priceChangePercentage = parseFloat(((priceChange / currentPrice) * 100).toFixed(2));

    data.push({
      ticker: faker.finance.currencyCode(),
      companyName: faker.company.name(),
      sector: faker.commerce.department(),
      industry: faker.commerce.product(),
      country: faker.address.country(),
      marketCap: parseFloat(faker.finance.amount(1000000, 1000000000, 0)),
      currentPrice,
      priceChange,
      priceChangePercentage,
      volume: parseInt(faker.finance.amount(1000, 1000000, 0), 10),
      week52High: parseFloat(faker.finance.amount(100, 1000, 2)),
      week52Low: parseFloat(faker.finance.amount(10, 100, 2)),
      dividendYield: parseFloat(faker.finance.amount(0, 10, 2)),
      peRatio: parseFloat(faker.finance.amount(5, 50, 2)),
    });
  }

  return data;
};

export { generateMockData, StockData };
