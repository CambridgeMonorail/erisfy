# api-client

This library provides a typed HTTP client implementation for interacting with the Erisfy API. It includes production, mock, and custom client implementations with built-in error handling and retry logic.

## Features

- Type-safe API client with TypeScript generics
- Built-in retry logic with exponential backoff
- Comprehensive error handling with ApiError class
- Environment-based client selection
- Mock client for development and testing
- Market insights API integration

## Implementation Overview

The library provides two main client implementations:

- **RealAPIClient**: Production client using axios with retry capabilities
- **MockAPIClient**: Development/testing client with simulated responses

## Usage Examples

### Basic Resource Operations

```ts
import { apiClient } from '@erisfy/api-client';
import type { ApiClient } from '@erisfy/api-client';

// Define your resource type
type Stock = {
  id: string;
  symbol: string;
  price: number;
};

// Use the typed client
const client = apiClient as ApiClient<Stock>;

async function fetchStock(id: string) {
  try {
    const response = await client.getResource(id);
    console.log(response.data.symbol);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`${error.code}: ${error.message}`);
    }
  }
}
```

### Market Insights

```ts
import { apiClient } from '@erisfy/api-client';
import type { MarketInsightsResponse } from '@erisfy/api-client';

async function getMarketInsights() {
  try {
    const response = await apiClient.getMarketInsights();
    const insights = response.data.insights;
    console.log(`Last updated: ${response.data.lastUpdated}`);
    insights.forEach(insight => {
      console.log(`${insight.category}: ${insight.text} (${insight.trend})`);
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`Failed to fetch insights: ${error.message}`);
    }
  }
}
```

## Error Handling

The library uses a custom `ApiError` class for consistent error handling:

```ts
import { ApiError } from '@erisfy/api-client';

try {
  const response = await apiClient.getResource('123');
} catch (error) {
  if (error instanceof ApiError) {
    console.error({
      code: error.code,
      message: error.message,
      status: error.status,
      timestamp: error.timestamp,
      details: error.details
    });
  }
}
```

## Configuration

### Real API Client

```ts
import { RealAPIClient } from '@erisfy/api-client';

const client = new RealAPIClient({
  baseURL: 'https://api.erisfy.com',
  timeout: 5000,
  headers: {
    'Custom-Header': 'value'
  }
});
```

### Mock API Client

```ts
import { MockAPIClient } from '@erisfy/api-client';

const mockClient = new MockAPIClient({
  delay: 200, // Simulate network delay
  errorRate: 0.1, // 10% chance of error
  testMode: true // Use predictable IDs
});
```

## API Interface

```typescript
interface ApiClient<T = unknown> {
  getResource(id: string): Promise<ApiResponse<T>>;
  listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>>;
  createResource(data: Partial<T>): Promise<ApiResponse<T>>;
  updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>>;
  deleteResource(id: string): Promise<ApiResponse<void>>;
  getMarketInsights(): Promise<ApiResponse<MarketInsightsResponse>>;
}

type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
  metadata?: {
    timestamp: string;
    requestId?: string;
  };
};
```

## Market Types

```typescript
type MarketTrend = 'positive' | 'negative';
type InsightCategory = 'Market Trend' | 'Sector Movement';

type MarketInsight = {
  category: InsightCategory;
  text: string;
  trend: MarketTrend;
};

type MarketInsightsResponse = {
  insights: MarketInsight[];
  lastUpdated: string;
};
```

## Adding Mock Endpoints

To add new mock endpoints to the MockAPIClient:

1. Define your mock data type:

```typescript
type MockStock = {
  id: string;
  symbol: string;
  price: number;
};
```

2. Add mock data to constants/mockData.ts:

```typescript
export const MOCK_STOCKS: MockStock[] = [
  { id: '1', symbol: 'MOCK-AAPL', price: 150 },
  { id: '2', symbol: 'MOCK-MSFT', price: 280 }
];
```

3. Implement the endpoint in MockAPIClient:

```typescript
export class MockAPIClient implements ApiClient<MockStock> {
  async getStocks(): Promise<ApiResponse<MockStock[]>> {
    return {
      data: MOCK_STOCKS,
      status: 200
    };
  }
}
```

### Best Practices for Mocking

- Keep all mock data in the constants/mockData.ts file
- Match the real API response structure exactly
- Include error scenarios using MockAPIClient's error simulation
- Use TypeScript for type safety in mock data

## Testing Mock Endpoints

```typescript
import { describe, it, expect } from 'vitest';
import { mockApiClient } from './mockApiClient';

describe('Mock API Client', () => {
  it('should return mock stocks', async () => {
    const response = await mockApiClient.getStocks();
    expect(response.data).toHaveLength(2);
    expect(response.data[0].symbol).toBe('MOCK-AAPL');
  });
});
```

## Testing

Run unit tests:

```bash
nx test api-client
```

## Environment Variables

```env
VITE_REACT_APP_USE_MOCKS=true  # Enable mock client
API_BASE_URL=https://api.erisfy.com
```

## Installation
We use pnpm exclusively for package management. To install dependencies, run:
```bash
pnpm install
```
