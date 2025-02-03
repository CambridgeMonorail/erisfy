import { useState, useEffect } from 'react';
import { apiClient } from '@erisfy/api-client';
import { StockData } from '../utils/mockData';

type MarketTrend = 'positive' | 'negative';
type InsightCategory = 'Market Trend' | 'Sector Movement';

export interface MarketInsight {
  category: InsightCategory;
  text: string;
  trend: MarketTrend;
}

export const useMarketInsights = (stocks: StockData[]) => {
  const [insights, setInsights] = useState<MarketInsight[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const response = await apiClient.getMarketInsights();
        if (Array.isArray(response.data)) {
          setInsights(response.data as MarketInsight[]);
        } else {
          setInsights([]);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load insights'));
        setInsights([]);
      }
    };

    loadInsights();
  }, [stocks]);

  return { insights, error };
};
