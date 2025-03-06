import { HttpException, HttpStatus } from '@nestjs/common';

/**
 * Custom exception for OpenAI API related errors
 * Extends the standard HttpException from NestJS
 */
export class OpenAiException extends HttpException {
  /**
   * Creates an instance of OpenAiException
   * @param message The error message
   * @param status The HTTP status code (defaults to 500 INTERNAL_SERVER_ERROR)
   */
  constructor(message: string, status: number = HttpStatus.INTERNAL_SERVER_ERROR) {
    super({
      statusCode: status,
      message: message,
      error: 'OpenAI API Error',
    }, status);
  }
}
