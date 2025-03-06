import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

/**
 * Provider for OpenAI configuration and client initialization
 * Centralizes the OpenAI client configuration
 */
@Injectable()
export class OpenAiConfigProvider {
  /**
   * Configured OpenAI client instance
   */
  private _openaiClient: OpenAI;

  /**
   * Creates an instance of OpenAiConfigProvider
   * @param configService Injected ConfigService for accessing environment variables
   */
  constructor(private readonly configService: ConfigService) {
    this._openaiClient = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
      timeout: this.configService.get<number>('OPENAI_TIMEOUT') || 30000, // Default timeout of 30 seconds
      maxRetries: this.configService.get<number>('OPENAI_MAX_RETRIES') || 2, // Default 2 retries
    });
  }

  /**
   * Gets the configured OpenAI client instance
   * @returns Configured OpenAI client
   */
  get client(): OpenAI {
    return this._openaiClient;
  }
}
