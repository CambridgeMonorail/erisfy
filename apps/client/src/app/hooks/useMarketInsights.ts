import {
  ApiError,
  MarketDataInsights,
  MarketInsightsEndpoint,
} from '@erisfy/api';
import { useState, useEffect, useMemo } from 'react';
import { createApiConfig } from '../utils/apiConfig';

export const useMarketInsights = (date?: string) => {
  const [insights, setInsights] = useState<MarketDataInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the API client to prevent recreation on each render
  const marketInsightsClient = useMemo(
    () => new MarketInsightsEndpoint(createApiConfig()),
    [],
  );

  useEffect(() => {
    let isSubscribed = true;
    const controller = new AbortController();

    const fetchInsights = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const { data } = await marketInsightsClient.getMarketInsights({ date });

        console.log('data', data);

        if (isSubscribed) {
          setInsights(data[0] || null);
        }
      } catch (err) {
        if (!isSubscribed) return;

        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    fetchInsights();

    return () => {
      isSubscribed = false;
      controller.abort();
    };
  }, [date, marketInsightsClient]);

  return { insights, isLoading, error };
};
