import { useState, useEffect, useCallback } from 'react';
import { MarketInsightsEndpoint, ApiError, type MarketSector } from '@erisfy/api';
import { shouldUseMocks } from '../../utils/environment';
import type { StockData } from '../utils/mockData';
import type { MarketData, SentimentType } from '../components/MarketSentimentNewsFeed';

const SECTORS: MarketSector[] = [
  "Energy",
  "Materials",
  "Industrials",
  "Utilities",
  "Healthcare",
  "Financials",
  "Consumer Discretionary",
  "Consumer Staples",
  "Information Technology",
  "Communication Services",
  "Real Estate"
];

// Maximum number of retries for API calls
const MAX_RETRIES = 3;
// Base delay for exponential backoff (in ms)
const BASE_DELAY = 1000;

/**
 * Implements exponential backoff delay
 * @param retryCount Current retry attempt number
 * @returns Delay in milliseconds
 */
const getBackoffDelay = (retryCount: number) => {
  return Math.min(BASE_DELAY * Math.pow(2, retryCount), 10000);
};

// Temporary mock data generator until API is ready
const generateMockData = (count: number): StockData[] => {
  return Array.from({ length: count }, (_, i) => {
    const basePrice = Math.random() * 1000;
    return {
      ticker: `TKR${i}`,
      companyName: `Company ${i}`,
      sector: SECTORS[i % SECTORS.length],
      industry: 'Software',
      country: 'USA',
      currentPrice: basePrice,
      marketCap: Math.random() * 1000000000,
      historicalPerformance: Array.from({ length: 30 }, (_, j) => ({
        date: new Date(Date.now() - j * 24 * 60 * 60 * 1000).toISOString(),
        value: basePrice * (1 + (Math.random() * 0.2 - 0.1)) // +/- 10% variance
      }))
    };
  });
};

/**
 * Validates the API configuration and returns any errors
 */
const validateApiConfig = () => {
  if (shouldUseMocks()) {
    return null;
  }

  const baseURL = import.meta.env.VITE_API_BASE_URL;
  if (!baseURL) {
    return new ApiError(500, 'API base URL not configured. Please set VITE_API_BASE_URL environment variable.');
  }
  return null;
};

export function useMarketOpportunities() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchMarketInsights = useCallback(async (attempt = 0): Promise<MarketData | null> => {
    try {
      // If mocks are enabled, return mock data
      if (shouldUseMocks()) {
        return {
          structuredAnalysis: {
            analysis: "Mock market analysis: Tech stocks showing strong momentum.",
            sectors: SECTORS.slice(0, 3),
            marketSentiment: "bullish" as SentimentType,
            tickers: ["MOCK1", "MOCK2", "MOCK3"]
          },
          sentiment: "bullish" as SentimentType,
          stockInfoMap: {},
          stockInfo: {
            ticker: "MOCK1",
            price: 150.00,
            dayChange: 2.5,
            dayChangePercent: 1.67,
            marketCap: 2000000000,
            time: new Date().toISOString()
          }
        };
      }

      // Validate configuration before making request
      const configError = validateApiConfig();
      if (configError) {
        throw configError;
      }

      const client = new MarketInsightsEndpoint({
        baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
        timeout: 10000,
      });

      console.log('[useMarketOpportunities] Fetching market insights...');
      const response = await client.getLatestMarketInsight();
      console.log('[useMarketOpportunities] Market insights response:', response);

      if (!response?.data) {
        throw new ApiError(500, 'Invalid market insights data received');
      }

      // Transform MarketDataInsights into MarketData format with null checks
      return {
        structuredAnalysis: {
          analysis: response.data.stories?.[0]?.whats_happening || 'No market analysis available',
          sectors: response.data.stories ? Array.from(new Set(response.data.stories.map(s => s.market_sector))) : [],
          marketSentiment: (response.data.stories?.[0]?.market_sector as SentimentType) || 'neutral',
          tickers: []
        },
        sentiment: 'neutral',
        stockInfoMap: {},
        stockInfo: {
          ticker: '',
          price: 0,
          dayChange: 0,
          dayChangePercent: 0,
          marketCap: 0,
          time: new Date().toISOString()
        }
      };
    } catch (err) {
      console.error(`[useMarketOpportunities] Attempt ${attempt + 1} failed:`, err);

      if (err instanceof ApiError) {
        // Only retry on network errors or 5xx errors
        if (err.status >= 500 && attempt < MAX_RETRIES) {
          const delay = getBackoffDelay(attempt);
          console.log(`[useMarketOpportunities] Retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
          return fetchMarketInsights(attempt + 1);
        }
      }
      throw err;
    }
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Fetch market insights with retry logic
      try {
        const marketInsightsData = await fetchMarketInsights();
        if (marketInsightsData) {
          setMarketData(marketInsightsData);
        }
      } catch (err) {
        console.error('[useMarketOpportunities] Market insights fetch failed:', err);

        if (err instanceof ApiError) {
          setError(err);
        } else {
          setError(new ApiError(500, 'Failed to fetch market insights'));
        }
      }

      // Always generate mock stocks even if market insights fail
      const mockStocks = generateMockData(100);
      setStocks(mockStocks);
    } finally {
      setIsLoading(false);
    }
  }, [fetchMarketInsights]);

  const reset = useCallback(() => {
    setError(null);
    setIsLoading(false);
    setStocks([]);
    setMarketData(null);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    stocks,
    marketData,
    isLoading,
    error,
    refetch: fetchData,
    reset,
  };
}
