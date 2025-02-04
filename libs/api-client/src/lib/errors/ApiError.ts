import { ErrorDetails } from '../../types/api.types';

export class ApiError extends Error {
  readonly code: string;
  readonly details?: unknown;
  readonly status?: number;
  readonly timestamp: string;

  constructor(message: string, options: Partial<ErrorDetails> = {}) {
    super(message);
    this.name = 'ApiError';
    this.code = options.code ?? 'UNKNOWN_ERROR';
    this.details = options.details;
    this.status = options.status;
    this.timestamp = options.timestamp ?? new Date().toISOString();
  }

  toJSON(): ErrorDetails {
    return {
      code: this.code,
      status: this.status,
      details: this.details,
      timestamp: this.timestamp
    };
  }
}
