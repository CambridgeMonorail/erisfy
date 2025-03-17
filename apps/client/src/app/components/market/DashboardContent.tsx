import { FC, memo } from 'react';
import { Button } from '@erisfy/shadcnui';
import { Download } from 'lucide-react';
import { CalendarDateRangePicker, ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { LatestMarketInsights } from '../../components/LatestMarketInsights';
import { MainWorkspace } from '../MainWorkspace';
import { MarketSentimentNewsFeed } from '../MarketSentimentNewsFeed';
import type { MarketData, MarketDataInsights } from '@erisfy/api';

/**
 * Props for the DashboardContent component
 */
export interface DashboardContentProps {
  /** Market opportunities data with insights, loading state and errors */
  marketOpportunities: {
    /** Market insights data object */
    marketInsights?: MarketDataInsights;
    /** Whether market insights data is currently loading */
    isLoading: boolean;
    /** Error that occurred during market insights data fetching, if any */
    error?: Error | null;
  };
  /** Market sentiment data with analysis, loading state and errors */
  marketSentiment: {
    /** Market sentiment and analysis data */
    marketData?: MarketData;
    /** Whether market sentiment data is currently loading */
    isLoading: boolean;
    /** Error that occurred during market sentiment data fetching, if any */
    error?: Error | null;
  };
}

/**
 * Main content component for the dashboard displaying market opportunities
 * and sentiment analysis
 * 
 * Renders market insights, sentiment analysis, and workspace sections
 */
export const DashboardContent: FC<DashboardContentProps> = memo(({
  marketOpportunities,
  marketSentiment,
}) => {
  return (
    <div
      className="flex-1 space-y-4 p-4 md:p-2 pt-6 w-full"
      data-testid="dashboard-content"
    >
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
        <h2
          className="text-3xl md:text-4xl font-bold tracking-tight text-primary"
          data-testid="dashboard-title"
        >
          Market Opportunities
        </h2>
        <div
          className="flex items-center space-x-3"
          data-testid="dashboard-actions"
          aria-label="Dashboard controls"
        >
          <CalendarDateRangePicker data-testid="date-range-picker" />
          <Button 
            variant="default" 
            data-testid="download-button"
            aria-label="Download market data"
          >
            <span className="hidden sm:inline">Download</span>
            <Download className="sm:ml-2 h-4 w-4 sm:hidden" aria-hidden="true" />
          </Button>
        </div>
      </header>

      {/* Market Analysis Section */}
      <section aria-label="Market Insights">
        <ErrorBoundary>
          <div className="space-y-4">
            <LatestMarketInsights
              data={marketOpportunities.marketInsights}
              isLoading={marketOpportunities.isLoading}
              error={marketOpportunities.error}
            />
          </div>
        </ErrorBoundary>
      </section>

      {/* Market Intel Section */}
      <section aria-label="Market Intelligence">
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
      </section>
    </div>
  );
});

// Display name for debugging purposes
DashboardContent.displayName = 'DashboardContent';
