export class ApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode?: number,
    public readonly responseData?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}
