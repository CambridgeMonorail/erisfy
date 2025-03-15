export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  url?: string;
  source?: string;
  publishedAt?: string;
  sentiment?: 'positive' | 'negative' | 'neutral';
}
