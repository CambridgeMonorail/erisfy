import { ApiProperty } from '@nestjs/swagger';

class NewsArticleDto {
  @ApiProperty({
    description: 'The headline or title of the news article',
    example: 'Tesla Beats Q4 Earnings Expectations, Plans New Model Launch'
  })
  title: string;

  @ApiProperty({
    description: 'A summary or excerpt of the article content',
    example: 'Tesla reported Q4 earnings of $2.50 per share, beating analyst estimates of $2.20 per share...'
  })
  description: string;

  @ApiProperty({
    description: 'Direct link to the full article',
    required: false,
    example: 'https://reuters.com/articles/tesla-q4-earnings-2024'
  })
  url?: string;

  @ApiProperty({
    description: 'ISO 8601 formatted publication date',
    required: false,
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

  @ApiProperty({
    description: 'Stock ticker symbol if specified in the request or extracted from news',
    required: false,
    example: 'TSLA'
  })
  ticker?: string;

  @ApiProperty({
    description: 'Collection of news articles related to the query',
    type: [NewsArticleDto],
    required: false,
    example: [{
      title: 'Tesla Beats Q4 Earnings Expectations',
      description: 'Tesla reported Q4 earnings of $2.50 per share...',
      url: 'https://reuters.com/articles/tesla-q4-earnings-2024',
      publishedAt: '2024-02-14T15:30:00Z'
    }]
  })
  articles?: NewsArticleDto[];

  @ApiProperty({
    description: 'AI-generated analysis summarizing key insights from the news articles',
    required: false,
    example: 'Tesla reported strong Q4 earnings, beating analyst expectations. Key highlights include...'
  })
  analysis?: string;

  @ApiProperty({
    description: 'Current market data for the related stock',
    type: StockInfoDto,
    required: false
  })
  stockInfo?: StockInfoDto;

  @ApiProperty({
    description: 'Error message if the analysis process encountered issues',
    required: false,
    example: 'Unable to fetch stock data: API rate limit exceeded'
  })
  error?: string;
}
