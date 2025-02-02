import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { RealAPIClient } from './real-api-client';
import type { ApiResponse } from './api-client.interface';

// Mock axios with AxiosError
vi.mock('axios', async () => {
  const actual = await vi.importActual<typeof import('axios')>('axios');
  const mockAxiosInstance = {
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() }
    },
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn()
  };

  return {
    default: {
      create: vi.fn(() => mockAxiosInstance),
      AxiosError: actual.AxiosError
    },
    AxiosError: actual.AxiosError
  };
});

describe('RealAPIClient', () => {
  let client: RealAPIClient;
  let mockAxiosInstance: jest.Mocked<AxiosInstance>;

  beforeEach(() => {
    vi.clearAllMocks();
    mockAxiosInstance = (axios.create() as unknown) as jest.Mocked<AxiosInstance>;
    client = new RealAPIClient();
  });

  const createAxiosResponse = <T>(data: T, status = 200): AxiosResponse<T> => ({
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Created',
    headers: {},
    config: {} as any,
  });

  describe('getResource', () => {
    it('should fetch a resource by id', async () => {
      const responseData = { id: '1', name: 'Test' };
      const axiosResponse = createAxiosResponse(responseData);
      mockAxiosInstance.get.mockResolvedValue(axiosResponse);

      const result = await client.getResource('1');
      
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/resources/1');
      expect(result).toEqual({
        data: responseData,
        status: 200
      });
    });
  });

  describe('listResources', () => {
    it('should fetch resources with params', async () => {
      const responseData = [{ id: '1', name: 'Test' }];
      const axiosResponse = createAxiosResponse(responseData);
      mockAxiosInstance.get.mockResolvedValueOnce(axiosResponse);

      const params = { page: 1, limit: 10 };
      const result = await client.listResources(params);
      
      expect(mockAxiosInstance.get).toHaveBeenCalledWith('/resources', { params });
      expect(result).toEqual({
        data: responseData,
        status: 200
      });
    });
  });

  describe('createResource', () => {
    it('should create a new resource', async () => {
      const responseData = { id: '1', name: 'New Resource' };
      const axiosResponse = createAxiosResponse(responseData, 201);
      mockAxiosInstance.post.mockResolvedValueOnce(axiosResponse);

      const newResource = { name: 'New Resource' };
      const result = await client.createResource(newResource);
      
      expect(mockAxiosInstance.post).toHaveBeenCalledWith('/resources', newResource);
      expect(result).toEqual({
        data: responseData,
        status: 201
      });
    });
  });

  describe('error handling', () => {
    it('should retry on network errors', async () => {
      const mockError = new AxiosError(
        'Network Error',
        'ECONNABORTED',
        undefined,
        undefined,
        { status: 503, data: 'Service Unavailable' } as any
      );

      const successResponse = createAxiosResponse({ id: '1' });
      
      mockAxiosInstance.get
        .mockRejectedValueOnce(mockError)
        .mockRejectedValueOnce(mockError)
        .mockResolvedValueOnce(successResponse);

      const result = await client.getResource('1');
      
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(3);
      expect(result).toEqual({
        data: { id: '1' },
        status: 200
      });
    });

    it('should stop retrying after max attempts', async () => {
      const mockError = new AxiosError(
        'Network Error',
        'ECONNABORTED',
        undefined,
        undefined,
        { status: 503, data: 'Service Unavailable' } as any
      );
      
      mockAxiosInstance.get.mockRejectedValue(mockError);

      await expect(client.getResource('1')).rejects.toThrow();
      expect(mockAxiosInstance.get).toHaveBeenCalledTimes(3);
    });
  });
});
