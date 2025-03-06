import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AnalyzeNewsDto {
  @ApiProperty({
    description: 'Search query or topic for news analysis',
    example: 'Tesla earnings report'
  })
  @IsString()
  query: string;

  @ApiProperty({
    description: 'Stock ticker symbol',
    example: 'TSLA',
    required: false
  })
  @IsString()
  @IsOptional()
  ticker?: string;
}
