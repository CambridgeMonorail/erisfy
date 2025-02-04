export type MarketTrend = 'positive' | 'negative';
export type InsightCategory = 'Market Trend' | 'Sector Movement';

export type MarketInsight = {
  category: InsightCategory;
  text: string;
  trend: MarketTrend;
};

export type MarketInsightsResponse = {
  insights: MarketInsight[];
  lastUpdated: string;
};
