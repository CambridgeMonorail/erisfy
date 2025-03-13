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
  "Real Estate": "Banking"
};

// Default to USA for stock listings
const DEFAULT_COUNTRY = 'USA' as const;

export const MarketOpportunitiesPage: FC<MarketOpportunitiesProps> = ({
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 780px)');
  const { data: marketInsights, isLoading: isMarketsLoading, error: marketsError, refetch: refetchMarkets } = useMarketOpportunities();
  const { marketData, isLoading: isMarketDataLoading, error: marketDataError, refetch: refetchMarketData } = useMarketSentiment();

  console.log('[MarketOpportunitiesPage] Current state:', {
    isMobile,
    hasMarketInsights: !!marketInsights,
    storiesCount: marketInsights?.stories?.length,
    isMarketsLoading,
    marketsError,
    hasMarketData: !!marketData,
    marketDataContent: {
      hasStructuredAnalysis: marketData?.structuredAnalysis !== undefined,
      structuredAnalysis: marketData?.structuredAnalysis ? {
        hasAnalysis: !!marketData.structuredAnalysis.analysis,
        analysisPreview: marketData.structuredAnalysis.analysis?.substring(0, 50),
        sectorsCount: marketData.structuredAnalysis.sectors?.length,
        sentiment: marketData.structuredAnalysis.marketSentiment,
        tickersCount: marketData.structuredAnalysis.tickers?.length
      } : 'undefined',
      stockInfoMapSize: marketData?.stockInfoMap ? Object.keys(marketData.stockInfoMap).length : 0,
      stockInfo: marketData?.stockInfo ? {
        ticker: marketData.stockInfo.ticker,
        hasPrice: marketData.stockInfo.price !== undefined,
        hasChange: marketData.stockInfo.dayChange !== undefined
      } : 'undefined'
    },
    isMarketDataLoading,
    marketDataError
  });

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

  const isLoading = isMarketsLoading || isMarketDataLoading;
  const error = marketsError || marketDataError;
  const refetch = async () => {
    await Promise.all([refetchMarkets(), refetchMarketData()]);
  };

  return (
    <div
      role="main"
      data-testid="market-opportunities-page"
      className={cn(
        'h-full min-h-full w-full text-primary-900 flex-col',
        isMobile ? 'flex' : 'hidden',
        'md:flex',
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
