import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Button, cn, Alert, AlertTitle, AlertDescription } from '@erisfy/shadcnui';
import { Download, AlertTriangle } from 'lucide-react';
import { CalendarDateRangePicker } from '@erisfy/shadcnui-blocks';
import { ApiError } from '@erisfy/api-client';
import { ErrorBoundary } from '@erisfy/shadcnui-blocks';

import { generateMockData, StockData } from '../../utils/mockData';
import { AIPoweredMarketOverview } from '../../components/AIPoweredMarketOverview';
import { SmartFilterLibrary } from '../../components/SmartFilterLibrary';
import { MainWorkspace } from '../../components/MainWorkspace';
import { QuickActionsToolbar } from '../../components/QuickActionsToolbar';
import { MarketSentimentNewsFeed } from '../../components/MarketSentimentNewsFeed';
import { type FilterType, type MarketOpportunitiesProps } from '../../types/market';

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
  const [filters, setFilters] = useState<FilterType>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
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
          : new ApiError('Failed to fetch data', {
              code: 'FETCH_ERROR',
              details: err
            });
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterSelect = useCallback((filter: string): void => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterType): void => {
    try {
      setFilters(newFilters);
      // Add the filter to selected filters if it has a value
      Object.entries(newFilters).forEach(([key, value]) => {
        if (value) {
          handleFilterSelect(key);
        }
      });
    } catch (err) {
      setError(new ApiError('Failed to apply filters', {
        code: 'FILTER_ERROR',
        details: err
      }));
    }
  }, [handleFilterSelect]);

  const handleSliderChange = (key: 'marketCap' | 'priceRange', value: number[]) => {
    // Ensure we always have exactly two numbers
    const [start = 0, end = 0] = value;
    handleFilterChange({ 
      ...filters, 
      [key]: [start, end] as [number, number] 
    });
  };

  // Apply both search and filters
  const filteredStocks = useMemo(() => 
    stocks.filter((stock) => {
      const matchesSearch = searchQuery === '' || 
        stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
        stock.companyName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilters = Object.entries(filters).every(([key, value]) => {
        if (!value) return true;
        
        switch (key) {
          case 'sector':
          case 'industry':
          case 'country':
            return typeof value === 'string' && stock[key] === value;
          case 'marketCap':
            return Array.isArray(value) && 
              stock.marketCap >= value[0] && 
              stock.marketCap <= value[1];
          case 'priceRange':
            return Array.isArray(value) && 
              stock.currentPrice >= value[0] && // Changed from price to currentPrice
              stock.currentPrice <= value[1];   // Changed from price to currentPrice
          default:
            return true;
        }
      });

      return matchesSearch && matchesFilters;
    }), [stocks, searchQuery, filters]);

  const handleReset = () => {
    setError(null);
    setIsLoading(false);
    setStocks([]);
    // Reset other state as needed
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

      {/* Wrap sections that might throw errors in their own error boundaries */}
      <ErrorBoundary>
        <AIPoweredMarketOverview filteredStocks={filteredStocks} isLoading={isLoading} />
      </ErrorBoundary>

      <ErrorBoundary>
        <SmartFilterLibrary 
          filters={filters} 
          handleFilterChange={handleFilterChange}
          handleSliderChange={handleSliderChange}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFilters={selectedFilters}
        />
      </ErrorBoundary>

      <ErrorBoundary>
        <MainWorkspace />
      </ErrorBoundary>

      <ErrorBoundary>
        <QuickActionsToolbar />
      </ErrorBoundary>

      <ErrorBoundary>
        <MarketSentimentNewsFeed />
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
