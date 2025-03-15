import { http, HttpResponse } from 'msw';

import { createMarketDataInsights, createMarketDataInsightsArray } from '../factories/marketInsights';
import { MarketDataInsights } from '@erisfy/api';

// Use relative path for API endpoints since we're in a browser context
const API_BASE_URL = '';

console.log('[MSW] Setting up market insights handlers');

export const marketInsightsHandlers = [
  // Handler for /api/market-insights/latest endpoint
  http.get(`${API_BASE_URL}/api/market-insights/latest`, ({ request }) => {
    console.log('[MSW] Handling GET request to /api/market-insights/latest');
    console.log('[MSW] Request URL:', request.url);

    // Generate realistic market insights data using the factory
    const mockInsight = createMarketDataInsights();

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

    // Create an array of insights using the factory
    const mockInsights: MarketDataInsights[] = date
      ? [createMarketDataInsights({ date })]
      : createMarketDataInsightsArray(2); // Create 2 records for different dates if no date specified

    let filteredInsights = mockInsights;

    // Filter is already handled in factory when date is provided

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
    // Use the factory with override data
    const mockInsight = createMarketDataInsights(data);

    console.log('[MSW] Created mock insight from POST data:', mockInsight);
    return HttpResponse.json(mockInsight);
  }),

  http.patch(`${API_BASE_URL}/api/market-insights/:date`, async ({ params, request }) => {
    console.log('[MSW] Handling PATCH request to /api/market-insights/:date');
    console.log('[MSW] Date param:', params['date']);

    const data = await request.json() as Partial<MarketDataInsights>;
    // Use the factory with the date parameter and override data
    const mockInsight = createMarketDataInsights({
      date: params['date'] as string,
      ...data
    });

    console.log('[MSW] Updated mock insight:', mockInsight);
    return HttpResponse.json(mockInsight);
  })
];
