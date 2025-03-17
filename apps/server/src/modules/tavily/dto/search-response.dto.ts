import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * Represents a single search result from Tavily API
 */
export class SearchResult {
  @ApiProperty({
    description: 'The title of the search result'
  })
  title: string;

  @ApiProperty({
    description: 'The URL of the search result'
  })
  url: string;

  @ApiProperty({
    description: 'The text content of the search result'
  })
  content: string;

  @ApiPropertyOptional({
    description: 'A brief description or summary of the content'
  })
  description?: string;

  @ApiProperty({
    description: 'The score or relevance ranking of the result (0-1)'
  })
  score: number;

  @ApiPropertyOptional({
    description: 'Raw content if requested, null by default'
  })
  raw_content: null | string;

  @ApiPropertyOptional({
    description: 'The publication date of the article'
  })
  published_date?: string;

  @ApiPropertyOptional({
    description: 'The source/author of the article'
  })
  source?: string;
}

/**
 * Data Transfer Object for Tavily search responses
 */
export class SearchResponseDto {
  @ApiProperty({
    description: 'The search query that was executed'
  })
  query: string;

  @ApiPropertyOptional({
    description: 'Generated answer if include_answer was requested'
  })
  answer?: string;

  @ApiProperty({
    description: 'List of search results, ranked by relevancy',
    type: [SearchResult]
  })
  results: SearchResult[];

  @ApiProperty({
    description: 'Array of image URLs and descriptions if requested',
    type: [Object]
  })
  images: Array<{
    url: string;
    description?: string;
  }>;

  @ApiProperty({
    description: 'Time taken to complete the request in seconds'
  })
  response_time: string;
}
