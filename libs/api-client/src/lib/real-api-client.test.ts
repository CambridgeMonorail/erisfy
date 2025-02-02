import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { RealAPIClient } from './real-api-client';

vi.mock('axios');
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
  post: ReturnType<typeof vi.fn>;
  put: ReturnType<typeof vi.fn>;
  delete: ReturnType<typeof vi.fn>;
};

describe('RealAPIClient', () => {
  let client: RealAPIClient;

  beforeEach(() => {
    client = new RealAPIClient();
    vi.clearAllMocks();
  });

  describe('getResource', () => {
    it('should fetch a resource by id', async () => {
      const mockData = { id: '1', name: 'Test' };
      mockedAxios.get.mockResolvedValueOnce({ data: mockData, status: 200 });

      const result = await client.getResource('1');
      expect(result).toEqual({ data: mockData, status: 200 });
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/resources/1');
    });
  });

  describe('listResources', () => {
    it('should fetch resources with params', async () => {
      const mockData = [{ id: '1' }, { id: '2' }];
      mockedAxios.get.mockResolvedValueOnce({ data: mockData, status: 200 });

      const params = { page: 1 };
      const result = await client.listResources(params);
      expect(result).toEqual({ data: mockData, status: 200 });
      expect(mockedAxios.get).toHaveBeenCalledWith('http://localhost:3000/api/resources', { params });
    });
  });

  describe('createResource', () => {
    it('should create a new resource', async () => {
      const mockData = { id: '1', name: 'New Resource' };
      mockedAxios.post.mockResolvedValueOnce({ data: mockData, status: 201 });

      const result = await client.createResource({ name: 'New Resource' });
      expect(result).toEqual({ data: mockData, status: 201 });
      expect(mockedAxios.post).toHaveBeenCalledWith('http://localhost:3000/api/resources', { name: 'New Resource' });
    });
  });
});
