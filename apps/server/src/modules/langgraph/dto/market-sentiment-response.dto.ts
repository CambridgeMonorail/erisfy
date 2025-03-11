import { ApiProperty } from '@nestjs/swagger';

export type SentimentType = 'bullish' | 'bearish' | 'neutral';

export class StockInfo {
  @ApiProperty()
  ticker: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  dayChange: number;

  @ApiProperty()
  dayChangePercent: number;

  @ApiProperty()
  marketCap: number;

  @ApiProperty()
  time: string;
}

export class StructuredAnalysis {
  @ApiProperty()
  analysis: string;

  @ApiProperty({ type: [String] })
  sectors: string[];

  @ApiProperty({ enum: ['bullish', 'bearish', 'neutral'] })
  marketSentiment: SentimentType;

  @ApiProperty({ type: [String] })
  tickers: string[];
}

export class MarketSentimentResponseDto {
  @ApiProperty({ type: StructuredAnalysis })
  structuredAnalysis: StructuredAnalysis;

  @ApiProperty({ enum: ['bullish', 'bearish', 'neutral'] })
  sentiment: SentimentType;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'object', $ref: '#/components/schemas/StockInfo' } })
  stockInfoMap: Record<string, StockInfo>;

  @ApiProperty({ type: StockInfo })
  stockInfo: StockInfo;

  @ApiProperty({ required: false })
  error?: string;
}
