import { Onboarding } from 'libs/data-access-indexeddb';
import {
  setOnboardingData as dbSetOnboardingData,
  getOnboardingData as dbGetOnboardingData,
  hasViewedOnboarding as dbHasViewedOnboarding,
  deleteOnboardingData as dbDeleteOnboardingData
} from '@erisfy/data-access-indexeddb';
import { ApiResponse } from '../types/api.types';
import { MarketInsightsResponse } from '../types/market.types';
import { BaseApiClient } from './base-api-client';
import { DEFAULT_MARKET_INSIGHTS, DEFAULT_MOCK_RESOURCES } from './constants/mockData';

export class MockAPIClient<T = unknown> extends BaseApiClient<T> {
  private mockData: Record<string, T>;

  constructor(config = {}, initialData = {}) {
    super(config);
    this.mockData = initialData;
  }

  /**
   * Simulates network latency and returns the provided data
   * @param data The data to return after simulation
   * @returns Promise of the same data type
   */
  private async simulateNetwork(): Promise<void>;
  private async simulateNetwork<T>(data: T): Promise<T>;
  private async simulateNetwork<T>(data?: T): Promise<T | void> {
    // Simulate network latency (200-800ms)
    const delay = Math.random() * 600 + 200;
    await new Promise(resolve => setTimeout(resolve, delay));
    return data;
  }

  private generateId(): string {
    return this.config.testMode ? 'test-id' : `mock-${Date.now()}`;
  }

  async getResource(id: string): Promise<ApiResponse<T>> {
    return this.handleResponse(async () => {
      this.validateId(id);
      await this.simulateNetwork();
      return {
        data: { id, symbol: `MOCK-${id}`, price: 120 } as T,
        status: 200,
      };
    });
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>> {
    return this.handleResponse(async () => {
      await this.simulateNetwork();
      return {
        data: DEFAULT_MOCK_RESOURCES as T[],
        status: 200,
        ...(params && { params })
      };
    });
  }

  async createResource(data: Partial<T>): Promise<ApiResponse<T>> {
    return this.handleResponse(async () => {
      await this.simulateNetwork();
      if (!data) throw this.createError('INVALID_DATA', 'Resource data is required');

      return {
        data: { ...data, id: this.generateId(), mock: true } as T,
        status: 201,
      };
    });
  }

  async updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    return this.handleResponse(async () => {
      this.validateId(id);
      await this.simulateNetwork();

      return {
        data: { ...data, id, mock: true } as T,
        status: 200,
      };
    });
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    return this.handleResponse(async () => {
      this.validateId(id);
      await this.simulateNetwork();

      return {
        data: void 0,
        status: 204,
      };
    });
  }

  async getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>> {
    return this.handleResponse(async () => {
      await this.simulateNetwork();
      return {
        data: {
          ...DEFAULT_MARKET_INSIGHTS,
          lastUpdated: new Date().toISOString()
        },
        status: 200,
      };
    });
  }

  /**
   * -----------------------------
   *  ONBOARDING-RELATED METHODS
   * -----------------------------
   */

  /**
   * Create or update onboarding data for a user.
   */
  async setOnboardingData(
    onboarding: Omit<Onboarding, 'id'>
  ): Promise<ApiResponse<Onboarding>> {
    try {
      // Persist to IndexedDB
      await dbSetOnboardingData(onboarding);

      // Fetch the updated record
      const updated = await dbGetOnboardingData(onboarding.userId);
      if (!updated) {
        throw new Error(`No onboarding record found for userId: ${onboarding.userId}`);
      }

      // Simulate network and return
      const data = await this.simulateNetwork(updated);
      return {
        data,
        status: 200,
        metadata: {
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: unknown) {
      // Handle or re-throw the error as appropriate
      throw new Error(
        error instanceof Error
          ? `MockAPIClient.setOnboardingData failed: ${error.message}`
          : 'Unknown error in setOnboardingData'
      );
    }
  }

  /**
   * Retrieve a user's onboarding data by userId.
   */
  async getOnboardingData(userId: string): Promise<ApiResponse<Onboarding>> {
    try {
      const record = await dbGetOnboardingData(userId);
      if (!record) {
        throw new Error(`Onboarding data not found for userId: ${userId}`);
      }

      const data = await this.simulateNetwork(record);
      return {
        data,
        status: 200,
        metadata: {
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error
          ? `MockAPIClient.getOnboardingData failed: ${error.message}`
          : 'Unknown error in getOnboardingData'
      );
    }
  }

  /**
   * Quickly check if a user has viewed onboarding.
   * (If you need to return just a boolean, you can still wrap it in an ApiResponse.)
   */
  async hasViewedOnboarding(userId: string): Promise<ApiResponse<boolean>> {
    try {
      const viewed = await dbHasViewedOnboarding(userId);
      const data = await this.simulateNetwork(viewed);
      return {
        data,
        status: 200,
        metadata: {
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error
          ? `MockAPIClient.hasViewedOnboarding failed: ${error.message}`
          : 'Unknown error in hasViewedOnboarding'
      );
    }
  }

  /**
   * Delete a user's onboarding record by userId.
   */
  async deleteOnboardingData(userId: string): Promise<ApiResponse<void>> {
    try {
      await dbDeleteOnboardingData(userId);
      await this.simulateNetwork({}); // Just simulate a response
      return {
        data: undefined,
        status: 200,
        metadata: {
          timestamp: new Date().toISOString()
        }
      };
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error
          ? `MockAPIClient.deleteOnboardingData failed: ${error.message}`
          : 'Unknown error in deleteOnboardingData'
      );
    }
  }
}
