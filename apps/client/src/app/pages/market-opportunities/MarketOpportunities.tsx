import { FC, useEffect } from 'react';
import { cn } from '@erisfy/shadcnui';
import { ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useLatestMarketInsight } from '../../hooks/useLatestMarketInsight';
import { useMarketSentiment } from '../../hooks/useMarketSentiment';
import { DashboardContent } from '../../components/market/DashboardContent';
import type { MarketOpportunitiesProps } from '../../types/market';

export const MarketOpportunitiesPage: FC<MarketOpportunitiesProps> = ({
  className,
}) => {
  const isMobile = useMediaQuery('(max-width: 780px)');

  const {
    data: marketInsights,
    isLoading: isMarketInsightsLoading,
    error: marketInsightsError
  } = useLatestMarketInsight();

  const {
    marketData: marketSentimentData,
    isLoading: isSentimentLoading,
    error: sentimentError
  } = useMarketSentiment();

  // Debug logs for MarketOpportunitiesPage
  useEffect(() => {
    console.log('[MarketOpportunitiesPage] Market insights data:', {
      marketInsights,
      hasData: !!marketInsights,
      storiesCount: marketInsights?.stories?.length || 0,
      isMarketInsightsLoading,
      hasError: !!marketInsightsError
    });
  }, [marketInsights, isMarketInsightsLoading, marketInsightsError]);

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
      <ErrorBoundary>
        <DashboardContent
          marketOpportunities={{
            marketInsights: marketInsights || undefined, // Convert null to undefined
            isLoading: isMarketInsightsLoading,
            error: marketInsightsError,
          }}
          marketSentiment={{
            marketData: marketSentimentData || undefined, // Convert null to undefined if needed
            isLoading: isSentimentLoading,
            error: sentimentError
          }}
        />
      </ErrorBoundary>
    </div>
  );
};
