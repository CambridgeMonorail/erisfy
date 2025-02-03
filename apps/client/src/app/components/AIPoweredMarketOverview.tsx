import { FC } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@erisfy/shadcnui';
import { StockData } from '../../utils/mockData';
import { InteractiveChart } from '@erisfy/shadcnui-blocks';

interface AIPoweredMarketOverviewProps {
  filteredStocks: StockData[];
}

const AIPoweredMarketOverview: FC<AIPoweredMarketOverviewProps> = ({ filteredStocks }) => {
  const chartData = filteredStocks.map((stock) => ({
    date: stock.ticker,
    value: stock.marketCap ?? 0,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-semibold mb-2 text-primary">
          AI-Powered Market Overview
        </CardTitle>
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
