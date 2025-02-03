import { http, HttpResponse } from 'msw';

// Define your mock API handlers here
export const handlers = [
  // Example handler - replace with your actual API endpoints
  http.get('/api/*', () => {
    return HttpResponse.json({ message: 'Mocked response' });
  }),
];
