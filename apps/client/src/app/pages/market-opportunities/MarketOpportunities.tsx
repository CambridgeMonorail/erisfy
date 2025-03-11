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

export const MarketOpportunitiesPage: FC<MarketOpportunitiesProps> = ({
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 780px)');
  const { stocks, isLoading: isStocksLoading, error: stocksError, refetch: refetchStocks } = useMarketOpportunities();
  const { marketData, isLoading: isMarketDataLoading, error: marketDataError, refetch: refetchMarketData } = useMarketSentiment();

  console.log('[MarketOpportunitiesPage] Hook results:', {
    hasMarketData: !!marketData,
    marketDataContent: marketData,
    isMarketDataLoading,
    marketDataError
  });

  // Apply search only
  const filteredStocks = useMemo(() => stocks, [stocks]);

  const isLoading = isStocksLoading || isMarketDataLoading;
  const error = stocksError || marketDataError;
  const refetch = async () => {
    await Promise.all([refetchStocks(), refetchMarketData()]);
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
