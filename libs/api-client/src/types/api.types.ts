export type ApiConfig = {
  delay?: number;
  timeout?: number;
  retries?: number;
  baseURL?: string;
  apiKey?: string;
  testMode?: boolean;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
  metadata?: {
    timestamp: string;
    requestId?: string;
  };
  params?: Record<string, unknown>;
};

export type ErrorDetails = {
  code: string;
  status?: number;
  details?: unknown;
  timestamp?: string;
};

/** Error codes enum for consistent error handling */
export enum ApiErrorCode {
  NETWORK_ERROR = 'NETWORK_ERROR',
  INVALID_REQUEST = 'INVALID_REQUEST',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TIMEOUT = 'TIMEOUT',
  SERVER_ERROR = 'SERVER_ERROR',
}
