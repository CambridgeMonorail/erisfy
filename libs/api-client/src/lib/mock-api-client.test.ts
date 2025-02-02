import { describe, it, expect } from 'vitest';
import { MockAPIClient } from './mock-api-client';

describe('MockAPIClient', () => {
  const client = new MockAPIClient();

  describe('getResource', () => {
    it('should return mock data', async () => {
      const result = await client.getResource('test-id');
      expect(result).toEqual({
        data: { 
          id: 'test-id', 
          symbol: 'MOCK-test-id', 
          price: 120 
        },
        status: 200
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
      const data = { name: 'test' };
      const result = await client.createResource(data);
      expect(result).toEqual({
        data: { ...data, id: 'new-id', mock: true },
        status: 201
      });
    });
  });
});
