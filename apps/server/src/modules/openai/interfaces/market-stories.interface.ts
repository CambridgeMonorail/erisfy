/**
 * Interface for a market story as returned from OpenAI
 */
export interface MarketStory {
  /**
   * The title of the news story
   */
  title: string;

  /**
   * A one-line summary of the news story
   */
  one_line_summary: string;

  /**
   * Detailed explanation of what is happening
   */
  whats_happening: string;

  /**
   * Analysis of how this story might impact financial markets
   */
  market_impact: string;

  /**
   * The market sector(s) most likely to be affected
   */
  market_sector: string;
}

/**
 * Interface for the complete market stories response from OpenAI
 */
export interface MarketStoriesResponse {
  /**
   * Date of the market stories analysis in YYYY-MM-DD format
   */
  date: string;

  /**
   * Array of market stories
   */
  stories: MarketStory[];
}
