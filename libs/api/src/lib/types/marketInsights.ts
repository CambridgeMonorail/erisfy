// Define the allowed market sectors as a union type
export type MarketSector =
  | "Energy"
  | "Materials"
  | "Industrials"
  | "Utilities"
  | "Healthcare"
  | "Financials"
  | "Consumer Discretionary"
  | "Consumer Staples"
  | "Information Technology"
  | "Communication Services"
  | "Real Estate"
  | "Overall stock market"
  | "Bond market"
  | "Automotive sector"
  | "Multiple sectors"
  | "Overall U.S. stock market"
  | "Equity market"
  | "Commodity market"
  | "General financial market";

// Define a type for an individual market story
export interface MarketStory {
  id: string;
  title: string;
  one_line_summary: string;
  whats_happening: string;
  market_impact: string;
  market_sector: MarketSector;
  marketDataRecordId: string;
  createdAt: string;
  updatedAt: string;
}

// Define the overall data structure containing an array of stories, including a date field
export interface MarketDataInsights {
  id: string;
  date: string; // e.g., "2025-02-03"
  createdAt: string;
  updatedAt: string;
  stories: MarketStory[];
}

// Define a filter type for MarketDataInsights
export type MarketDataInsightsFilter = {
  date?: string;
  market_sector?: MarketSector;
};

// Define DTOs for creating and updating MarketDataInsights
export type CreateMarketDataInsightsDto = Omit<MarketDataInsights, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateMarketDataInsightsDto = Partial<Omit<MarketDataInsights, 'id' | 'createdAt' | 'updatedAt'>>;
