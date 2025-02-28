import { http, HttpResponse } from 'msw';

import { createMarketDataInsights } from '../factories/marketInsights';
import { MarketDataInsights } from '@erisfy/api';

// Update API base URL to match the actual API URL used in the application
const API_BASE_URL = 'https://api.erisfy.com';

// Log outside the array, not as an array element
console.log('API_BASE_URL', API_BASE_URL);

export const marketInsightsHandlers = [
  http.get(`${API_BASE_URL}/api/market-insights`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const market_sector = url.searchParams.get('market_sector');

    console.log('date', date);
    console.log('market_sector', market_sector);
    console.log('url', url);

    // Create an array of insights
    const mockInsights: MarketDataInsights[] = [createMarketDataInsights(date ? { date } : undefined)];

    console.log('mockInsights', mockInsights);

    let filteredInsights = mockInsights;

    if (date) {
      filteredInsights = mockInsights.filter(insight => insight.date === date);
    }

    if (market_sector) {
      filteredInsights = filteredInsights.filter(insight =>
        insight.stories.some(story => story.market_sector === market_sector)
      );
    }

    console.log('filteredInsights', filteredInsights);

    return HttpResponse.json(filteredInsights);
  }),

  http.post(`${API_BASE_URL}/api/market-insights`, async ({ request }) => {
    const data = await request.json() as Partial<MarketDataInsights>;
    return HttpResponse.json(createMarketDataInsights(data));
  }),

  http.patch(`${API_BASE_URL}/api/market-insights/:date`, async ({ params, request }) => {
    const data = await request.json() as Partial<MarketDataInsights>;
    return HttpResponse.json(createMarketDataInsights({
      date: params['date'] as string,
      ...data
    }));
  })
];
