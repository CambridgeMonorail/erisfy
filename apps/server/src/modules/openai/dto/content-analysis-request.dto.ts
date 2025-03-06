import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

/**
 * Data Transfer Object for content analysis requests
 */
export class ContentAnalysisRequestDto {
  /**
   * The content to analyze
   */
  @ApiProperty({
    description: 'The text content to analyze',
    example: 'Federal Reserve officials signaled they expect to cut interest rates by 75 basis points by the end of 2024 as inflation continues to cool.',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  /**
   * Optional custom prompt to guide the analysis
   */
  @ApiPropertyOptional({
    description: 'Custom prompt to guide the analysis',
    example: 'Analyze this news for its impact on technology stocks specifically',
  })
  @IsString()
  @IsOptional()
  analysisPrompt?: string;
}
