import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NewsArticle } from '../../openai/interfaces/news-analysis.interface';

export class NewsArticleDto implements NewsArticle {
  @ApiProperty({
    description: 'The title of the news article',
    example: 'Tesla Beats Q4 Earnings Expectations'
  })
  title: string;

  @ApiProperty({
    description: 'The description or content of the news article',
    example: 'Tesla reported Q4 earnings of $2.50 per share, surpassing analyst estimates...'
  })
  description: string;

  @ApiPropertyOptional({
    description: 'URL to the source article',
    example: 'https://reuters.com/articles/tesla-q4-earnings-2024'
  })
  url?: string;

  @ApiPropertyOptional({
    description: 'Publication date of the article',
    example: '2024-02-14T15:30:00Z'
  })
  publishedAt?: string;
}

class StockInfoDto {
  @ApiProperty({
    description: 'The stock market symbol/ticker',
    example: 'TSLA'
  })
  ticker: string;

  @ApiProperty({
    description: 'Current market price of the stock',
    example: 189.25
  })
  price: number;

  @ApiProperty({
    description: 'Absolute price change since previous close',
    example: 2.75
  })
  change: number;

  @ApiProperty({
    description: 'Percentage price change since previous close',
    example: 1.48
  })
  changePercent: number;

  @ApiProperty({
    description: 'ISO 8601 timestamp of when the stock data was retrieved',
    example: '2024-02-14T15:30:00Z'
  })
  timestamp: string;
}

export class NewsAnalysisResponseDto {
  @ApiProperty({
    description: 'The search query used to find news articles',
    example: 'Tesla Q4 earnings'
  })
  query: string;

  @ApiPropertyOptional({
    description: 'Stock ticker symbols identified in the request or extracted from news',
    example: ['TSLA', 'RIVN'],
    type: [String]
  })
  tickers?: string[];

  @ApiPropertyOptional({
    description: 'Collection of news articles related to the query',
    type: [NewsArticleDto]
  })
  articles?: NewsArticleDto[];

  @ApiProperty({
    description: 'AI-generated analysis summarizing key insights from the news articles',
    example: 'Tesla\'s strong Q4 performance indicates continued market leadership in EVs. The earnings beat suggests robust demand and improving operational efficiency. This could have positive implications for the broader EV sector.'
  })
  analysis: string;

  @ApiPropertyOptional({
    description: 'Market sentiment derived from the analysis',
    enum: ['positive', 'negative', 'neutral'],
    example: 'positive'
  })
  sentiment?: 'positive' | 'negative' | 'neutral';

  @ApiPropertyOptional({
    description: 'List of market sectors affected',
    type: [String],
    example: ['Automotive', 'Technology']
  })
  sectors?: string[];

  @ApiPropertyOptional({
    description: 'Error message if analysis failed',
    example: 'Failed to fetch news data'
  })
  error?: string;

  @ApiPropertyOptional({
    description: 'Current market data for the related stocks',
    type: [StockInfoDto]
  })
  stockInfo?: StockInfoDto[];
}
