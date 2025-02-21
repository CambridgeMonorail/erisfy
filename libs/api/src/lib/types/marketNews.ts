export interface MarketNewsStory {
  id: string;
  title: string;
  one_line_summary: string;
  whats_happening: string;
  market_impact: string;
  market_sector: string;
  marketDataRecordId: string;
}

export interface MarketNewsRecord {
  id: string;
  date: string;
  createdAt: string;
  stories: MarketNewsStory[];
}

export interface TriggerUpdateResponse {
  message: string;
}
