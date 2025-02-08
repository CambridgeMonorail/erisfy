import { faker } from '@faker-js/faker';
import { MarketDataInsights, MarketStory, MarketSector } from '@erisfy/api';

const marketSectors: MarketSector[] = [
  "Energy", "Materials", "Industrials", "Utilities", "Healthcare", 
  "Financials", "Consumer Discretionary", "Consumer Staples", 
  "Information Technology", "Communication Services", "Real Estate"
];

const createMarketStory = (): MarketStory => ({
  title: faker.lorem.sentence(),
  one_line_summary: faker.lorem.sentence(),
  whats_happening: faker.lorem.paragraph(),
  market_impact: faker.lorem.paragraph(),
  market_sector: faker.helpers.arrayElement(marketSectors)
});

export const createMarketDataInsights = (override?: Partial<MarketDataInsights>): MarketDataInsights => ({
  date: faker.date.future().toISOString().split('T')[0],
  stories: Array.from({ length: 5 }).map(createMarketStory),
  ...override
});
