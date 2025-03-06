/**
 * Interface representing a news article for analysis
 */
export interface NewsArticle {
  /**
   * The title of the news article
   */
  title: string;

  /**
   * The description or content of the news article
   */
  description: string;

  /**
   * Optional URL to the source of the news article
   */
  url?: string;

  /**
   * Optional publication date of the article
   */
  publishedAt?: string;
}

/**
 * Interface for stock market data
 */
export interface StockInfo {
  /** Stock ticker symbol */
  ticker: string;
  /** Current stock price */
  price?: number;
  /** Price change */
  change?: number;
  /** Percentage price change */
  changePercent?: number;
  /** Timestamp of the stock data */
  timestamp?: string;
  /** Error message if fetch failed */
  error?: string;
  /** Additional error details */
  details?: string;
}

/**
 * Interface for news analysis state
 * Contains both input articles and resulting analysis
 */
export interface NewsAnalysisState {
  /** Retrieved news articles */
  articles: NewsArticle[];

  /** Generated analysis from LLM - starts empty and gets populated during processing */
  analysis: string;

  /** Initial search query or topic (optional) */
  query?: string;

  /** Stock ticker symbol (if known) */
  ticker?: string;

  /** Stock market data (optional) */
  stockInfo?: StockInfo;

  /** Any error that occurred during processing */
  error?: string;
}

/**
 * Interface for structured news analysis results
 */
export interface StructuredNewsAnalysis {
  /**
   * Overall market sentiment derived from the news
   */
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';

  /**
   * Key themes identified in the news
   */
  themes: string[];

  /**
   * Potential impacts on different stocks or sectors
   */
  marketImpacts: Array<{
    sector: string;
    impact: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;

  /**
   * Overall summary of the analysis
   */
  summary: string;
}
