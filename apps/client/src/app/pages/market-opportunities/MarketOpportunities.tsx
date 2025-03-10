import { FC, useMemo } from 'react';
import { cn } from '@erisfy/shadcnui';
import { ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useMarketOpportunities } from '../../hooks/useMarketOpportunities';
import { ApiErrorAlert } from '../../components/ApiErrorAlert';
import { DashboardContent } from '../../components/market/DashboardContent';
import { MarketOpportunitiesSkeleton } from '../../components/market/MarketOpportunitiesSkeleton';
import type { MarketOpportunitiesProps } from '../../types/market';

export const MarketOpportunitiesPage: FC<MarketOpportunitiesProps> = ({
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 780px)');
  const { stocks, marketData, isLoading, error, refetch } = useMarketOpportunities();

  // Apply search only
  const filteredStocks = useMemo(() => stocks, [stocks]);

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
