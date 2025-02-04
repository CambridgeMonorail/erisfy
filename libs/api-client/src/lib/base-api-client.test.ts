import { describe, it, expect, vi, beforeEach } from 'vitest';

import axios, { AxiosInstance } from 'axios';
import { BaseApiClient } from './base-api-client';
import { ApiResponse } from '../types/api.types';
import { ApiError } from './errors/ApiError';

// Mock implementation for testing
class TestApiClient extends BaseApiClient<{ id: string; name: string }> {
  async getResource(id: string) {
    return this.handleResponse(async () => ({
      data: { id, name: 'test' },
      status: 200,
    }));
  }

  async listResources() {
    return this.handleResponse(async () => ({
      data: [{ id: '1', name: 'test' }],
      status: 200,
    }));
  }

  async createResource(data: Partial<{ id: string; name: string }>) {
    this.validateData(data);
    return this.handleResponse(async () => ({
      data: {
        id: '1',
        name: data.name || 'default-name', // Ensure name is always defined
        ...data,
      },
      status: 201,
    }));
  }

  async updateResource(
    id: string,
    data: Partial<{ id: string; name: string }>,
  ) {
    this.validateId(id);
    this.validateData(data);
    return this.handleResponse(async () => ({
      data: {
        id,
        name: data.name || 'default-name', // Ensure name is always defined
        ...data,
      },
      status: 200,
    }));
  }

  async deleteResource(id: string) {
    this.validateId(id);
    return this.handleResponse(async () => ({
      data: void 0,
      status: 204,
    }));
  }

  async getMarketInsights() {
    return this.handleResponse(async () => ({
      data: {
        insights: [],
        lastUpdated: new Date().toISOString(),
      },
      status: 200,
    }));
  }

  // Add public methods for testing protected methods
  public testValidateId(id: string): void {
    this.validateId(id);
  }

  public testValidateData(data: unknown): void {
    this.validateData(data);
  }

  public testHandleResponse<R>(
    operation: () => Promise<ApiResponse<R>>,
  ): Promise<ApiResponse<R>> {
    return this.handleResponse(operation);
  }
}

// Fixed implementation with required abstract methods
class TestAxiosApiClient extends BaseApiClient<{ id: string; name: string }> {
  constructor(client: AxiosInstance) {
    super({ testMode: true }, client);
  }

  async getResource(id: string) {
    this.validateId(id);
    return this.handleResponse(async () => {
      const response = await this.client!.get(`/resources/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async listResources(params?: Record<string, unknown>) {
    return this.handleResponse(async () => {
      const response = await this.client!.get('/resources', { params });
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async createResource(data: Partial<{ id: string; name: string }>) {
    this.validateData(data);
    return this.handleResponse(async () => {
      const response = await this.client!.post('/resources', data);
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async updateResource(
    id: string,
    data: Partial<{ id: string; name: string }>,
  ) {
    this.validateId(id);
    this.validateData(data);
    return this.handleResponse(async () => {
      const response = await this.client!.put(`/resources/${id}`, data);
      return {
        data: response.data,
        status: response.status,
      };
    });
  }

  async deleteResource(id: string) {
    this.validateId(id);
    return this.handleResponse(async () => {
      const response = await this.client!.delete(`/resources/${id}`);
      return {
        data: undefined,
        status: response.status,
      };
    });
  }

  async getMarketInsights() {
    return this.handleResponse(async () => {
      const response = await this.client!.get('/market/insights');
      return {
        data: response.data,
        status: response.status,
      };
    });
  }
}

describe('BaseApiClient', () => {
  let client: TestApiClient;

  beforeEach(() => {
    client = new TestApiClient({ testMode: true });
  });

  describe('validation', () => {
    it('should throw ApiError when ID is invalid', () => {
      expect(() => client.testValidateId('')).toThrow(ApiError);
      expect(() => client.testValidateId('')).toThrow(
        'Resource ID is required',
      );
    });

    it('should throw ApiError when data is invalid', () => {
      expect(() => client.testValidateData(null)).toThrow(ApiError);
      expect(() => client.testValidateData(null)).toThrow(
        'Resource data is required',
      );
    });
  });

  describe('error handling', () => {
    it('should handle ApiError properly', async () => {
      const operation = async () => {
        throw new ApiError('Test error', { code: 'TEST_ERROR' });
      };

      await expect(client.testHandleResponse(operation)).rejects.toThrow(
        ApiError,
      );
    });

    it('should wrap unknown errors in ApiError', async () => {
      const operation = async () => {
        throw new Error('Unknown error');
      };

      await expect(client.testHandleResponse(operation)).rejects.toThrow(
        ApiError,
      );
    });
  });

  describe('CRUD operations', () => {
    it('should get resource successfully', async () => {
      const response = await client.getResource('1');
      expect(response.data).toEqual({ id: '1', name: 'test' });
    });

    it('should create resource successfully', async () => {
      const response = await client.createResource({ name: 'new' });
      expect(response.data).toEqual({ id: '1', name: 'new' });
    });

    it('should delete resource successfully', async () => {
      const response = await client.deleteResource('1');
      expect(response.status).toBe(204);
    });
  });
});

describe('BaseApiClient with Axios', () => {
  let axiosInstance: AxiosInstance;
  let client: TestAxiosApiClient;

  beforeEach(() => {
    axiosInstance = axios.create();
    vi.spyOn(axiosInstance, 'get').mockResolvedValue({
      data: { id: '1', name: 'test' },
      status: 200,
    });
    client = new TestAxiosApiClient(axiosInstance);
  });

  it('should make axios request correctly', async () => {
    const response = await client.getResource('1');
    expect(axiosInstance.get).toHaveBeenCalledWith('/resources/1');
    expect(response.data).toEqual({ id: '1', name: 'test' });
  });

  it('should fetch market insights correctly', async () => {
    vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
      data: { trends: [], timestamp: new Date().toISOString() },
      status: 200,
    });

    const response = await client.getMarketInsights();
    expect(axiosInstance.get).toHaveBeenCalledWith('/market/insights');
    expect(response.data).toBeDefined();
  });

  it('should handle axios errors properly', async () => {
    vi.spyOn(axiosInstance, 'get').mockRejectedValueOnce(
      new Error('Network error'),
    );
    await expect(client.getResource('1')).rejects.toThrow(ApiError);
  });
});
