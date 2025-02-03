import { describe, it, expect, beforeEach } from 'vitest';
import { MockAPIClient } from './mock-api-client';

type TestResource = {
  id?: string;
  name?: string;
  mock?: boolean;
  symbol?: string;
  price?: number;
};

describe('MockAPIClient', () => {
  let client: MockAPIClient<TestResource>;

  beforeEach(() => {
    client = new MockAPIClient<TestResource>({ delay: 0, testMode: true }); // Enable test mode
  });

  describe('getResource', () => {
    it('should return mock data', async () => {
      const result = await client.getResource('test-id');
      expect(result).toEqual({
        data: { id: 'test-id', symbol: 'MOCK-test-id', price: 120 },
        status: 200
      });
    });

    it('should throw error for empty id', async () => {
      await expect(client.getResource('')).rejects.toMatchObject({
        code: 'INVALID_ID',
        message: 'Resource ID is required'
      });
    });
  });

  describe('listResources', () => {
    it('should return mock list', async () => {
      const result = await client.listResources();
      expect(result).toEqual({
        data: [
          { id: '1', symbol: 'MOCK-AAPL', price: 150 },
          { id: '2', symbol: 'MOCK-MSFT', price: 280 }
        ],
        status: 200
      });
    });
  });

  describe('createResource', () => {
    it('should return created mock resource', async () => {
      const data: TestResource = { name: 'test' };
      const result = await client.createResource(data);
      expect(result).toMatchObject({
        data: { 
          name: 'test',
          mock: true
        },
        status: 201
      });
      // Only check that ID exists and follows the expected pattern
      expect(result.data.id).toBeTruthy();
      expect(typeof result.data.id).toBe('string');
    });
  });

  describe('error simulation', () => {
    it('should simulate network errors when configured', async () => {
      const errorClient = new MockAPIClient({ shouldFail: true, delay: 0 });
      await expect(errorClient.getResource('test')).rejects.toMatchObject({
        code: 'NETWORK_ERROR'
      });
    });

    it('should respect error rate configuration', async () => {
      const errorClient = new MockAPIClient({ errorRate: 1, delay: 0 }); // 100% error rate
      await expect(errorClient.listResources()).rejects.toMatchObject({
        code: 'NETWORK_ERROR'
      });
    });
  });

  describe('deleteResource', () => {
    it('should return success status', async () => {
      const result = await client.deleteResource('test-id');
      expect(result).toEqual({
        data: undefined,
        status: 204
      });
    });

    it('should throw error for empty id', async () => {
      await expect(client.deleteResource('')).rejects.toMatchObject({
        code: 'INVALID_ID'
      });
    });
  });

  describe('getMarketInsights', () => {
    it('should return market insights data', async () => {
      const result = await client.getMarketInsights();
      expect(result).toMatchObject({
        data: {
          trends: expect.arrayContaining([
            expect.objectContaining({
              symbol: expect.any(String),
              trend: expect.any(String),
              confidence: expect.any(Number)
            })
          ]),
          marketSentiment: expect.any(String),
          lastUpdated: expect.any(String)
        },
        status: 200
      });
    });

    it('should fail with network error when configured', async () => {
      const errorClient = new MockAPIClient({ shouldFail: true, delay: 0 });
      await expect(errorClient.getMarketInsights()).rejects.toMatchObject({
        code: 'NETWORK_ERROR'
      });
    });
  });
});
