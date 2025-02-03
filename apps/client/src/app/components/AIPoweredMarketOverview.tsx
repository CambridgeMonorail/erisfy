import { FC } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@erisfy/shadcnui';
import { StockData } from '../../utils/mockData';
import { InteractiveChart } from '@erisfy/shadcnui-blocks';

interface ChartDataPoint {
  date: string;
  value: number;
}

interface AIPoweredMarketOverviewProps {
  filteredStocks: StockData[];
  isLoading?: boolean;
}

const AIPoweredMarketOverview: FC<AIPoweredMarketOverviewProps> = ({ 
  filteredStocks,
  isLoading = false 
}): JSX.Element => {
  const chartData: ChartDataPoint[] = filteredStocks.map((stock) => ({
    date: stock.ticker,
    value: stock.marketCap ?? 0,
  }));

  if (isLoading) {
    return <div role="status" aria-busy="true">Loading market overview...</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          AI-Powered Market Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <section aria-label="Market Summary">
            <h3 className="text-lg font-semibold">Personalized AI Summary</h3>
            <p>Tech stocks rebounded today as interest rate fears eased.</p>
          </section>
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
          <div>
            <strong>Market Overview Coming Soon</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { AIPoweredMarketOverview };
