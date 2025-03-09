import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, Matches, Length } from 'class-validator';

export class AnalyzeNewsDto {
  @ApiProperty({
    description: 'Search query for news analysis. If not provided, top financial news will be analyzed.',
    example: 'Tesla earnings report',
    required: false,
    minLength: 2,
    maxLength: 200
  })
  @IsString()
  @IsOptional()
  @Length(2, 200, { message: 'Query must be between 2 and 200 characters' })
  query?: string;

  @ApiProperty({
    description: 'Stock ticker symbol in uppercase (e.g., AAPL, TSLA, MSFT)',
    example: 'TSLA',
    required: false,
    pattern: '^[A-Z]{1,5}$'
  })
  @IsString()
  @IsOptional()
  @Matches(/^[A-Z]{1,5}$/, {
    message: 'Ticker must be 1-5 uppercase letters'
  })
  ticker?: string;
}
