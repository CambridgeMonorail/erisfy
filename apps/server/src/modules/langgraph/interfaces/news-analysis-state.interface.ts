/**
 * Interface for news articles to be analyzed
 */
export interface NewsArticle {
  title: string;
  description: string;
  url?: string;
  publishedAt?: string;
}

/**
 * Interface for stock market data
 */
export interface StockInfo {
  ticker: string;
  price: number;
  change: number;
  changePercent: number;
  timestamp: string;
}

/**
 * State interface for the LangGraph workflow
 * Maintains context and data between different nodes in the graph
 */
export interface NewsAnalysisState {
  /** Initial search query or topic */
  query: string;

  /** Stock ticker symbol (if known) */
  ticker?: string;

  /** Retrieved news articles */
  articles?: NewsArticle[];

  /** Generated analysis from LLM */
  analysis?: string;

  /** Stock market data */
  stockInfo?: StockInfo;

  /** Any error that occurred during processing */
  error?: string;
}
