import { FC } from 'react';
import { Button } from '@erisfy/shadcnui';
import { Download } from 'lucide-react';
import { CalendarDateRangePicker, ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { AIPoweredMarketOverview } from '../AIPoweredMarketOverview';
import { MainWorkspace } from '../MainWorkspace';
import { MarketSentimentNewsFeed } from '../MarketSentimentNewsFeed';
import type { StockData } from '../../utils/mockData';
import type { MarketData } from '../MarketSentimentNewsFeed';

type DashboardContentProps = {
  filteredStocks: StockData[];
  isLoading: boolean;
  marketData: MarketData | null;
};

export const DashboardContent: FC<DashboardContentProps> = ({
  filteredStocks,
  isLoading,
  marketData,
}) => {
  console.log('[DashboardContent] About to render MarketSentimentNewsFeed with:', {
    isLoading,
    hasMarketData: !!marketData,
    marketDataContent: marketData
  });

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
            <Download className="sm:hidden" />
          </Button>
        </div>
      </div>

      {/* Market Analysis Section */}
      <ErrorBoundary>
        <div className="space-y-4">
          <AIPoweredMarketOverview
            filteredStocks={filteredStocks}
            isLoading={isLoading}
          />
        </div>
      </ErrorBoundary>

      {/* Market Intel Section */}
      <ErrorBoundary>
        <div className="space-y-4">
          {marketData && (
            <MarketSentimentNewsFeed
              isLoading={isLoading}
              marketData={marketData}
            />
          )}
          <MainWorkspace />
        </div>
      </ErrorBoundary>

      {/* Footer Section */}
      <footer className="bg-background text-foreground p-4">
        <div className="space-y-4">
          <div>
            <strong>Learning & Community Resources:</strong>
            <ul className="list-disc list-inside">
              <li>Glossary of financial terms</li>
              <li>Tutorials on how to use filters effectively</li>
              <li>Community forum or expert discussion groups</li>
            </ul>
          </div>
          <div>
            <strong>Elite Upgrade Prompt:</strong>
            <p>Unlock real-time alerts and advanced AI insights with Elite.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
