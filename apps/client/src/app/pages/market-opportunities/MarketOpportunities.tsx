import { FC, useMemo } from 'react';
import { cn } from '@erisfy/shadcnui';
import { ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useMarketOpportunities } from '../../hooks/useMarketOpportunities';
import { useMarketSentiment } from '../../hooks/useMarketSentiment';
import { ApiErrorAlert } from '../../components/ApiErrorAlert';
import { DashboardContent } from '../../components/market/DashboardContent';
import { MarketOpportunitiesSkeleton } from '../../components/market/MarketOpportunitiesSkeleton';
import type { MarketOpportunitiesProps } from '../../types/market';
import type { MarketSector } from '@erisfy/api';

// Map market sectors to their primary industry
const SECTOR_TO_INDUSTRY: Record<MarketSector, "Software" | "Banking" | "Pharmaceuticals" | "Oil & Gas"> = {
  "Information Technology": "Software",
  "Financials": "Banking",
  "Healthcare": "Pharmaceuticals",
  "Energy": "Oil & Gas",
  "Materials": "Oil & Gas",
  "Industrials": "Oil & Gas",
  "Utilities": "Oil & Gas",
  "Consumer Discretionary": "Banking",
  "Consumer Staples": "Banking",
  "Communication Services": "Software",
  "Real Estate": "Banking",
  "Overall stock market": "Banking",
  "Bond market": "Banking",
  "Automotive sector": "Oil & Gas",
  "Multiple sectors": "Banking",
  "Overall U.S. stock market": "Banking",
  "Equity market": "Banking",
  "Commodity market": "Oil & Gas",
  "General financial market": "Banking"
};

// Default to USA for stock listings
const DEFAULT_COUNTRY = 'USA' as const;

export const MarketOpportunitiesPage: FC<MarketOpportunitiesProps> = ({
  className,
}) => {
  // Custom hook for responsive design
  const isMobile = useMediaQuery('(max-width: 780px)');

  // Data fetching hooks
  const {
    data: marketInsights,
    isLoading: isMarketsLoading,
    error: marketsError,
    refetch: refetchMarkets
  } = useMarketOpportunities();

  const {
    marketData,
    isLoading: isMarketDataLoading,
    error: marketDataError,
    refetch: refetchMarketData
  } = useMarketSentiment();

  // Transform market insights stories into filtered stocks format
  const filteredStocks = useMemo(() => {
    if (!marketInsights?.stories) return [];
    return marketInsights.stories.map((story, index) => ({
      ticker: `STOCK${index}`, // Placeholder ticker
      companyName: story.title,
      sector: story.market_sector,
      industry: SECTOR_TO_INDUSTRY[story.market_sector] || "Software", // Map sector to industry with fallback
      country: DEFAULT_COUNTRY, // Default to USA
      currentPrice: 0, // Placeholder price
      marketCap: 0, // Placeholder market cap
      historicalPerformance: [] // Placeholder performance data
    }));
  }, [marketInsights]);

  // Derived state
  const isLoading = isMarketsLoading || isMarketDataLoading;
  const error = marketsError || marketDataError;

  // Combined refetch function
  const refetch = async () => {
    await Promise.all([refetchMarkets(), refetchMarketData()]);
  };

  return (
    <div
      role="main"
      data-testid="market-opportunities-page"
      className={cn(
        'h-full min-h-full w-full text-primary-900 flex-col',
        isMobile ? 'flex' : 'hidden md:flex',
        className,
      )}
    >
      {isLoading ? (
        <MarketOpportunitiesSkeleton />
      ) : error ? (
        <div className="p-4">
          <ApiErrorAlert error={error} onRetry={refetch} />
        </div>
      ) : (
        <ErrorBoundary>
          <DashboardContent
            filteredStocks={filteredStocks}
            isLoading={isLoading}
            marketData={marketData}
          />
        </ErrorBoundary>
      )}
    </div>
  );
};
