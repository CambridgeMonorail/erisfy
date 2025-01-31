import { FC, useState, useEffect } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
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
  Input,
} from '@erisfy/shadcnui';

import { TrendingUp, Download, BarChart, Filter, Search, Bell, HelpCircle, AlertCircle } from 'lucide-react';
import {
  CalendarDateRangePicker,
  Overview,
  RecentSales,
  NumberAndSecondaryStat,
  MetricsPanel,
  NewsEvents,
  InteractiveChart,
  PeerComparison,
  SaveAddPortfolio,
} from '@erisfy/shadcnui-blocks';
import { salesData } from '../../data/salesData';
import { generateMockData, StockData } from '../../utils/mockData';

const DashboardPage: FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [filters, setFilters] = useState({});
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

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(filter)
        ? prevFilters.filter((f) => f !== filter)
        : [...prevFilters, filter]
    );
  };

  const filteredStocks = stocks.filter((stock) => {
    return stock.ticker.includes(searchQuery) || stock.companyName.includes(searchQuery);
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
        <Card className="bg-background text-foreground">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-2 text-primary">
              AI-Powered Market Overview
            </CardTitle>
            <CardDescription>
              Get personalized AI-driven market insights and trends.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <InteractiveChart data={filteredStocks} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Smart Filter Library Section */}
        <Card className="bg-background text-foreground">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-2 text-primary">
              Smart Filter Library
            </CardTitle>
            <CardDescription>
              Find and apply the right filters quickly with AI-driven recommendations.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Main Workspace Section */}
        <Card className="bg-background text-foreground">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-2 text-primary">
              Main Workspace
            </CardTitle>
            <CardDescription>
              Customize your workspace with dynamic filters and AI-generated insights.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>

        {/* Quick Actions Toolbar */}
        <div className="fixed right-0 top-1/4 transform -translate-y-1/2 space-y-2">
          <Button variant="default" className="w-12 h-12 flex items-center justify-center">
            <Filter />
          </Button>
          <Button variant="default" className="w-12 h-12 flex items-center justify-center">
            <Search />
          </Button>
          <Button variant="default" className="w-12 h-12 flex items-center justify-center">
            <Bell />
          </Button>
          <Button variant="default" className="w-12 h-12 flex items-center justify-center">
            <HelpCircle />
          </Button>
          <Button variant="default" className="w-12 h-12 flex items-center justify-center">
            <AlertCircle />
          </Button>
        </div>

        {/* Market Sentiment & News Feed Section */}
        <Card className="bg-background text-foreground">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold mb-2 text-primary">
              Market Sentiment & News Feed
            </CardTitle>
            <CardDescription>
              Get the latest market sentiment and news relevant to your watchlist.
            </CardDescription>
          </CardHeader>
          <CardContent>
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
                <p>Tags stories as Bullish 🟢, Bearish 🔴, or Neutral ⚪ based on AI analysis.</p>
              </div>
              <div>
                <strong>Custom Watchlist News Feed:</strong>
                <p>Users see only news related to their selected stocks & sectors.</p>
              </div>
            </div>
          </CardContent>
        </Card>

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

export { DashboardPage };
