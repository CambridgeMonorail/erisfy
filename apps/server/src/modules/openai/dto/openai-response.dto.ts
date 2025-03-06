import { ApiProperty } from '@nestjs/swagger';
import { MarketStoriesResponse } from '../interfaces/market-stories.interface';

/**
 * DTO for OpenAI prompt response
 */
export class PromptResponseDto {
  @ApiProperty({
    description: 'The response text from OpenAI',
    example: 'Rising interest rates typically pressure stock valuations by increasing borrowing costs and discount rates applied to future earnings.',
  })
  response: string;
}

/**
 * DTO for content analysis response
 */
export class ContentAnalysisResponseDto {
  @ApiProperty({
    description: 'The analysis result from OpenAI',
    example: '{"sentiment":"negative","keyTopics":["interest rates","Federal Reserve","inflation"],"marketImplications":["Potential pressure on growth stocks","Favorable for financial sector"]}',
  })
  analysis: string;
}

/**
 * DTO for market stories response, extending the interface with Swagger metadata
 */
export class MarketStoriesResponseDto implements MarketStoriesResponse {
  @ApiProperty({
    description: 'The date of the market stories analysis',
    example: '2023-05-15',
  })
  date: string;

  @ApiProperty({
    description: 'Array of market stories',
    type: 'array',
    isArray: true,
  })
  stories: Array<{
    title: string;
    one_line_summary: string;
    whats_happening: string;
    market_impact: string;
    market_sector: string;
  }>;
}
