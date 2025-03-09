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

  /** Raw analysis string from LLM */
  analysis: string;

  /** Structured analysis data when available */
  structuredAnalysis?: StructuredLLMResponse;

  /** Initial search query or topic (optional) */
  query?: string;

  /** Stock ticker symbols (if known) */
  tickers?: string[];

  /** Overall market sentiment */
  sentiment?: 'positive' | 'negative' | 'neutral';

  /** List of affected market sectors */
  sectors?: string[];

  /** Stock market data (optional) */
  stockInfo?: StockInfo;

  /** Any error that occurred during processing */
  error?: string;

  /** Flag indicating if we're using the default top news query */
  isDefaultQuery?: boolean;
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

/**
 * Interface for structured LLM analysis response
 */
export interface StructuredLLMResponse {
  /** Concise analysis of major market themes or events */
  analysis: string;
  /** List of affected market sectors */
  sectors: string[];
  /** Overall market sentiment */
  marketSentiment: 'positive' | 'negative' | 'neutral';
  /** List of mentioned stock tickers */
  tickers: string[];
}
