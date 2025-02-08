import { http } from 'msw';

import { createMarketDataInsights } from '../factories/marketInsights';
import { MarketDataInsights } from '@erisfy/api';

const API_BASE_URL = import.meta.env['VITE_API_BASE_URL'];

export const marketInsightsHandlers = [

  console.log('API_BASE_URL', API_BASE_URL),

  http.get(`${API_BASE_URL}/api/market-insights`, ({ request }) => {
    const url = new URL(request.url);
    const date = url.searchParams.get('date');
    const market_sector = url.searchParams.get('market_sector');

    // Create an array of insights
    const mockInsights: MarketDataInsights[] = [createMarketDataInsights()];
    
    let filteredInsights = mockInsights;

    if (date) {
      filteredInsights = mockInsights.filter(insight => insight.date === date);
    }

    if (market_sector) {
      filteredInsights = filteredInsights.filter(insight => 
        insight.stories.some(story => story.market_sector === market_sector)
      );
    }

    return Response.json(filteredInsights);
  }),

  http.post(`${API_BASE_URL}/api/market-insights`, async ({ request }) => {
    const data = await request.json() as Partial<MarketDataInsights>;
    return Response.json(createMarketDataInsights(data));
  }),

  http.patch(`${API_BASE_URL}/api/market-insights/:date`, async ({ params, request }) => {
    const data = await request.json() as Partial<MarketDataInsights>;
    return Response.json(createMarketDataInsights({ 
      date: params['date'] as string,
      ...data 
    }));
  })
];
