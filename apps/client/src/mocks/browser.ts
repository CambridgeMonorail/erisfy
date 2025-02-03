import { http, HttpResponse, delay } from 'msw'
import { setupWorker } from 'msw/browser'
import { getMockStockById, mockStocks } from './data/stocks'
import { generateMockInsights } from './data/marketInsights'

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL ?? '';

const handlers = [
  http.get(`${API_BASE_URL}/stocks/:id`, async ({ params }) => {
    await delay(500);
    
    const { id } = params;
    if (id === 'error') {
      return new HttpResponse(null, { 
        status: 500,
        statusText: 'Internal Server Error'
      });
    }

    return HttpResponse.json(getMockStockById(id as string));
  }),

  http.get(`${API_BASE_URL}/stocks`, async () => {
    await delay(500);
    return HttpResponse.json(mockStocks);
  }),

  http.get(`${API_BASE_URL}/market/insights`, async () => {
    await delay(300);
    return HttpResponse.json(generateMockInsights());
  })
];

export const worker = setupWorker(...handlers);
