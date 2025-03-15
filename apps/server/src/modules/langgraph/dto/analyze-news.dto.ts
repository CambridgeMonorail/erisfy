import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, Matches, Length, IsArray, IsBoolean } from 'class-validator';

export class AnalyzeNewsDto {
  @ApiPropertyOptional({
    description: 'Search query for news analysis. If not provided, top financial news will be analyzed.',
    example: 'Tesla earnings report',
    minLength: 2,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  @Length(2, 200, { message: 'Query must be between 2 and 200 characters' })
  query?: string;

  @ApiPropertyOptional({
    description: 'Stock ticker symbols in uppercase (e.g., ["AAPL", "TSLA", "MSFT"])',
    example: ['TSLA'],
    isArray: true,
    items: {
      type: 'string',
      pattern: '^[A-Z]{1,5}$'
    }
  })
  @IsArray()
  @IsOptional()
  @Matches(/^[A-Z]{1,5}$/, {
    message: 'Each ticker must be 1-5 uppercase letters',
    each: true
  })
  tickers?: string[];

  @ApiPropertyOptional({
    description: 'Option to bypass cache for testing',
    example: false
  })
  @IsBoolean()
  @IsOptional()
  bypassCache?: boolean;
}
