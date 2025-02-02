# Integrating API Mocking with MSW in Erisfy

## 1. Install MSW

Run the following command to install MSW as a development dependency in your monorepo:

```bash
pnpm add msw --save-dev
```

## 2. Set Up the Mock Service Worker

Create a new mocks directory inside the client application:

```bash
mkdir -p apps/client/src/mocks
```

Then, create the MSW service worker setup file:

### apps/client/src/mocks/browser.ts

```typescript
import { setupWorker, rest } from 'msw';

export const worker = setupWorker(
  rest.get(`${import.meta.env.VITE_API_BASE_URL}/stocks/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.status(200),
      ctx.json({ 
        id, 
        symbol: `MOCK-${id}`, 
        price: 100 + Math.random() * 50 
      })
    );
  }),

  rest.get(`${import.meta.env.VITE_API_BASE_URL}/stocks`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: '1', symbol: 'MOCK-AAPL', price: 150 },
        { id: '2', symbol: 'MOCK-MSFT', price: 280 },
      ])
    );
  })
);
```

## 3. Initialize MSW in Development Mode

Modify the main.tsx entry file to conditionally start MSW in development mode.

### apps/client/src/main.tsx

```typescript
const useMocks = import.meta.env.VITE_USE_MOCKS === 'true';

if (useMocks) {
  const { worker } = require('./mocks/browser');
  worker.start();
}
```

## 4. Configure API Client to Use Mock Data

Modify the Erisfy API Client to conditionally switch between the real API and the mock API.

### libs/api-client/src/clients/apiClient.ts

```typescript
import { ApiClient } from '../types';
import { MockAPIClient } from './mockApiClient';

const isMock = import.meta.env.VITE_USE_MOCKS === 'true';

const apiClient: ApiClient = isMock
  ? new MockAPIClient()
  : new RealAPIClient();

export default apiClient;
```

### libs/api-client/src/clients/mockApiClient.ts

```typescript
import { ApiClient } from '../types';

export class MockAPIClient implements ApiClient {
  async getResource(id: string) {
    return { 
      data: { id, symbol: `MOCK-${id}`, price: 120 }, 
      status: 200 
    };
  }

  async listResources() {
    return {
      data: [
        { id: '1', symbol: 'MOCK-AAPL', price: 150 },
        { id: '2', symbol: 'MOCK-MSFT', price: 280 },
      ],
      status: 200,
    };
  }
}
```

## 5. Set Up Environment Variables

Modify the .env.development file to enable API mocking:

### apps/client/.env.development

```ini
VITE_API_BASE_URL=http://localhost:4000/api
VITE_USE_MOCKS=true
```

## 6. Running the Application with Mocks

Now, when you start your application in development mode, MSW will intercept API calls.

Run the app:

```bash
pnpm start
```

In the browser console, you should see:

```
[MSW] Mocking enabled.
```

## 7. Testing MSW in Vitest

You should also mock API requests in unit tests using MSW.

### apps/client/src/mocks/server.ts

```typescript
import { setupServer } from 'msw/node';
import { rest } from 'msw';

export const server = setupServer(
  rest.get(`${import.meta.env.VITE_API_BASE_URL}/stocks/:id`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({ id: '1', symbol: 'MOCK-TSLA', price: 900 })
    );
  })
);
```

### apps/client/src/test/setup.ts

```typescript
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

## 8. Writing a Mocked API Test

Example Vitest test case for verifying API mocking.

### apps/client/src/api/apiClient.test.ts

```typescript
import { describe, it, expect } from 'vitest';
import apiClient from '@erisfy/api-client';

describe('API Client Mock Tests', () => {
  it('should return mock stock data', async () => {
    const response = await apiClient.getResource('1');
    expect(response.data.symbol).toBe('MOCK-TSLA');
  });
});
```

Run the test:

```bash
pnpm test api-client
```

If MSW is working correctly, it should return:

```
✓ API Client Mock Tests › should return mock stock data
```

## Note

Ensure that `VITE_USE_MOCKS` is set to 'true' in your environment variables to enable MSW. If `VITE_USE_MOCKS` is 'false' or undefined, MSW will not start.
