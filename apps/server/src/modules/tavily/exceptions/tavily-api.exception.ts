import { HttpException } from '@nestjs/common';

/**
 * Custom exception for Tavily API errors
 */
export class TavilyApiException extends HttpException {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
