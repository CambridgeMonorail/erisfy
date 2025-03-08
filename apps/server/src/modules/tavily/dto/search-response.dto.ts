/**
 * Data Transfer Object for Tavily search responses
 */
export interface SearchResponseDto {
  /**
   * The unique identifier for the search request
   */
  id: string;

  /**
   * The search query that was processed
   */
  query: string;

  /**
   * The results from the search
   */
  results: SearchResult[];

  /**
   * Answer generated from the search results (if requested)
   */
  answer?: string;

  /**
   * The total number of tokens used
   */
  tokens_used?: number;

  /**
   * Array of image URLs if any are included in the results
   */
  images: string[];

  /**
   * The time taken to process the search request in seconds
   */
  response_time: string;
}

/**
 * Represents a single search result from Tavily API
 */
export interface SearchResult {
  /**
   * The title of the search result
   */
  title: string;

  /**
   * The URL of the search result
   */
  url: string;

  /**
   * The text content of the search result
   */
  content: string;

  /**
   * The score or relevance ranking of the result (0-1)
   */
  score: number;

  /**
   * Raw content if requested, null by default
   */
  raw_content: string | null;
}
