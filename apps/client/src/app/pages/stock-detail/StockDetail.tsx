import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';
import { MetricsPanel } from '@erisfy/shadcnui-blocks';
import { NewsEvents } from '@erisfy/shadcnui-blocks';
import { InteractiveChart } from '@erisfy/shadcnui-blocks';
import { PeerComparison } from '@erisfy/shadcnui-blocks';
import { SaveAddPortfolio } from '@erisfy/shadcnui-blocks';

interface StockDetailProps {
  ticker: string;
  companyName: string;
  sector: string;
  industry: string;
  country: string;
  marketCap: number;
  currentPrice: number;
  priceChange: number;
  priceChangePercentage: number;
  volume: number;
  week52High: number;
  week52Low: number;
  dividendYield: number;
  peRatio: number;
  epsGrowth: number;
  roe: number;
  roa: number;
  profitabilityRatios: number[];
  news: { headline: string; date: string }[];
  events: { event: string; date: string }[];
  historicalPerformance: { date: string; price: number }[];
  peers: { ticker: string; companyName: string; metric: number }[];
}

const StockDetail: FC<StockDetailProps> = ({
  ticker,
  companyName,
  sector,
  industry,
  country,
  marketCap,
  currentPrice,
  priceChange,
  priceChangePercentage,
  volume,
  week52High,
  week52Low,
  dividendYield,
  peRatio,
  epsGrowth,
  roe,
  roa,
  profitabilityRatios,
  news,
  events,
  historicalPerformance,
  peers,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-semibold mb-2 text-primary">
          {companyName} ({ticker})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <strong>Sector:</strong> {sector}
          </div>
          <div>
            <strong>Industry:</strong> {industry}
          </div>
          <div>
            <strong>Country:</strong> {country}
          </div>
          <div>
            <strong>Market Cap:</strong> ${marketCap.toLocaleString()}
          </div>
          <div>
            <strong>Current Price:</strong> ${currentPrice.toFixed(2)}
          </div>
          <div className={priceChange > 0 ? 'text-green-500' : 'text-red-500'}>
            <strong>Price Change:</strong> {priceChange.toFixed(2)}
          </div>
          <div className={priceChangePercentage > 0 ? 'text-green-500' : 'text-red-500'}>
            <strong>Price Change Percentage:</strong> {priceChangePercentage.toFixed(2)}%
          </div>
          <div>
            <strong>Volume:</strong> {volume.toLocaleString()}
          </div>
          <div>
            <strong>52-Week High:</strong> ${week52High.toFixed(2)}
          </div>
          <div>
            <strong>52-Week Low:</strong> ${week52Low.toFixed(2)}
          </div>
          <div>
            <strong>Dividend Yield:</strong> {dividendYield.toFixed(2)}%
          </div>
          <div>
            <strong>P/E Ratio:</strong> {peRatio.toFixed(2)}
          </div>
        </div>
        <MetricsPanel
          epsGrowth={epsGrowth}
          roe={roe}
          roa={roa}
          profitabilityRatios={profitabilityRatios}
        />
        <NewsEvents news={news} events={events} />
        <InteractiveChart data={historicalPerformance} />
        <PeerComparison peers={peers} />
        <SaveAddPortfolio ticker={ticker} />
      </CardContent>
    </Card>
  );
};

const StockDetailPage: FC = () => {
  const { ticker } = useParams<{ ticker: string }>();

  // Placeholder for fetching stock data based on the ticker
  const stockData: StockDetailProps = {
    ticker: 'AAPL',
    companyName: 'Apple Inc.',
    sector: 'Technology',
    industry: 'Consumer Electronics',
    country: 'USA',
    marketCap: 2500000000000,
    currentPrice: 150,
    priceChange: 2,
    priceChangePercentage: 1.35,
    volume: 100000000,
    week52High: 180,
    week52Low: 120,
    dividendYield: 0.65,
    peRatio: 30,
    epsGrowth: 10,
    roe: 20,
    roa: 15,
    profitabilityRatios: [25, 30, 35],
    news: [
      { headline: 'Apple releases new iPhone', date: '2024-01-01' },
      { headline: 'Apple reports record earnings', date: '2024-02-01' },
    ],
    events: [
      { event: 'Earnings Report', date: '2024-03-01' },
      { event: 'Product Launch', date: '2024-04-01' },
    ],
    historicalPerformance: [
      { date: '2024-01-01', price: 140 },
      { date: '2024-02-01', price: 145 },
      { date: '2024-03-01', price: 150 },
    ],
    peers: [
      { ticker: 'MSFT', companyName: 'Microsoft', metric: 200 },
      { ticker: 'GOOGL', companyName: 'Alphabet', metric: 180 },
    ],
  };

  return <StockDetail {...stockData} />;
};

export { StockDetailPage };
