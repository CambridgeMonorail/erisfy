import { useState, useEffect } from 'react';

import { StockData } from '../utils/mockData';
import { MarketInsight } from 'libs/api-client/src/types/market.types';


export const useMarketInsights = (stocks: StockData[]) => {
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const response = await apiClient.getMarketInsights();
        setInsights(response.data.insights);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load insights'));
        setInsights([]);
      }
    };

    loadInsights();
  }, [stocks]);

  return { insights, error };
};

export type { MarketInsight };  // Re-export from shared
