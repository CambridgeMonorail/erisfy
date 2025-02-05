import { ApiResponse } from '../types/api.types';
import { MarketInsightsResponse } from '../types/market.types';
import { Onboarding } from '@erisfy/data-access-indexeddb';

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

  /**
   * Fetches market insights and analytics
   * @returns Market insights data
   */
  getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>>;

  // Add onboarding methods
  setOnboardingData(onboarding: Omit<Onboarding, 'id'>): Promise<ApiResponse<Onboarding>>;
  getOnboardingData(userId: string): Promise<ApiResponse<Onboarding>>;
  hasViewedOnboarding(userId: string): Promise<ApiResponse<boolean>>;
  deleteOnboardingData(userId: string): Promise<ApiResponse<void>>;
}
