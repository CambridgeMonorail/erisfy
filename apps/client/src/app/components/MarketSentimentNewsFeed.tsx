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

export const MarketSentimentNewsFeed: FC<MarketSentimentNewsFeedProps> = ({
  className,
  isLoading = false,
  error = null,
  news = [],
  marketData,
}) => {
  console.log('[MarketSentimentNewsFeed] Rendering with props:', {
    isLoading,
    hasError: !!error,
    hasNews: news.length > 0,
    marketData: marketData ? {
      hasStructuredAnalysis: !!marketData.structuredAnalysis,
      sentiment: marketData.structuredAnalysis?.marketSentiment,
      analysis: marketData.structuredAnalysis?.analysis?.substring(0, 50) + '...',
      sectors: marketData.structuredAnalysis?.sectors?.length
    } : 'undefined'
  });

  const getSentimentEmoji = (
    sentiment: SentimentType | undefined
  ): { emoji: string; label: string } => {
    console.log('[MarketSentimentNewsFeed] Getting emoji for sentiment:', sentiment);

    const sentimentMap = {
      bullish: { emoji: '🟢', label: 'Bullish' },
      bearish: { emoji: '🔴', label: 'Bearish' },
      neutral: { emoji: '⚪', label: 'Neutral' },
    };

    const result = sentiment && sentiment in sentimentMap
      ? sentimentMap[sentiment]
      : sentimentMap.neutral;

    console.log('[MarketSentimentNewsFeed] Sentiment emoji result:', result);
    return result;
  };

  if (isLoading) {
    console.log('[MarketSentimentNewsFeed] Rendering loading state');
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
    console.log('[MarketSentimentNewsFeed] Rendering error state:', error);
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

  // If no market data is available, show a placeholder
  if (!marketData) {
    console.log('[MarketSentimentNewsFeed] Rendering no market data state');
    return (
      <Card className={cn('market-sentiment-feed', className)}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-2">
            Market Sentiment & News Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No market data available</p>
        </CardContent>
      </Card>
    );
  }

  console.log('[MarketSentimentNewsFeed] Market data analysis:', {
    structuredAnalysis: marketData.structuredAnalysis,
    marketSentiment: marketData.structuredAnalysis?.marketSentiment
  });

  const sentimentEmoji = getSentimentEmoji(
    marketData.structuredAnalysis?.marketSentiment
  );

  console.log('[MarketSentimentNewsFeed] Calculated sentiment emoji:', sentimentEmoji);

  // Extra safety check - if somehow we still don't have a valid sentiment emoji
  if (!sentimentEmoji || typeof sentimentEmoji.label === 'undefined') {
    console.error('[MarketSentimentNewsFeed] Invalid sentiment emoji:', sentimentEmoji);
    return (
      <Card className={cn('market-sentiment-feed', className)}>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-2">
            Market Sentiment & News Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Invalid market sentiment data</p>
        </CardContent>
      </Card>
    );
  }

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
            {sentimentEmoji.emoji} {sentimentEmoji.label}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <section aria-label="AI Analysis">
            <h3 className="text-xl font-semibold mb-2">AI Market Analysis</h3>
            <p className="text-sm leading-relaxed">
              {marketData.structuredAnalysis.analysis || 'No analysis available'}
            </p>
          </section>

          {marketData.structuredAnalysis.sectors.length > 0 && (
            <section aria-label="Highlighted Sectors" className="my-4">
              <h3 className="text-lg font-semibold mb-2">Key Sectors</h3>
              <div className="flex flex-wrap gap-2">
                {marketData.structuredAnalysis.sectors.map((sector) => (
                  <span
                    key={sector}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </section>
          )}

          {Object.keys(marketData.stockInfoMap || {}).length > 0 && (
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
                  {Object.values(marketData.stockInfoMap).map((info) => {
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
          )}

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
