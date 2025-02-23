import { useState, useEffect, useMemo } from 'react';
import { ApiError, MarketInsightsEndpoint, MarketDataInsights } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

export const useMarketNews = () => {
  const [news, setNews] = useState<MarketDataInsights | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const marketNewsClient = useMemo(
    () => new MarketInsightsEndpoint(createApiConfig()),
    []
  );

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await marketNewsClient.getLatestMarketInsight();
      setNews(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpdate = async () => {
    try {
      setIsUpdating(true);
      await fetchNews();
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    void fetchNews();
  }, []);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    triggerUpdate,
  };
};

import { useState, useEffect, useMemo } from 'react';
import { ApiError, NewsEndpoint, NewsArticle } from '@erisfy/api';
import { createApiConfig } from '../utils/apiConfig';

export const useGeneralNews = () => {
  const [news, setNews] = useState<NewsArticle[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  const newsClient = useMemo(
    () => new NewsEndpoint(createApiConfig()),
    []
  );

  const fetchNews = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data } = await newsClient.getLatestNews();
      setNews(data);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const triggerUpdate = async () => {
    try {
      setIsUpdating(true);
      await fetchNews();
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    void fetchNews();
  }, []);

  return {
    news,
    isLoading,
    error,
    isUpdating,
    triggerUpdate,
  };
};
