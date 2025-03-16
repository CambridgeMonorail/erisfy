import { FC, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Skeleton,
} from '@erisfy/shadcnui';
import { cn } from '@erisfy/shadcnui';
import { SentimentType, StockInfo } from '@erisfy/api';
import type { NewsItem } from '@erisfy/api';

/**
 * Market data structure for analysis and visualization
 */
export type MarketData = {
  /** Structured analysis from AI processing */
  structuredAnalysis: {
    /** Detailed market analysis text */
    analysis: string;
    /** List of relevant market sectors */
    sectors: string[];
    /** Overall market sentiment classification */
    marketSentiment: SentimentType;
    /** List of relevant ticker symbols */
    tickers: string[];
  };
  /** Overall market sentiment */
  sentiment: SentimentType;
  /** Map of stock information keyed by ticker symbol */
  stockInfoMap: Record<string, StockInfo>;
  /** Primary stock information focus */
  stockInfo: StockInfo;
};

/**
 * Props for the MarketSentimentNewsFeed component
 */
export interface MarketSentimentNewsFeedProps {
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Whether data is currently being loaded */
  isLoading?: boolean;
  /** Error that occurred during data fetching, if any */
  error?: Error | null;
  /** List of news items to display */
  news?: NewsItem[];
  /** Market data for analysis display */
  marketData?: MarketData;
}

/**
 * Format a price value to a standard currency string
 */
const formatCurrency = (value: number): string => {
  return `$${value.toFixed(2)}`;
};

/**
 * Format a percentage value with + or - sign
 */
const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
};

/**
 * Format market cap to billions
 */
const formatMarketCap = (value: number): string => {
  return `${(value / 1_000_000_000).toFixed(2)}B`;
};

/**
 * Format a date to a localized string
 */
const formatDate = (dateString: string | number): string => {
  try {
    return new Date(dateString).toLocaleString();
  } catch {
    return 'Invalid date';
  }
};

/**
 * Get ISO format of a date for the datetime attribute
 */
const getISODate = (dateString: string | number): string => {
  try {
    return new Date(dateString).toISOString();
  } catch {
    return '';
  }
};

/**
 * Displays market sentiment analysis, sector highlights, and stock information
 * 
 * Renders different UI states based on loading, error, and data availability.
 */
export const MarketSentimentNewsFeed: FC<MarketSentimentNewsFeedProps> = ({
  className,
  isLoading = false,
  error = null,
  news = [],
  marketData,
}) => {
  /**
   * Maps sentiment values to visual indicators with emoji and text label
   */
  const getSentimentEmoji = (
    sentiment: SentimentType | undefined
  ): { emoji: string; label: string } => {
    const sentimentMap: Record<SentimentType, { emoji: string; label: string }> = {
      bullish: { emoji: '🟢', label: 'Bullish' },
      bearish: { emoji: '🔴', label: 'Bearish' },
      neutral: { emoji: '⚪', label: 'Neutral' },
    };

    return sentiment && sentiment in sentimentMap
      ? sentimentMap[sentiment]
      : sentimentMap.neutral;
  };

  // Memoize sentiment emoji calculation
  const sentimentEmoji = useMemo(
    () => getSentimentEmoji(marketData?.structuredAnalysis?.marketSentiment),
    [marketData?.structuredAnalysis?.marketSentiment]
  );

  // Memoize stock data for table rendering
  const stockData = useMemo(() => {
    if (!marketData?.stockInfoMap) return [];
    return Object.values(marketData.stockInfoMap).map((info) => ({
      ...info,
      isPositive: info.dayChange > 0,
      formattedPrice: formatCurrency(info.price),
      formattedDayChange: `${info.dayChange > 0 ? '+' : ''}${info.dayChange.toFixed(2)}`,
      formattedPercentChange: formatPercentage(info.dayChangePercent),
      formattedMarketCap: formatMarketCap(info.marketCap),
      formattedTime: formatDate(info.time),
      isoTime: getISODate(info.time)
    }));
  }, [marketData?.stockInfoMap]);

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
      <Card className={cn('market-sentiment-feed', className)} role="alert" aria-live="assertive">
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
    return (
      <Card className={cn('market-sentiment-feed', className)} aria-live="polite">
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

  // Extra safety check - if somehow we still don't have a valid sentiment emoji
  if (!sentimentEmoji || typeof sentimentEmoji.label === 'undefined') {
    return (
      <Card className={cn('market-sentiment-feed', className)} aria-live="polite">
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
              <h3 className="text-lg font-semibold mb-2" id="sectors-heading">Key Sectors</h3>
              <div 
                className="flex flex-wrap gap-2" 
                role="list"
                aria-labelledby="sectors-heading"
              >
                {marketData.structuredAnalysis.sectors.map((sector) => (
                  <span
                    key={sector}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm"
                    role="listitem"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </section>
          )}

          {stockData.length > 0 && (
            <section aria-label="Tickers Table" className="my-4">
              <h3 className="text-lg font-semibold mb-2" id="tickers-table-heading">Tracked Tickers</h3>
              <table 
                className="w-full table-auto border-collapse" 
                aria-labelledby="tickers-table-heading"
              >
                <thead>
                  <tr className="bg-muted text-muted-foreground">
                    <th scope="col" className="px-4 py-2 text-left">Ticker</th>
                    <th scope="col" className="px-4 py-2 text-left">Price</th>
                    <th scope="col" className="px-4 py-2 text-left">Day Change</th>
                    <th scope="col" className="px-4 py-2 text-left">Change %</th>
                    <th scope="col" className="px-4 py-2 text-left">Market Cap</th>
                    <th scope="col" className="px-4 py-2 text-left">Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {stockData.map((info) => (
                    <tr key={info.ticker} className="border-b">
                      <td className="px-4 py-2 font-medium">{info.ticker}</td>
                      <td className="px-4 py-2">{info.formattedPrice}</td>
                      <td
                        className={cn(
                          'px-4 py-2',
                          info.isPositive ? 'text-green-600' : 'text-red-600',
                        )}
                      >
                        {info.formattedDayChange}
                      </td>
                      <td
                        className={cn(
                          'px-4 py-2',
                          info.isPositive ? 'text-green-600' : 'text-red-600',
                        )}
                      >
                        {info.formattedPercentChange}
                      </td>
                      <td className="px-4 py-2">
                        {info.formattedMarketCap}
                      </td>
                      <td className="px-4 py-2">
                        <time dateTime={info.isoTime}>
                          {info.formattedTime}
                        </time>
                      </td>
                    </tr>
                  ))}
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
