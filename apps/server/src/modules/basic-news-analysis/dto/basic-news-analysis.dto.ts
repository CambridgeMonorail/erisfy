import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

/**
 * DTO for basic news analysis request
 */
export class AnalyzeNewsDto {
  @ApiProperty({
    description: 'News content to analyze',
    example: 'Company XYZ announced a 20% increase in quarterly profits today.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;
}

/**
 * DTO for basic news analysis response
 */
export class NewsAnalysis {
  @ApiProperty({ description: 'Basic sentiment of the news content' })
  sentiment: string;

  @ApiProperty({ description: 'Key topics identified in the content' })
  keyTopics: string[];

  @ApiProperty({ description: 'Market implications derived from basic analysis' })
  marketImplications: string[];

  @ApiProperty({ description: 'Timestamp of the analysis' })
  timestamp: string;
}

/**
 * DTO for basic analysis response
 */
export class AnalysisResponseDto {
  @ApiProperty({ description: 'Success status of the operation' })
  success: boolean;

  @ApiProperty({ description: 'Basic analysis results', type: NewsAnalysis })
  analysis: NewsAnalysis;
}

/**
 * DTO for historical analysis query parameters
 */
export class HistoricalAnalysisQueryDto {
  @ApiProperty({
    description: 'Maximum number of historical results to return',
    required: false,
    default: 10,
  })
  @IsNumber()
  @IsOptional()
  limit?: number;
}

/**
 * DTO for historical analysis response item
 */
export class HistoricalAnalysisItem {
  @ApiProperty({ description: 'Unique identifier' })
  id: string;

  @ApiProperty({ description: 'Original news content' })
  newsContent: string;

  @ApiProperty({ description: 'Basic analysis results' })
  analysis: NewsAnalysis;

  @ApiProperty({ description: 'Creation timestamp' })
  createdAt: string;
}

/**
 * DTO for historical analysis response
 */
export class HistoricalAnalysisResponseDto {
  @ApiProperty({ description: 'Success status of the operation' })
  success: boolean;

  @ApiProperty({ description: 'Historical basic analysis data', type: [HistoricalAnalysisItem] })
  data: HistoricalAnalysisItem[];
}
