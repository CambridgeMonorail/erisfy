import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BaseApiClient, BaseAPIClient } from './base-api-client';
import { ApiError } from './errors/ApiError';
import axios, { AxiosInstance } from 'axios';

// Mock implementation of BaseApiClient for testing
class TestApiClient extends BaseApiClient<{ id: string; name: string }> {
  async getResource(id: string) {
    return this.handleResponse(async () => ({
      data: { id, name: 'test' },
      status: 200
    }));
  }

  async listResources() {
    return this.handleResponse(async () => ({
      data: [{ id: '1', name: 'test' }],
      status: 200
    }));
  }

  async createResource(data: Partial<{ id: string; name: string }>) {
    this.validateData(data);
    return this.handleResponse(async () => ({
      data: { id: '1', ...data },
      status: 201
    }));
  }

  async updateResource(id: string, data: Partial<{ id: string; name: string }>) {
    this.validateId(id);
    this.validateData(data);
    return this.handleResponse(async () => ({
      data: { id, ...data },
      status: 200
    }));
  }

  async deleteResource(id: string) {
    this.validateId(id);
    return this.handleResponse(async () => ({
      data: void 0,
      status: 204
    }));
  }
}

// Mock implementation of BaseAPIClient for testing
class TestAxiosClient extends BaseAPIClient<{ id: string; name: string }> {
  constructor(client: AxiosInstance) {
    super(client, { testMode: true });
  }
}

describe('BaseApiClient', () => {
  let client: TestApiClient;

  beforeEach(() => {
    client = new TestApiClient({ testMode: true });
  });

  describe('validation', () => {
    it('should throw ApiError when ID is invalid', () => {
      expect(() => client.validateId('')).toThrow(ApiError);
      expect(() => client.validateId('')).toThrow('Resource ID is required');
    });

    it('should throw ApiError when data is invalid', () => {
      expect(() => client.validateData(null)).toThrow(ApiError);
      expect(() => client.validateData(null)).toThrow('Resource data is required');
    });
  });

  describe('error handling', () => {
    it('should handle ApiError properly', async () => {
      const operation = async () => {
        throw new ApiError('Test error', { code: 'TEST_ERROR' });
      };

      await expect(client.handleResponse(operation)).rejects.toThrow(ApiError);
    });

    it('should wrap unknown errors in ApiError', async () => {
      const operation = async () => {
        throw new Error('Unknown error');
      };

      await expect(client.handleResponse(operation)).rejects.toThrow(ApiError);
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

describe('BaseAPIClient', () => {
  let axiosInstance: AxiosInstance;
  let client: TestAxiosClient;

  beforeEach(() => {
    axiosInstance = axios.create();
    vi.spyOn(axiosInstance, 'get').mockResolvedValue({
      data: { id: '1', name: 'test' },
      status: 200
    });
    client = new TestAxiosClient(axiosInstance);
  });

  it('should make axios request correctly', async () => {
    const response = await client.getResource('1');
    expect(axiosInstance.get).toHaveBeenCalledWith('/resources/1');
    expect(response.data).toEqual({ id: '1', name: 'test' });
  });

  it('should fetch market insights correctly', async () => {
    vi.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
      data: { trends: [], timestamp: new Date().toISOString() },
      status: 200
    });

    const response = await client.getMarketInsights();
    expect(axiosInstance.get).toHaveBeenCalledWith('/market/insights');
    expect(response.data).toBeDefined();
  });

  it('should handle axios errors properly', async () => {
    vi.spyOn(axiosInstance, 'get').mockRejectedValueOnce(new Error('Network error'));
    await expect(client.getResource('1')).rejects.toThrow(ApiError);
  });
});
