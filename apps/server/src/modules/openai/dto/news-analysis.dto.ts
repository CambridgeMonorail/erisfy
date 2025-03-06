import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested } from 'class-validator';
import { NewsArticle, StructuredNewsAnalysis } from '../interfaces/news-analysis.interface';

/**
 * DTO for a news article in analysis requests
 */
export class NewsArticleDto implements NewsArticle {
  @ApiProperty({
    description: 'The title of the news article',
    example: 'Federal Reserve Signals Three Rate Cuts for 2024',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The description or content of the news article',
    example: 'Fed officials project 75 basis points in rate cuts this year as inflation continues to cool.',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'URL to the source of the news article',
    example: 'https://example.com/news/federal-reserve-rate-cuts',
  })
  @IsString()
  @IsOptional()
  url?: string;

  @ApiPropertyOptional({
    description: 'Publication date of the article',
    example: '2024-03-20T14:30:00Z',
  })
  @IsString()
  @IsOptional()
  publishedAt?: string;
}

/**
 * DTO for news analysis request
 */
export class NewsAnalysisRequestDto {
  @ApiProperty({
    description: 'Array of news articles to analyze',
    type: [NewsArticleDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => NewsArticleDto)
  articles: NewsArticleDto[];

  @ApiPropertyOptional({
    description: 'Custom prompt to guide the analysis',
    example: 'Focus on technology sector implications',
  })
  @IsString()
  @IsOptional()
  customPrompt?: string;
}

/**
 * DTO for news analysis response with raw text
 */
export class NewsAnalysisResponseDto {
  @ApiProperty({
    description: 'Analysis of the provided news articles',
    example: 'The Federal Reserve\'s signal of three rate cuts in 2024 is likely to positively impact technology and growth stocks as lower rates increase the present value of future earnings.',
  })
  analysis: string;
}

/**
 * DTO for structured news analysis response
 */
export class StructuredNewsAnalysisResponseDto implements StructuredNewsAnalysis {
  @ApiProperty({
    description: 'Overall market sentiment derived from the news',
    enum: ['positive', 'negative', 'neutral', 'mixed'],
    example: 'positive',
  })
  sentiment: 'positive' | 'negative' | 'neutral' | 'mixed';

  @ApiProperty({
    description: 'Key themes identified in the news',
    type: [String],
    example: ['Monetary Policy', 'Interest Rates', 'Inflation', 'Economic Growth'],
  })
  themes: string[];

  @ApiProperty({
    description: 'Potential impacts on different stocks or sectors',
    type: 'array',
    example: [
      {
        sector: 'Technology',
        impact: 'Lower rates increase the present value of future earnings, benefiting growth stocks',
        sentiment: 'positive'
      },
      {
        sector: 'Banking',
        impact: 'Lower interest rates may compress net interest margins',
        sentiment: 'negative'
      }
    ],
  })
  marketImpacts: Array<{
    sector: string;
    impact: string;
    sentiment: 'positive' | 'negative' | 'neutral';
  }>;

  @ApiProperty({
    description: 'Overall summary of the analysis',
    example: 'The Federal Reserve\'s dovish stance should generally benefit equities, particularly growth stocks, while potentially creating headwinds for the banking sector.',
  })
  summary: string;
}
