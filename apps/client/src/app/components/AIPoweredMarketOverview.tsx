import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@erisfy/shadcnui';
import { InteractiveChart, Spinner } from '@erisfy/shadcnui-blocks';
import { TrendingUp, ArrowDown } from 'lucide-react';
import { MarketInsight, useMarketInsights } from '../hooks/useMarketInsights';

import { ErrorBoundary } from '@erisfy/shadcnui-blocks';
import { StockData } from '../utils/mockData';


export interface AIPoweredMarketOverviewProps {
  filteredStocks: StockData[];
  isLoading?: boolean;
}

const InsightItem: FC<MarketInsight> = ({ category, trend, text }) => (
  <div className="flex items-center space-x-2">
    <Badge variant="outline">{category}</Badge>
    {trend === 'positive' ? (
      <TrendingUp
        className="text-success h-4 w-4"
        aria-label="Positive trend"
      />
    ) : (
      <ArrowDown
        className="text-destructive h-4 w-4"
        aria-label="Negative trend"
      />
    )}
    <p className="text-lg font-semibold">{text}</p>
  </div>
);

export const AIPoweredMarketOverview: FC<AIPoweredMarketOverviewProps> = ({
  filteredStocks,
  isLoading = false,
}) => {
  const { insights = [], error } = useMarketInsights(filteredStocks);

  if (isLoading) {
    return <Spinner aria-label="Loading market insights" />;
  }

  if (error) {
    return (
      <div role="alert" className="text-destructive">
        Error loading market insights
      </div>
    );
  }

  if (filteredStocks.length === 0) {
    return <div role="status">No market data available</div>;
  }

  const chartData = filteredStocks.map((stock) => ({
    date: stock.ticker,
    value: stock.marketCap ?? 0,
  }));

  return (
    <ErrorBoundary
      fallback={(error, reset) => (
        <div role="alert" className="p-4 border border-destructive rounded-md">
          <h2 className="text-lg font-semibold text-destructive">Error in market overview</h2>
          <p className="text-sm text-muted-foreground">{error.message}</p>
          <button
            onClick={reset}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md"
          >
            Try again
          </button>
        </div>
      )}
    >
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
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
              role="list"
              aria-label="Market insights"
            >
              {Array.isArray(insights) && insights.map((insight, index) => (
                <InsightItem 
                  key={index}
                  category={insight.category}
                  trend={insight.trend}
                  text={insight.text}
                />
              ))}
            </div>
            <section aria-label="Market chart">
              <strong>Quick Chart Toggle:</strong>
              <InteractiveChart data={chartData} />
            </section>
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};
