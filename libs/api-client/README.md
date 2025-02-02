# api-client

This library provides a typed HTTP client implementation for interacting with the Erisfy API. It includes production, mock, and custom client implementations with built-in error handling and retry logic.

## Features

- Type-safe API client with TypeScript generics
- Automatic retries for failed requests
- Comprehensive error handling
- Environment-based client selection
- Mock client for development and testing

## Implementation Overview

The library provides three client implementations:

- **RealAPIClient**: Production client with full API implementation
- **MockAPIClient**: Development/testing client with simulated responses
- **myAPIClient**: Configurable client with retry logic and custom interceptors

## Usage Examples

### With TypeScript Generics

```ts
import apiClient from '@erisfy/api-client';

// Define your resource type
type Stock = {
  id: string;
  symbol: string;
  price: number;
};

// Use the typed client
const client = apiClient as ApiClient<Stock>;

async function fetchStock(id: string) {
  const response = await client.getResource(id);
  // response.data is typed as Stock
  console.log(response.data.symbol);
}
```

### Error Handling

The client includes comprehensive error handling with built-in retry logic:

```ts
import apiClient from '@erisfy/api-client';

try {
  const response = await apiClient.getResource('123');
  console.log(response.data);
} catch (error) {
  if (error instanceof ApiError) {
    console.error(`API Error: ${error.code} - ${error.message}`);
  }
}
```

Key error handling features:

- Network errors with automatic retries
- HTTP status code handling
- Detailed error messages and logging
- Type-safe error responses

## Configuration

The client can be configured through environment variables:

```env
API_BASE_URL=https://api.erisfy.com
REACT_APP_MY_API_KEY=your-api-key
```

## API Interface

The library implements the following interface:

```typescript
interface ApiClient<T = unknown> {
  getResource(id: string): Promise<ApiResponse<T>>;
  listResources(params?: Record<string, unknown>): Promise<ApiResponse<T[]>>;
  createResource(data: Partial<T>): Promise<ApiResponse<T>>;
  updateResource(id: string, data: Partial<T>): Promise<ApiResponse<T>>;
  deleteResource(id: string): Promise<ApiResponse<void>>;
}

type ApiResponse<T> = {
  data: T;
  status: number;
  message?: string;
};

type ApiError = {
  code: string;
  message: string;
  details?: unknown;
};
```

## Testing

Run unit tests:

```bash
nx test api-client
```

## Best Practices

- Always specify resource types when using the client
- Handle potential errors with try/catch blocks
- Use environment variables for configuration
- Consider using the mock client for development
