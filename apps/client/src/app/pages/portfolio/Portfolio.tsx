import { FC, useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Badge,
  Button,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from '@erisfy/shadcnui';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ArrowUp, ArrowDown, PieChart, Calendar, Search, ArrowUpDown } from 'lucide-react';
import { NumberAndSecondaryStat } from '@erisfy/shadcnui-blocks';

/**
 * Type definition for portfolio investment item
 */
type Investment = {
  ticker: string;
  companyName: string;
  quantity: number;
  currentPrice: number;
  marketValue: number;
  dailyChange: number;
  totalReturn: number;
};

/**
 * Type definition for portfolio performance data point
 */
type PerformanceData = {
  date: string;
  portfolioValue: number;
  benchmarkValue: number;
};

/**
 * Portfolio page component that displays a user's investment portfolio with metrics and charts
 */
export const PortfolioPage: FC = () => {
  // State for investments data
  const [investments, setInvestments] = useState<Investment[]>([]);
  // State for performance chart data
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  // State for portfolio metrics
  const [portfolioMetrics, setPortfolioMetrics] = useState({
    totalValue: 0,
    overallReturn: 0,
    dailyChange: 0,
    allocation: { stocks: 75, bonds: 15, etfs: 10 }
  });
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Investment;
    direction: 'ascending' | 'descending';
  }>({
    key: 'marketValue',
    direction: 'descending'
  });

  // Load mock data on component mount
  useEffect(() => {
    // Mock investments data
    const mockInvestments: Investment[] = [
      { ticker: 'AAPL', companyName: 'Apple Inc.', quantity: 15, currentPrice: 187.32, marketValue: 2809.80, dailyChange: 1.25, totalReturn: 32.8 },
      { ticker: 'MSFT', companyName: 'Microsoft Corp.', quantity: 8, currentPrice: 337.22, marketValue: 2697.76, dailyChange: -0.54, totalReturn: 28.4 },
      { ticker: 'GOOGL', companyName: 'Alphabet Inc.', quantity: 10, currentPrice: 142.56, marketValue: 1425.60, dailyChange: 0.87, totalReturn: 15.2 },
      { ticker: 'AMZN', companyName: 'Amazon.com Inc.', quantity: 12, currentPrice: 139.20, marketValue: 1670.40, dailyChange: 2.11, totalReturn: 22.5 },
      { ticker: 'META', companyName: 'Meta Platforms Inc.', quantity: 20, currentPrice: 389.45, marketValue: 7789.00, dailyChange: -1.32, totalReturn: 42.1 },
      { ticker: 'TSLA', companyName: 'Tesla Inc.', quantity: 25, currentPrice: 248.29, marketValue: 6207.25, dailyChange: 3.45, totalReturn: -8.7 },
      { ticker: 'NVDA', companyName: 'NVIDIA Corp.', quantity: 5, currentPrice: 434.90, marketValue: 2174.50, dailyChange: 2.33, totalReturn: 125.6 },
      { ticker: 'JPM', companyName: 'JPMorgan Chase & Co.', quantity: 18, currentPrice: 144.34, marketValue: 2598.12, dailyChange: -0.21, totalReturn: 11.3 },
      { ticker: 'V', companyName: 'Visa Inc.', quantity: 10, currentPrice: 257.56, marketValue: 2575.60, dailyChange: 0.45, totalReturn: 14.8 },
      { ticker: 'JNJ', companyName: 'Johnson & Johnson', quantity: 15, currentPrice: 147.83, marketValue: 2217.45, dailyChange: -0.78, totalReturn: 5.2 }
    ];

    // Calculate total portfolio value from investments
    const totalValue = mockInvestments.reduce((sum, inv) => sum + inv.marketValue, 0);

    // Mock performance data for the chart (last 6 months)
    const mockPerformanceData: PerformanceData[] = [
      { date: '2023-07-01', portfolioValue: totalValue * 0.85, benchmarkValue: totalValue * 0.83 },
      { date: '2023-08-01', portfolioValue: totalValue * 0.88, benchmarkValue: totalValue * 0.86 },
      { date: '2023-09-01', portfolioValue: totalValue * 0.92, benchmarkValue: totalValue * 0.89 },
      { date: '2023-10-01', portfolioValue: totalValue * 0.95, benchmarkValue: totalValue * 0.94 },
      { date: '2023-11-01', portfolioValue: totalValue * 0.97, benchmarkValue: totalValue * 0.95 },
      { date: '2023-12-01', portfolioValue: totalValue * 0.99, benchmarkValue: totalValue * 0.96 },
      { date: '2024-01-01', portfolioValue: totalValue, benchmarkValue: totalValue * 0.98 }
    ];

    // Set states with mock data
    setInvestments(mockInvestments);
    setPerformanceData(mockPerformanceData);
    setPortfolioMetrics({
      totalValue,
      overallReturn: 18.7,
      dailyChange: 1.2,
      allocation: { stocks: 75, bonds: 15, etfs: 10 }
    });
  }, []);

  // Function to format currency values
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };

  // Function to format percentage values
  const formatPercent = (value: number): string => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };

  // Function to handle sorting
  const handleSort = (key: keyof Investment) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    setSortConfig({ key, direction });
  };

  // Function to get sorted data
  const getSortedInvestments = () => {
    const sortedData = [...investments];
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    return sortedData;
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Investment Portfolio</h1>

      {/* Header Section with Key Performance Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <NumberAndSecondaryStat
              mainValue={portfolioMetrics.totalValue}
              prefix="$"
              mainLabel="Total Portfolio Value"
              secondaryStats={[
                { value: portfolioMetrics.dailyChange, label: 'Today', direction: portfolioMetrics.dailyChange > 0 ? 'up' : 'down' }
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <NumberAndSecondaryStat
              mainValue={portfolioMetrics.overallReturn}
              prefix=""
              suffix="%"
              mainLabel="Overall Return"
              secondaryStats={[
                { value: portfolioMetrics.dailyChange, label: 'Daily Change', direction: portfolioMetrics.dailyChange > 0 ? 'up' : 'down' }
              ]}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <PieChart className="h-4 w-4 text-muted-foreground" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/20">Stocks {portfolioMetrics.allocation.stocks}%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-secondary/20">Bonds {portfolioMetrics.allocation.bonds}%</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-destructive/20">ETFs {portfolioMetrics.allocation.etfs}%</Badge>
                </div>
              </div>
              <div className="h-24 w-24 rounded-full border-8 border-primary/20 relative">
                <div
                  className="absolute inset-0 rounded-full border-8 border-t-secondary/20 border-r-secondary/20 border-b-destructive/20 border-l-primary/20"
                  style={{ transform: 'rotate(-45deg)' }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Performance Chart */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Performance Chart
              </span>
              <Select defaultValue="6m">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1m">1 Month</SelectItem>
                  <SelectItem value="3m">3 Months</SelectItem>
                  <SelectItem value="6m">6 Months</SelectItem>
                  <SelectItem value="1y">1 Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </CardTitle>
            <CardDescription>Portfolio Performance vs. Benchmark Index (S&P 500)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={performanceData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 25,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => {
                      return new Date(date).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
                    }}
                  />
                  <YAxis
                    tickFormatter={(value) => {
                      return new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        notation: 'compact'
                      }).format(value);
                    }}
                  />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="portfolioValue"
                    name="Portfolio"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="benchmarkValue"
                    name="S&P 500"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Investments Table */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Investments</span>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search investments..."
                    className="pl-8 w-[200px] md:w-[300px]"
                  />
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead onClick={() => handleSort('ticker')} className="cursor-pointer whitespace-nowrap">
                      <div className="flex items-center">
                        Ticker <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('companyName')} className="cursor-pointer">
                      <div className="flex items-center">
                        Company <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('quantity')} className="cursor-pointer text-right">
                      <div className="flex items-center justify-end">
                        Quantity <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('currentPrice')} className="cursor-pointer text-right">
                      <div className="flex items-center justify-end">
                        Price <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('marketValue')} className="cursor-pointer text-right">
                      <div className="flex items-center justify-end">
                        Market Value <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('dailyChange')} className="cursor-pointer text-right">
                      <div className="flex items-center justify-end">
                        Daily Change <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                    <TableHead onClick={() => handleSort('totalReturn')} className="cursor-pointer text-right">
                      <div className="flex items-center justify-end">
                        Total Return <ArrowUpDown className="ml-2 h-4 w-4" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {getSortedInvestments().map((investment) => (
                    <TableRow key={investment.ticker}>
                      <TableCell className="font-medium">{investment.ticker}</TableCell>
                      <TableCell>{investment.companyName}</TableCell>
                      <TableCell className="text-right">{investment.quantity}</TableCell>
                      <TableCell className="text-right">{formatCurrency(investment.currentPrice)}</TableCell>
                      <TableCell className="text-right">{formatCurrency(investment.marketValue)}</TableCell>
                      <TableCell className="text-right">
                        <span className={investment.dailyChange > 0 ? 'text-green-600 flex justify-end items-center' : 'text-red-600 flex justify-end items-center'}>
                          {investment.dailyChange > 0 ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                          {formatPercent(investment.dailyChange)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={investment.totalReturn > 0 ? 'text-green-600' : 'text-red-600'}>
                          {formatPercent(investment.totalReturn)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default PortfolioPage;
