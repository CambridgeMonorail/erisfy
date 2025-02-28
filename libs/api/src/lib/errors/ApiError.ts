// Define a type for API response data to avoid using 'any'
export type ApiResponseData = {
  message?: string;
  errors?: Record<string, string[]>;
  data?: unknown;
  [key: string]: unknown;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly responseData?: ApiResponseData
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
