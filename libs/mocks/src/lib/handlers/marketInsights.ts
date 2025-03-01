import { http, HttpResponse } from 'msw';

import { createMarketDataInsights } from '../factories/marketInsights';
import { MarketDataInsights } from '@erisfy/api';

// Update API base URL to match the actual API URL used in the application
const API_BASE_URL = 'https://api.erisfy.com';

console.log('[MSW] Setting up market insights handlers with BASE_URL:', API_BASE_URL);

export const marketInsightsHandlers = [
  // Handler for /api/market-insights/latest endpoint
  http.get(`${API_BASE_URL}/api/market-insights/latest`, ({ request }) => {
    console.log('[MSW] Handling GET request to /api/market-insights/latest');
    console.log('[MSW] Request URL:', request.url);

    // Create a mock insight with today's date
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const mockInsight = createMarketDataInsights({ date: formattedDate });
    console.log('[MSW] Responding with mock insight:', mockInsight);

    return HttpResponse.json(mockInsight);
  }),

  http.get(`${API_BASE_URL}/api/market-insights`, ({ request }) => {
    console.log('[MSW] Handling GET request to /api/market-insights');
    console.log('[MSW] Request URL:', request.url);

    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const market_sector = url.searchParams.get('market_sector');

    console.log('[MSW] Query params - date:', date);
    console.log('[MSW] Query params - market_sector:', market_sector);

    // Create an array of insights
    const mockInsights: MarketDataInsights[] = [createMarketDataInsights(date ? { date } : undefined)];

    let filteredInsights = mockInsights;

    if (date) {
      filteredInsights = mockInsights.filter(insight => insight.date === date);
    }

    if (market_sector) {
      filteredInsights = filteredInsights.filter(insight =>
        insight.stories.some(story => story.market_sector === market_sector)
      );
    }

    console.log('[MSW] Responding with filtered insights:', filteredInsights);
    return HttpResponse.json(filteredInsights);
  }),

  http.post(`${API_BASE_URL}/api/market-insights`, async ({ request }) => {
    console.log('[MSW] Handling POST request to /api/market-insights');

    const data = await request.json() as Partial<MarketDataInsights>;
    const mockInsight = createMarketDataInsights(data);

    console.log('[MSW] Created mock insight from POST data:', mockInsight);
    return HttpResponse.json(mockInsight);
  }),

  http.patch(`${API_BASE_URL}/api/market-insights/:date`, async ({ params, request }) => {
    console.log('[MSW] Handling PATCH request to /api/market-insights/:date');
    console.log('[MSW] Date param:', params['date']);

    const data = await request.json() as Partial<MarketDataInsights>;
    const mockInsight = createMarketDataInsights({
      date: params['date'] as string,
      ...data
    });

    console.log('[MSW] Updated mock insight:', mockInsight);
    return HttpResponse.json(mockInsight);
  })
];
