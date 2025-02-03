import { http, HttpResponse } from 'msw';

// Mock data
const mockStocks = [
  { id: '1', symbol: 'MOCK-AAPL', price: 150 },
  { id: '2', symbol: 'MOCK-MSFT', price: 280 },
];

// Define your mock API handlers here
export const handlers = [
  // Stock endpoints
  http.get('/api/stocks', () => {
    return HttpResponse.json(mockStocks);
  }),
  
  http.get('/api/stocks/:id', ({ params }) => {
    const stock = mockStocks.find(s => s.id === params.id);
    if (!stock) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(stock);
  }),

  // Example handler - replace with your actual API endpoints
  http.get('/api/*', () => {
    return HttpResponse.json({ message: 'Mocked response' });
  }),
];
