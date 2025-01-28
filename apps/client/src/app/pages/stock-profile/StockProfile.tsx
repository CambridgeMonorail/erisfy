import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@erisfy/shadcnui';

interface StockProfileProps {
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
}

const StockProfile: FC<StockProfileProps> = ({
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
      </CardContent>
    </Card>
  );
};

const StockProfilePage: FC = () => {
  const { ticker } = useParams<{ ticker: string }>();

  // Placeholder for fetching stock data based on the ticker
  const stockData: StockProfileProps = {
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
  };

  return <StockProfile {...stockData} />;
};

export { StockProfilePage };
