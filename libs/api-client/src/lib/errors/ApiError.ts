export class ApiError extends Error {
  code: string;
  details?: unknown;
  status?: number;
  timestamp: string;

  constructor(
    message: string,
    options: {
      code?: string;
      details?: unknown;
      status?: number;
    } = {}
  ) {
    super(message);
    this.name = 'ApiError';
    this.code = options.code ?? 'UNKNOWN_ERROR';
    this.details = options.details;
    this.status = options.status;
    this.timestamp = new Date().toISOString();
  }
}
