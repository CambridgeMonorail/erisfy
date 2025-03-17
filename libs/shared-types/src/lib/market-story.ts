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

// A single market story
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

// The overall data structure (e.g., for a given day)
export interface MarketData {
  id: string;
  date: string;
  stories: MarketStory[];
  createdAt: string;
  updatedAt: string;
}
