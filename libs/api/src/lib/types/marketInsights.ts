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
  | "Real Estate";

// Define a type for an individual market story
export interface MarketStory {
  title: string;
  one_line_summary: string;
  whats_happening: string;
  market_impact: string;
  market_sector: MarketSector;
}

// Define the overall data structure containing an array of stories, including a date field
export interface MarketDataInsights {
  date: string; // e.g., "2025-02-03"
  stories: MarketStory[];
}

// Define a filter type for MarketDataInsights
export type MarketDataInsightsFilter = {
  date?: string;
  market_sector?: MarketSector;
};

// Define DTOs for creating and updating MarketDataInsights
export type CreateMarketDataInsightsDto = Omit<MarketDataInsights, 'date'> & { date: string };
export type UpdateMarketDataInsightsDto = Partial<CreateMarketDataInsightsDto>;
