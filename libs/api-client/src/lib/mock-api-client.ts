import { ApiClient, ApiResponse } from './api-client.interface';

export class MockAPIClient implements ApiClient {
  async getResource(id: string): Promise<ApiResponse<unknown>> {
    return {
      data: { id, mock: true },
      status: 200,
    };
  }

  async listResources(params?: Record<string, unknown>): Promise<ApiResponse<unknown[]>> {
    return {
      data: [{ id: '1', mock: true }, { id: '2', mock: true }],
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
}
