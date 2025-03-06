import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AnalyzeNewsDto {
  @ApiProperty({
    description: 'News content to analyze',
    example: 'Company XYZ announced a 20% increase in quarterly profits today.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

export class NewsAnalysis {
  @ApiProperty({ description: 'Sentiment of the news content' })
  sentiment: string;

  @ApiProperty({ description: 'Key topics identified in the content' })
  keyTopics: string[];

  @ApiProperty({ description: 'Market implications derived from analysis' })
  marketImplications: string[];

  @ApiProperty({ description: 'Timestamp of the analysis' })
  timestamp: string;
}

export class AnalysisResponseDto {
  @ApiProperty({ description: 'Success status of the operation' })
  success: boolean;

  @ApiProperty({ description: 'Analysis results', type: NewsAnalysis })
  analysis: NewsAnalysis;
}

export class HistoricalAnalysisQueryDto {
  @ApiProperty({
    description: 'Maximum number of results to return',
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class HistoricalAnalysisItem {
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @ApiProperty({ description: 'Original news content' })
  newsContent: string;

  @ApiProperty({ description: 'Analysis results' })
  analysis: NewsAnalysis;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: string;
}

export class HistoricalAnalysisResponseDto {
  @ApiProperty({ description: 'Success status of the operation' })
  success: boolean;

  @ApiProperty({ description: 'Historical analysis data', type: [HistoricalAnalysisItem] })
  data: HistoricalAnalysisItem[];
}
