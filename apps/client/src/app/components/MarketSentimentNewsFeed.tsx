import { FC } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Skeleton,
} from '@erisfy/shadcnui';
import { cn } from '@erisfy/shadcnui';

export type SentimentType = 'bullish' | 'bearish' | 'neutral';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  sentiment: SentimentType;
  relevance?: string[];
};

export type StockInfo = {
  ticker: string;
  price: number;
  dayChange: number;
  dayChangePercent: number;
  marketCap: number;
  time: string;
};

export type MarketData = {
  structuredAnalysis: {
    analysis: string;
    sectors: string[];
    marketSentiment: SentimentType;
    tickers: string[];
  };
  sentiment: SentimentType;
  stockInfoMap: Record<string, StockInfo>;
  stockInfo: StockInfo;
};

type MarketSentimentNewsFeedProps = {
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  news?: NewsItem[];
  marketData?: MarketData;
};

const getSentimentEmoji = (
  sentiment: SentimentType,
): { emoji: string; label: string } =>
  ({
    bullish: { emoji: '🟢', label: 'Bullish' },
    bearish: { emoji: '🔴', label: 'Bearish' },
    neutral: { emoji: '⚪', label: 'Neutral' },
  })[sentiment];

export const MarketSentimentNewsFeed: FC<MarketSentimentNewsFeedProps> = ({
  className,
  isLoading = false,
  error = null,
  news = [],
  marketData,
}) => {
  if (isLoading) {
    return (
      <Card className={cn('market-sentiment-feed', className)}>
        <CardHeader>
          <Skeleton className="h-8 w-64" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-48 w-full" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn('market-sentiment-feed', className)} role="alert">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-2 text-destructive">
            Error Loading News Feed
          </CardTitle>
        </CardHeader>
        <CardContent>{error.message}</CardContent>
      </Card>
    );
  }

  const sentimentEmoji = getSentimentEmoji(
    marketData?.structuredAnalysis.marketSentiment || 'neutral',
  );

  return (
    <Card
      className={cn('market-sentiment-feed', className)}
      data-testid="market-sentiment-feed"
    >
      <CardHeader>
        <CardTitle
          className="flex items-center gap-2 text-2xl font-semibold mb-2 text-primary"
          data-testid="market-sentiment-title"
        >
          <span>Market Sentiment & News Feed</span>
          <span role="img" aria-label={sentimentEmoji.label}>
            {sentimentEmoji.emoji} - {sentimentEmoji.label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <section aria-label="AI Analysis">
            <h3 className="text-xl font-semibold mb-2">AI Market Analysis</h3>
            <p className="text-sm leading-relaxed">
              {marketData?.structuredAnalysis.analysis}
            </p>
          </section>

          <section aria-label="Highlighted Sectors" className="my-4">
            <h3 className="text-lg font-semibold mb-2">Key Sectors</h3>
            <div className="flex flex-wrap gap-2">
              {marketData?.structuredAnalysis.sectors.map((sector) => (
                <span
                  key={sector}
                  className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                >
                  {sector}
                </span>
              ))}
            </div>
          </section>

          <section aria-label="Tickers Table" className="my-4">
            <h3 className="text-lg font-semibold mb-2">Tracked Tickers</h3>
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-muted text-muted-foreground">
                  <th className="px-4 py-2 text-left">Ticker</th>
                  <th className="px-4 py-2 text-left">Price</th>
                  <th className="px-4 py-2 text-left">Day Change</th>
                  <th className="px-4 py-2 text-left">Change %</th>
                  <th className="px-4 py-2 text-left">Market Cap</th>
                  <th className="px-4 py-2 text-left">Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {Object.values(marketData?.stockInfoMap || {}).map((info) => {
                  const isPositive = info.dayChange > 0;
                  return (
                    <tr key={info.ticker} className="border-b">
                      <td className="px-4 py-2 font-medium">{info.ticker}</td>
                      <td className="px-4 py-2">${info.price.toFixed(2)}</td>
                      <td
                        className={cn(
                          'px-4 py-2',
                          isPositive ? 'text-green-600' : 'text-red-600',
                        )}
                      >
                        {isPositive
                          ? `+${info.dayChange.toFixed(2)}`
                          : info.dayChange.toFixed(2)}
                      </td>
                      <td
                        className={cn(
                          'px-4 py-2',
                          isPositive ? 'text-green-600' : 'text-red-600',
                        )}
                      >
                        {isPositive
                          ? `+${info.dayChangePercent.toFixed(2)}`
                          : info.dayChangePercent.toFixed(2)}
                        %
                      </td>
                      <td className="px-4 py-2">
                        {(info.marketCap / 1_000_000_000).toFixed(2)}B
                      </td>
                      <td className="px-4 py-2">
                        {new Date(info.time).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>

          {news.length === 0 && (
            <p
              className="text-muted-foreground italic"
              data-testid="coming-soon-message"
            >
              Market Sentiment & News Feed Coming Soon
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
