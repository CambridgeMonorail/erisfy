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
 * Interface for news analysis state
 * Contains both input articles and resulting analysis
 */
export interface NewsAnalysisState {
  /**
   * Array of news articles to analyze
   */
  articles: NewsArticle[];

  /**
   * The resulting analysis output
   */
  analysis: string;

  /**
   * Optional error message if analysis fails
   */
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
