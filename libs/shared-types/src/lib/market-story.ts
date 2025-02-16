// 1) A union of allowed market sectors
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

// 2) A single market story
export interface MarketStory {
  title: string;
  one_line_summary: string;
  whats_happening: string;
  market_impact: string;
  market_sector: MarketSector;
}

// 3) The overall data structure (e.g., for a given day)
export interface MarketData {
  date: string; // e.g., "2025-02-16"
  stories: MarketStory[];
}
