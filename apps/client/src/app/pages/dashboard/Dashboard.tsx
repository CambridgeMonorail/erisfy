import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import { Download, Filter, Search, Bell, HelpCircle, AlertCircle } from 'lucide-react';
import { Button, Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem, Slider, TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from '@erisfy/shadcnui';
import { CalendarDateRangePicker, InteractiveChart } from '@erisfy/shadcnui-blocks';
import { generateMockData, StockData } from '../../utils/mockData';
import { DashboardCard } from '../../components/dashboard/DashboardCard';
import type { FilterState } from '../../types/dashboard';

/**
 * Renders the main dashboard page, including AI-powered insights, filter tools,
 * workspace options, and a market sentiment/news feed.
 */
export const DashboardPage: FC = () => {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filters, setFilters] = useState<FilterState>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = generateMockData(100);
        setStocks(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch data'));
      } finally {
        setIsLoading(false);
      }
    };
    
    void fetchData();
  }, []);

  const handleFilterSelection = useCallback((filter: string) => {
    setSelectedFilters(prev => [...new Set([...prev, filter])]);
  }, []);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        handleFilterSelection(`${key}: ${value}`);
      }
    });
  }, [handleFilterSelection]);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const filteredStocks = useMemo(() => 
    stocks.filter((stock) => 
      stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) || 
      stock.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [stocks, searchQuery]
  );

  const chartData = useMemo(
    () => filteredStocks.map((stock) => ({
      date: stock.ticker,
      value: stock.marketCap ?? 0
    })),
    [filteredStocks]
  );

  if (error) {
    return (
      <div role="alert" className="p-4 text-red-600">
        <h2>Error loading dashboard</h2>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div role="status" className="p-4">Loading dashboard...</div>;
  }

  return (
    <div
      data-testid="dashboard-page"
      className="h-full min-h-full w-full text-primary-900 flex-col md:flex"
    >
      <div className="flex-1 space-y-4 p-4 md:p-2 pt-6 w-full">
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
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Search stocks..."
              className="px-4 py-2 border rounded-md"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
              aria-label="Search stocks"
            />
            <CalendarDateRangePicker data-testid="date-range-picker" />
            <Button variant="default">
              <span className="hidden sm:inline">Download</span>
              <Download className="sm:hidden" aria-hidden="true" />
            </Button>
          </div>
        </div>

        {/* AI-Powered Market Overview Section */}
        <DashboardCard
          title="AI-Powered Market Overview"
          description="Get personalized AI-driven market insights and trends."
        >
          <div className="space-y-4">
            <div>
              <strong>Personalized AI Summary:</strong>
              <p>Tech stocks rebounded today as interest rate fears eased.</p>
            </div>
            <div>
              <strong>Trending Stocks & Sectors:</strong>
              <ul className="list-disc list-inside">
                <li>Top 3 Market Movers: AAPL, MSFT, GOOGL</li>
                <li>Sector Performance Heatmap: Technology, Finance, Healthcare</li>
              </ul>
            </div>
            <div>
              <strong>Quick Chart Toggle:</strong>
              <InteractiveChart data={chartData} />
            </div>
          </div>
        </DashboardCard>

        {/* Smart Filter Library Section */}
        <DashboardCard
          title="Smart Filter Library"
          description="Find and apply the right filters quickly with AI-driven recommendations."
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Sector</label>
              <Select onValueChange={(value) => {
                handleFilterChange({ ...filters, sector: value });
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Sectors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-sectors">All Sectors</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                    <SelectItem value="Healthcare">Healthcare</SelectItem>
                    <SelectItem value="Energy">Energy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Industry</label>
              <Select onValueChange={(value) => {
                handleFilterChange({ ...filters, industry: value });
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Industries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-industries">All Industries</SelectItem>
                    <SelectItem value="Software">Software</SelectItem>
                    <SelectItem value="Banking">Banking</SelectItem>
                    <SelectItem value="Pharmaceuticals">Pharmaceuticals</SelectItem>
                    <SelectItem value="Oil & Gas">Oil & Gas</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Country</label>
              <Select onValueChange={(value) => {
                handleFilterChange({ ...filters, country: value });
              }}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="All Countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all-countries">All Countries</SelectItem>
                    <SelectItem value="USA">USA</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="UK">UK</SelectItem>
                    <SelectItem value="Germany">Germany</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label>Market Cap</label>
              <Slider
                value={[0, 1000000]}
                onValueChange={(value) => {
                  handleFilterChange({ ...filters, marketCap: value });
                }}
                min={0}
                max={1000000}
                step={10000}
              />
            </div>
            <div>
              <label>Price Range</label>
              <Slider
                value={[0, 1000]}
                onValueChange={(value) => {
                  handleFilterChange({ ...filters, priceRange: value });
                }}
                min={0}
                max={1000}
                step={10}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold mb-2">Selected Filters</h3>
              <TooltipProvider>
                <ul className="list-disc list-inside">
                  {selectedFilters.map((filter) => (
                    <li key={filter}>
                      <Tooltip>
                        <TooltipTrigger>{filter}</TooltipTrigger>
                        <TooltipContent>
                          <p>Definition and example of {filter}</p>
                        </TooltipContent>
                      </Tooltip>
                    </li>
                  ))}
                </ul>
              </TooltipProvider>
            </div>
          </div>
        </DashboardCard>

        {/* Main Workspace Section */}
        <DashboardCard
          title="Main Workspace"
          description="Customize your workspace with dynamic filters and AI-generated insights."
        >
          <div className="space-y-4">
            <div>
              <strong>Dynamic "Get Started" Section:</strong>
              <p>Suggested pre-built filters and a short walkthrough of key features.</p>
            </div>
            <div>
              <strong>Multiple View Modes:</strong>
              <ul className="list-disc list-inside">
                <li>Simple List View</li>
                <li>Tile-Based Grid View</li>
                <li>Interactive Heatmap View</li>
              </ul>
            </div>
            <div>
              <strong>AI-Generated Stock Insights:</strong>
              <p>Clicking a stock shows a quick AI summary of why it’s moving.</p>
            </div>
          </div>
        </DashboardCard>

        {/* Quick Actions Toolbar - now with aria labels */}
        <div 
          className="fixed right-0 top-1/4 transform -translate-y-1/2 space-y-2"
          role="toolbar"
          aria-label="Quick actions"
        >
          <Button
            variant="default"
            className="w-12 h-12 flex items-center justify-center"
            aria-label="Filter"
          >
            <Filter aria-hidden="true" />
          </Button>
          <Button
            variant="default"
            className="w-12 h-12 flex items-center justify-center"
            aria-label="Search"
          >
            <Search aria-hidden="true" />
          </Button>
          <Button
            variant="default"
            className="w-12 h-12 flex items-center justify-center"
            aria-label="Notifications"
          >
            <Bell aria-hidden="true" />
          </Button>
          <Button
            variant="default"
            className="w-12 h-12 flex items-center justify-center"
            aria-label="Help"
          >
            <HelpCircle aria-hidden="true" />
          </Button>
          <Button
            variant="default"
            className="w-12 h-12 flex items-center justify-center"
            aria-label="Alerts"
          >
            <AlertCircle aria-hidden="true" />
          </Button>
        </div>

        {/* Market Sentiment & News Feed Section */}
        <DashboardCard
          title="Market Sentiment & News Feed"
          description="Get the latest market sentiment and news relevant to your watchlist."
        >
          <div className="space-y-4">
            <div>
              <strong>Smart AI-Summarized News:</strong>
              <ul className="list-disc list-inside">
                <li>Top 3-5 stories that impact the market today.</li>
                <li>Each story summarized in 1-2 sentences.</li>
                <li>Highlight relevance to user watchlist.</li>
              </ul>
            </div>
            <div>
              <strong>Sentiment-Based Categorization:</strong>
              <p>
                Tags stories as{' '}
                <span role="img" aria-label="Bullish">🟢</span> Bullish,{' '}
                <span role="img" aria-label="Bearish">🔴</span> Bearish, or{' '}
                <span role="img" aria-label="Neutral">⚪</span> Neutral based on AI analysis.
              </p>
            </div>
            <div>
              <strong>Custom Watchlist News Feed:</strong>
              <p>Users see only news related to their selected stocks & sectors.</p>
            </div>
          </div>
        </DashboardCard>

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
