import { NewsArticle, StockInfo } from '../../openai/interfaces/news-analysis.interface';

/**
 * Represents the state data that gets passed between agents during news analysis operations
 * This state object maintains the context and intermediate results throughout the analysis pipeline
 */
export interface NewsAnalysisState {
  /** The search query or topic for news analysis */
  query: string;
  /** Optional stock ticker symbol when analysis is related to a specific stock */
  ticker?: string;
  /** Collection of news articles retrieved for analysis */
  articles?: NewsArticle[];
  /** Generated analysis text based on the processed news articles */
  analysis?: string;
  /** Relevant stock information when available */
  stockInfo?: StockInfo;
}
