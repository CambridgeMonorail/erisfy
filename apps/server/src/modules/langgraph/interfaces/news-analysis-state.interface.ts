// Import from the openai interfaces module
import { 
  NewsArticle, 
  StockInfo, 
  StructuredLLMResponse, 
  MarketSentiment 
} from '../../openai/interfaces/news-analysis.interface';

/**
 * State interface for the news analysis workflow
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
  sentiment?: MarketSentiment;

  /** List of affected market sectors */
  sectors?: string[];

  /** Stock market data for primary ticker (optional) */
  stockInfo?: StockInfo;

  /** Stock market data for all tickers */
  stockInfoMap?: Record<string, StockInfo>;

  /** Any error that occurred during processing */
  error?: string;

  /** Flag indicating if we're using the default top news query */
  isDefaultQuery?: boolean;
  
  /** Flag to bypass cache for testing */
  bypassCache?: boolean;
}
