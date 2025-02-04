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
  params?: Record<string, unknown>;
};

export type ErrorDetails = {
  code: string;
  status?: number;
  details?: unknown;
  timestamp?: string;
};
