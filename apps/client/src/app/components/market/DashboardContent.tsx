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
  console.log('[DashboardContent] Rendering with props:', {
    hasFilteredStocks: !!filteredStocks?.length,
    filteredStocksCount: filteredStocks?.length,
    isLoading,
    hasMarketData: !!marketData,
    marketDataDetails: marketData ? {
      hasStructuredAnalysis: !!marketData.structuredAnalysis,
      sentiment: marketData.structuredAnalysis?.marketSentiment,
      sectorsCount: marketData.structuredAnalysis?.sectors?.length,
      tickersCount: marketData.structuredAnalysis?.tickers?.length,
      stockInfoMapSize: Object.keys(marketData.stockInfoMap || {}).length
    } : 'null'
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
    </div>
  );
};
