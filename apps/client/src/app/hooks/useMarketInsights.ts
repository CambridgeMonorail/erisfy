import { useState, useEffect, useMemo } from 'react';
import {
  ApiError,
  MarketDataInsights,
  MarketDataInsightsFilter,
  MarketInsightsEndpoint,
} from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

export const useMarketInsights = (filter?: MarketDataInsightsFilter) => {
  const marketInsightsClient = useMemo(
    () => new MarketInsightsEndpoint(createApiConfig()),
    []
  );
  const [insights, setInsights] = useState<MarketDataInsights[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        setIsLoading(true);
        const { data } = await marketInsightsClient.getMarketInsights(filter);
        setInsights(data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('Failed to load market insights');
        }
        setInsights(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadInsights();
  }, [filter, marketInsightsClient]);

  return { insights, isLoading, error };
};

export type { MarketDataInsights, MarketDataInsightsFilter };
