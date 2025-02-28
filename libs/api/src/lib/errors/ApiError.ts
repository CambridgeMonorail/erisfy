// Define a type for API response data to avoid using 'any'
export type ApiResponseData = {
  message?: string;
  errors?: Record<string, string[]>;
  data?: unknown;
  [key: string]: unknown;
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly data?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
