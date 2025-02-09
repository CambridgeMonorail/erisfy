export class ApiError extends Error {
  public override name = 'ApiError';
  public override message: string;

  constructor(
    public status: number,
    message: string,
    public data?: unknown
  ) {
    super(message);
    this.message = message;
    
    // Restore prototype chain properly
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}
