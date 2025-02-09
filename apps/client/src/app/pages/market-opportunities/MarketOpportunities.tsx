import { FC, useState, useEffect, useMemo } from 'react';
import { Button, cn, Alert, AlertTitle, AlertDescription } from '@erisfy/shadcnui';
import { Download, AlertTriangle } from 'lucide-react';
import { CalendarDateRangePicker } from '@erisfy/shadcnui-blocks';

import { ErrorBoundary } from '@erisfy/shadcnui-blocks';

import { generateMockData, StockData } from '../../utils/mockData';
import { AIPoweredMarketOverview } from '../../components/AIPoweredMarketOverview';
import { MainWorkspace } from '../../components/MainWorkspace';
import { MarketSentimentNewsFeed } from '../../components/MarketSentimentNewsFeed';
import { type MarketOpportunitiesProps } from '../../types/market';
import { ApiError } from '@erisfy/api';

const ApiErrorAlert: FC<{ error: ApiError; onRetry: () => void }> = ({ error, onRetry }) => (
  <Alert variant="destructive">
    <AlertTriangle className="h-4 w-4" />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>
      <p className="mb-4">{error.message}</p>
      <Button variant="outline" onClick={onRetry}>
        Retry
      </Button>
    </AlertDescription>
  </Alert>
);

export const MarketOpportunitiesPage: FC<MarketOpportunitiesProps> = ({ className }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<ApiError | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = generateMockData(100);
        setStocks(data);
      } catch (err) {
        const error = err instanceof ApiError 
          ? err 
          : new ApiError(500, 'Failed to fetch data');
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Apply search only
  const filteredStocks = useMemo(() => 
    stocks, [stocks]);

  const handleReset = () => {
    setError(null);
    setIsLoading(false);
    setStocks([]);
  };

  // Move the content into a separate component to prevent the entire page from unmounting
  const DashboardContent: FC = () => (
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
          <AIPoweredMarketOverview filteredStocks={filteredStocks} isLoading={isLoading} />
          <MainWorkspace />
        </div>
      </ErrorBoundary>

      {/* Market Intel Section */}
      <ErrorBoundary>
        <div className="space-y-4">
          <MarketSentimentNewsFeed />
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

  return (
    <div
      role="main"
      data-testid="market-opportunities-page"
      className={cn(
        "h-full min-h-full w-full text-primary-900 flex-col",
        isMobile ? 'flex' : 'hidden',
        'md:flex',
        className
      )}
    >
      {isLoading ? (
        <div role="status" aria-label="Loading content" className="p-4">
          {/* Add skeleton UI here */}
        </div>
      ) : error ? (
        <div className="p-4">
          <ApiErrorAlert error={error} onRetry={handleReset} />
        </div>
      ) : (
        <ErrorBoundary>
          <DashboardContent />
        </ErrorBoundary>
      )}
    </div>
  );
};
