import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Data Transfer Object for Tavily search requests
 */
export class SearchRequestDto {
  /**
   * The search query to send to Tavily API
   * @example "today financial market headlines"
   */
  @ApiProperty({
    description: 'The search query to execute with Tavily',
    example: 'today financial market headlines',
    required: true
  })
  query: string;

  /**
   * The category of the search
   * @example "general"
   */
  @ApiPropertyOptional({
    description: 'The category of the search',
    enum: ['general', 'news'],
    default: 'general'
  })
  topic?: 'general' | 'news';

  /**
   * The depth of search to perform
   * @example "basic"
   */
  @ApiPropertyOptional({
    description: 'The depth of the search. A basic search costs 1 API Credit, while an advanced search costs 2 API Credits',
    enum: ['basic', 'advanced'],
    default: 'basic'
  })
  search_depth?: 'basic' | 'advanced';

  /**
   * Maximum number of results to return
   * @example 5
   */
  @ApiPropertyOptional({
    description: 'The maximum number of search results to return',
    example: 5,
    default: 5,
    minimum: 0,
    maximum: 20
  })
  max_results?: number;

  /**
   * Time range to filter results
   * @example "day"
   */
  @ApiPropertyOptional({
    description: 'The time range back from the current date to filter results',
    enum: ['day', 'week', 'month', 'year', 'd', 'w', 'm', 'y']
  })
  time_range?: 'day' | 'week' | 'month' | 'year' | 'd' | 'w' | 'm' | 'y';

  /**
   * Number of days back to include (only for news topic)
   * @example 3
   */
  @ApiPropertyOptional({
    description: 'Number of days back from the current date to include. Available only if topic is news',
    example: 3,
    default: 3,
    minimum: 0
  })
  days?: number;

  /**
   * Whether to include an AI-generated answer with the results
   * @example false
   */
  @ApiPropertyOptional({
    description: 'Include an LLM-generated answer to the provided query. basic or true returns a quick answer. advanced returns a more detailed answer',
    example: false,
    default: false
  })
  include_answer?: boolean;

  /**
   * Whether to include raw HTML content in results
   * @example false
   */
  @ApiPropertyOptional({
    description: 'Include the cleaned and parsed HTML content of each search result',
    example: false,
    default: false
  })
  include_raw_content?: boolean;

  /**
   * Whether to include image search results
   * @example false
   */
  @ApiPropertyOptional({
    description: 'Also perform an image search and include the results in the response',
    example: false,
    default: false
  })
  include_images?: boolean;

  /**
   * Whether to include descriptions for images
   * @example false
   */
  @ApiPropertyOptional({
    description: 'When include_images is true, also add a descriptive text for each image',
    example: false,
    default: false
  })
  include_image_descriptions?: boolean;

  /**
   * List of domains to specifically include in search results
   * @example ["wsj.com", "bloomberg.com"]
   */
  @ApiPropertyOptional({
    description: 'A list of domains to specifically include in the search results',
    example: [],
    type: [String]
  })
  include_domains?: string[];

  /**
   * List of domains to exclude from search results
   * @example ["reddit.com", "twitter.com"]
   */
  @ApiPropertyOptional({
    description: 'A list of domains to specifically exclude from the search results',
    example: ['reddit.com', 'twitter.com'],
    type: [String]
  })
  exclude_domains?: string[];
}
