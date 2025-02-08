# API Mock Endpoints

This document provides an overview of the key mock endpoints used in the project. These endpoints are implemented using Mock Service Worker (MSW) to simulate API responses for development and testing purposes.

## Key Mock Endpoints

### Stocks API

- **GET /stocks/:id**
  - Description: Returns mock stock data for a specific stock ID.
  - Example Response:
    ```json
    {
      "id": "1",
      "symbol": "MOCK-AAPL",
      "price": 150
    }
    ```

- **GET /stocks**
  - Description: Returns a list of mock stocks.
  - Example Response:
    ```json
    [
      {
        "id": "1",
        "symbol": "MOCK-AAPL",
        "price": 150
      },
      {
        "id": "2",
        "symbol": "MOCK-MSFT",
        "price": 280
      }
    ]
    ```

## Adding New Mock Endpoints

To add new mock endpoints, follow these steps:

1. **Create Mock Data**: Define the mock data for the new API in the `apps/client/src/mocks/data` directory. For example, create a new file like `newApi.ts` to define the mock data.

2. **Update Handlers**: Update the `apps/client/src/mocks/browser.ts` file to include handlers for the new API endpoints. Use the `http` methods provided by MSW to define the handlers.

3. **Initialize Mock Worker**: Ensure that the mock worker is initialized in the `apps/client/src/main.tsx` file by calling the `initializeMockWorker` function if mocks are enabled.

4. **Update Mock API Client**: Update the `libs/api/src/clients/mockApiClient.ts` file to include methods for the new API endpoints, ensuring that the mock client returns the appropriate mock data.

By following these steps, you can add specific mocks for new APIs using MSW in your project. This will help you test and develop your application without relying on real API endpoints.
