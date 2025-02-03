import { ApiClient, ApiResponse } from './api-client.interface';
import { ApiError } from './errors/ApiError';

export type MockData<T> = {
  [key: string]: T;
};

type MockConfig = {
  delay?: number;
  shouldFail?: boolean;
  errorRate?: number;
  testMode?: boolean;  // Add test mode flag
};

export class MockAPIClient<T = unknown> implements ApiClient<T> {
  private mockData: MockData<T>;

  constructor(
    private config: MockConfig = {},
    initialData: MockData<T> = {}
  ) {
    this.config = {
      delay: 200,
      shouldFail: false,
      errorRate: 0,
      testMode: false,
      ...config
    };
    this.mockData = initialData;
  }

  private async simulateNetwork(): Promise<void> {
    if (this.config.delay) {
      await new Promise(resolve => setTimeout(resolve, this.config.delay));
    }
    
    if (this.config.shouldFail || (Math.random() < (this.config.errorRate || 0))) {
      throw this.createError('NETWORK_ERROR', 'Simulated network error');
    }
  }

  private createError(code: string, message: string, status = 400): ApiError {
    return new ApiError(message, {
      code,
      status,
      details: { 
        mock: true, 
        timestamp: new Date().toISOString()
      }
    });
  }

  private generateId(): string {
    return this.config.testMode ? 'new-id' : `mock-${Date.now()}`;
  }

  async getResource(id: string): Promise<ApiResponse<T>> {
    await this.simulateNetwork();
    
    if (!id) {
      throw this.createError('INVALID_ID', 'Resource ID is required');
    }

    return {
      data: { id, symbol: `MOCK-${id}`, price: 120 } as T,
      status: 200,
    };
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>> {
    await this.simulateNetwork();

    return {
      data: [
        { id: '1', symbol: 'MOCK-AAPL', price: 150 },
        { id: '2', symbol: 'MOCK-MSFT', price: 280 }
      ] as T[],
      status: 200,
      ...(params && { params }) // Include passed params in response for debugging
    };
  }

  async createResource(data: Partial<T>): Promise<ApiResponse<T>> {
    await this.simulateNetwork();

    if (!data) {
      throw this.createError('INVALID_DATA', 'Resource data is required');
    }

    return {
      data: { ...data, id: this.generateId(), mock: true } as T,
      status: 201,
    };
  }

  async updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    await this.simulateNetwork();

    if (!id) {
      throw this.createError('INVALID_ID', 'Resource ID is required');
    }

    return {
      data: { ...data, id, mock: true } as T,
      status: 200,
    };
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    await this.simulateNetwork();

    if (!id) {
      throw this.createError('INVALID_ID', 'Resource ID is required');
    }

    return {
      data: void 0,
      status: 204,
    };
  }

  async getMarketInsights(): Promise<ApiResponse<unknown>> {
    await this.simulateNetwork();
    
    return {
      data: {
        trends: [
          { symbol: 'MOCK-AAPL', trend: 'upward', confidence: 0.85 },
          { symbol: 'MOCK-MSFT', trend: 'stable', confidence: 0.75 }
        ],
        marketSentiment: 'bullish',
        lastUpdated: new Date().toISOString()
      },
      status: 200,
    };
  }
}
