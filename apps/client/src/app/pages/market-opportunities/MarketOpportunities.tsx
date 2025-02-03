import { FC, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
  Slider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@erisfy/shadcnui';

import { Download, Filter, Search, Bell, HelpCircle, AlertCircle } from 'lucide-react';
import {
  CalendarDateRangePicker,
  InteractiveChart,
} from '@erisfy/shadcnui-blocks';
import { generateMockData, StockData } from '../../utils/mockData';
import { AIPoweredMarketOverview } from '../../components/AIPoweredMarketOverview';
import { SmartFilterLibrary } from '../../components/SmartFilterLibrary';
import { MainWorkspace } from '../../components/MainWorkspace';
import { QuickActionsToolbar } from '../../components/QuickActionsToolbar';
import { MarketSentimentNewsFeed } from '../../components/MarketSentimentNewsFeed';

type FilterType = {
  sector?: string;
  industry?: string;
  country?: string;
  marketCap?: [number, number];
  priceRange?: [number, number];
};

export const MarketOpportunitiesPage: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filters, setFilters] = useState<FilterType>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 780);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const data = generateMockData(100);
    setStocks(data);
  }, []);

  const handleFilterChange = (newFilters: FilterType) => {
    setFilters(newFilters);
    // Add the filter to selected filters if it has a value
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        handleFilterSelect(key);
      }
    });
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const handleSliderChange = (key: 'marketCap' | 'priceRange', value: number[]) => {
    // Ensure we always have exactly two numbers
    const [start = 0, end = 0] = value;
    handleFilterChange({ 
      ...filters, 
      [key]: [start, end] as [number, number] 
    });
  };

  // Apply both search and filters
  const filteredStocks = stocks.filter((stock) => {
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
  });

  return (
    <div
      data-testid="dashboard-page"
      className={`h-full min-h-full w-full text-primary-900 flex-col ${
        isMobile ? 'flex' : 'hidden'
      } md:flex`}
    >
      <div
        className="flex-1 space-y-4 p-4 md:p-2 pt-6 w-full"
        data-testid="dashboard-content"
      >
        {/* Header Section */}
        <div
          className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          data-testid="dashboard-header"
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight"
            data-testid="dashboard-title"
          >
            Dashboard
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

        {/* AI-Powered Market Overview Section */}
        <AIPoweredMarketOverview filteredStocks={filteredStocks} />

        {/* Smart Filter Library Section */}
        <SmartFilterLibrary filters={filters} handleFilterChange={handleFilterChange} handleSliderChange={handleSliderChange} searchQuery={searchQuery} setSearchQuery={setSearchQuery} selectedFilters={selectedFilters} />

        {/* Main Workspace Section */}
        <MainWorkspace />

        {/* Quick Actions Toolbar */}
        <QuickActionsToolbar />

        {/* Market Sentiment & News Feed Section */}
        <MarketSentimentNewsFeed />

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
    </div>
  );
};
