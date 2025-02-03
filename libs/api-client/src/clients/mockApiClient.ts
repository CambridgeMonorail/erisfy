import { ApiClient, ApiResponse } from '../lib/api-client.interface';


export class MockAPIClient implements ApiClient {
  async getResource(id: string): Promise<ApiResponse<unknown>> {
    return {
      data: { id, symbol: `MOCK-${id}`, price: 120 },
      status: 200,
    };
  }

  async listResources(): Promise<ApiResponse<unknown[]>> {
    return {
      data: [
        { id: '1', symbol: 'MOCK-AAPL', price: 150 },
        { id: '2', symbol: 'MOCK-MSFT', price: 280 },
      ],
      status: 200,
    };
  }

  async createResource(data: Partial<unknown>): Promise<ApiResponse<unknown>> {
    return {
      data: { ...data, id: 'new-id', mock: true },
      status: 201,
    };
  }

  async updateResource(id: string, data: Partial<unknown>): Promise<ApiResponse<unknown>> {
    return {
      data: { ...data, id, mock: true },
      status: 200,
    };
  }

  async deleteResource(id: string): Promise<ApiResponse<void>> {
    return {
      data: void 0,
      status: 204,
    };
  }

  async getMarketInsights(): Promise<ApiResponse<unknown>> {
    return {
      data: generateMockInsights(),
      status: 200,
    };
  }
}
