import { faker } from '@faker-js/faker';

export type MarketInsight = {
  category: 'Market Trend' | 'Sector Movement';
  text: string;
  trend: 'positive' | 'negative';
};

export function generateMockInsights(): MarketInsight[] {
  const insights = [];
  for (let i = 0; i < 5; i++) {
    insights.push({
      category: faker.helpers.arrayElement(['Market Trend', 'Sector Movement']),
      text: faker.lorem.sentence(),
      trend: faker.helpers.arrayElement(['positive', 'negative']),
    });
  }
  return insights;
}
