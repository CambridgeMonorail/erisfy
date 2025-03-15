import { FC, memo, useEffect } from 'react';
import { Button } from '@erisfy/shadcnui';
import { Download } from 'lucide-react';
import { CalendarDateRangePicker, ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { LatestMarketInsights } from '../../components/LatestMarketInsights';
import { MainWorkspace } from '../MainWorkspace';
import { MarketSentimentNewsFeed } from '../MarketSentimentNewsFeed';
import { MarketData } from '@erisfy/api';
import type { MarketDataInsights } from '@erisfy/api';

type DashboardContentProps = {
  /**
   * Props for market opportunities data
   */
  marketOpportunities: {
    marketInsights?: MarketDataInsights;
    isLoading: boolean;
    error?: Error | null;
  };
  /**
   * Props for market sentiment data
   */
  marketSentiment: {
    marketData?: MarketData;
    isLoading: boolean;
    error?: Error | null;
  };
};

export const DashboardContent: FC<DashboardContentProps> = memo(({
  marketOpportunities,
  marketSentiment,
}) => {
  // Debug logging for marketOpportunities prop
  useEffect(() => {
    console.log('[DashboardContent] Market Opportunities props:', {
      marketInsights: marketOpportunities.marketInsights,
      hasData: !!marketOpportunities.marketInsights,
      storiesCount: marketOpportunities.marketInsights?.stories?.length || 0,
      isLoading: marketOpportunities.isLoading,
      hasError: !!marketOpportunities.error
    });
  }, [marketOpportunities]);

  return (
    <div
      className="flex-1 space-y-4 p-4 md:p-2 pt-6 w-full"
      data-testid="dashboard-content"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight text-primary"
          data-testid="dashboard-title"
        >
          Market Opportunities
        </h2>
        <div
          className="flex items-center space-x-3"
          data-testid="dashboard-actions"
        >
          <CalendarDateRangePicker data-testid="date-range-picker" />
          <Button variant="default" data-testid="download-button">
            <span className="hidden sm:inline">Download</span>
            <Download className="sm:ml-2 h-4 w-4 sm:hidden" />
          </Button>
        </div>
      </div>

      {/* Market Analysis Section */}
      <ErrorBoundary>
        <div className="space-y-4">
          <LatestMarketInsights
            data={marketOpportunities.marketInsights}
            isLoading={marketOpportunities.isLoading}
            error={marketOpportunities.error}
          />
        </div>
      </ErrorBoundary>

      {/* Market Intel Section */}
      <ErrorBoundary>
        <div className="space-y-4">
          <MarketSentimentNewsFeed
            marketData={marketSentiment.marketData}
            isLoading={marketSentiment.isLoading}
            error={marketSentiment.error}
          />
          <MainWorkspace />
        </div>
      </ErrorBoundary>
    </div>
  );
});

// Display name for debugging purposes
DashboardContent.displayName = 'DashboardContent';
