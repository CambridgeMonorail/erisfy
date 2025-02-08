export type ApiConfig = {
  baseURL: string;
  timeout?: number;
  headers?: Record<string, string>;
};

export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};
