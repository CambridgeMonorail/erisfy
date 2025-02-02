/** Base response type for API responses */
export type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

/** Generic error type for API errors */
export type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};

/**
 * Core API client interface defining common API operations
 * @template T - The type of resource being managed
 */
export interface ApiClient<T = unknown> {
  /**
   * Fetches a resource by its unique identifier
   * @param id - Unique identifier of the resource
   * @throws {ApiError} When the resource cannot be retrieved
   */
  getResource(id: string): Promise<ApiResponse<T>>;

  /**
   * Fetches a list of resources with optional filtering
   * @param params - Query parameters for filtering and pagination
   */
  listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>>;

  /**
   * Creates a new resource
   * @param data - The resource data to create
   */
  createResource(data: Partial<T>): Promise<ApiResponse<T>>;

  /**
   * Updates an existing resource
   * @param id - Unique identifier of the resource
   * @param data - The resource data to update
   */
  updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>>;

  /**
   * Deletes a resource
   * @param id - Unique identifier of the resource to delete
   */
  deleteResource(id: string): Promise<ApiResponse<void>>;
}
