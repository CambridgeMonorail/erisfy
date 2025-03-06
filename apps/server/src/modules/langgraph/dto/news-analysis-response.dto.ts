import { ApiProperty } from '@nestjs/swagger';

class NewsArticleDto {
  @ApiProperty({ description: 'Article title' })
  title: string;

  @ApiProperty({ description: 'Article description or summary' })
  description: string;

  @ApiProperty({ description: 'URL to the article', required: false })
  url?: string;

  @ApiProperty({ description: 'Publication date', required: false })
  publishedAt?: string;
}

class StockInfoDto {
  @ApiProperty({ description: 'Stock ticker symbol' })
  ticker: string;

  @ApiProperty({ description: 'Current stock price' })
  price: number;

  @ApiProperty({ description: 'Price change' })
  change: number;

  @ApiProperty({ description: 'Percentage price change' })
  changePercent: number;

  @ApiProperty({ description: 'Timestamp of the stock data' })
  timestamp: string;
}

export class NewsAnalysisResponseDto {
  @ApiProperty({ description: 'Original search query' })
  query: string;

  @ApiProperty({ description: 'Stock ticker symbol', required: false })
  ticker?: string;

  @ApiProperty({
    description: 'Retrieved news articles',
    type: [NewsArticleDto],
    required: false
  })
  articles?: NewsArticleDto[];

  @ApiProperty({
    description: 'AI-generated analysis of the news',
    required: false
  })
  analysis?: string;

  @ApiProperty({
    description: 'Stock market data',
    type: StockInfoDto,
    required: false
  })
  stockInfo?: StockInfoDto;

  @ApiProperty({
    description: 'Error message if analysis failed',
    required: false
  })
  error?: string;
}
