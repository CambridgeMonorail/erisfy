import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsOptional, Min, Max } from 'class-validator';

/**
 * Data Transfer Object for prompt requests sent to OpenAI
 */
export class PromptRequestDto {
  /**
   * The prompt text to send to OpenAI
   */
  @ApiProperty({
    description: 'The prompt text to send to OpenAI',
    example: 'Explain the impact of rising interest rates on the stock market',
  })
  @IsString()
  @IsNotEmpty()
  prompt: string;

  /**
   * Optional system prompt to guide the AI's behavior
   */
  @ApiPropertyOptional({
    description: 'System prompt to guide the AI\'s behavior',
    example: 'You are a financial analyst specializing in macroeconomic trends.',
    default: 'You are a helpful AI assistant.'
  })
  @IsString()
  @IsOptional()
  systemPrompt?: string;

  /**
   * Optional sampling temperature for controlling randomness (0-1)
   * Lower values make responses more focused and deterministic
   * Higher values make output more random and creative
   */
  @ApiPropertyOptional({
    description: 'Sampling temperature (0-1)',
    minimum: 0,
    maximum: 1,
    default: 0.7,
    example: 0.3
  })
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsOptional()
  temperature?: number;
}
