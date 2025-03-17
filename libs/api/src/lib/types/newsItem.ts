import { SentimentType } from './marketSentiment';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url?: string;
  source?: string;
  publishedAt?: string;
  sentiment?: SentimentType;
  relevance?: string[];
}
