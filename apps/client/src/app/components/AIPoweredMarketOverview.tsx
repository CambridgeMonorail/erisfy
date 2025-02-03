import { FC, useState, useEffect } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
} from '@erisfy/shadcnui';
import { StockData } from '../../utils/mockData';
import { InteractiveChart } from '@erisfy/shadcnui-blocks';
import { faker } from '@faker-js/faker';
import { TrendingUp, ArrowDown } from 'lucide-react';

interface ChartDataPoint {
  date: string;
  value: number;
}

interface AIPoweredMarketOverviewProps {
  filteredStocks: StockData[];
  isLoading?: boolean;
}

const generateMockInsights = () => {
  const insights = [];
  for (let i = 0; i < 5; i++) {
    insights.push({
      category: faker.helpers.arrayElement(['Market Trend', 'Sector Movement']),
      text: faker.lorem.sentence(),
      trend: faker.helpers.arrayElement(['positive', 'negative']),
    });
  }
  return insights;
};

const AIPoweredMarketOverview: FC<AIPoweredMarketOverviewProps> = ({ 
  filteredStocks,
  isLoading = false 
}): JSX.Element => {
  const [insights, setInsights] = useState(generateMockInsights());

  useEffect(() => {
    setInsights(generateMockInsights());
  }, [filteredStocks]);

  const chartData: ChartDataPoint[] = filteredStocks.map((stock) => ({
    date: stock.ticker,
    value: stock.marketCap ?? 0,
  }));

  if (isLoading) {
    return (
      <div role="status" aria-busy="true">
        <div className="h-4 w-full bg-muted animate-pulse"></div>
        <div className="h-4 w-full bg-muted animate-pulse"></div>
        <div className="h-4 w-full bg-muted animate-pulse"></div>
      </div>
    );
  }

  if (filteredStocks.length === 0) {
    return <div>Market Insights Loading...</div>;
  }

  return (
    <Card className="p-6 rounded-xl shadow-md">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Badge variant="outline">{insight.category}</Badge>
                {insight.trend === 'positive' ? (
                  <TrendingUp className="text-success" />
                ) : (
                  <ArrowDown className="text-destructive" />
                )}
                <p className="text-lg font-semibold">{insight.text}</p>
              </div>
            ))}
          </div>
          <div>
            <strong>Quick Chart Toggle:</strong>
            <InteractiveChart data={chartData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { AIPoweredMarketOverview };
