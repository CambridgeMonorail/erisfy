import { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Skeleton } from '@erisfy/shadcnui';
import { cn } from '@erisfy/shadcnui';

type SentimentType = 'bullish' | 'bearish' | 'neutral';

type NewsItem = {
  id: string;
  title: string;
  summary: string;
  sentiment: SentimentType;
  relevance?: string[];
};

type MarketSentimentNewsFeedProps = {
  className?: string;
  isLoading?: boolean;
  error?: Error | null;
  news?: NewsItem[];
};

const getSentimentEmoji = (sentiment: SentimentType): { emoji: string; label: string } => ({
  bullish: { emoji: '🟢', label: 'Bullish' },
  bearish: { emoji: '🔴', label: 'Bearish' },
  neutral: { emoji: '⚪', label: 'Neutral' }
}[sentiment]);

export const MarketSentimentNewsFeed: FC<MarketSentimentNewsFeedProps> = ({ 
  className,
  isLoading = false,
  error = null,
  news = [] 
}) => {
  if (isLoading) {
    return (
      <Card className={cn("market-sentiment-feed", className)}>
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
      <Card className={cn("market-sentiment-feed", className)} role="alert">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold mb-2 text-destructive">
            Error Loading News Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card 
      className={cn("market-sentiment-feed", className)}
      data-testid="market-sentiment-feed"
    >
      <CardHeader>
        <CardTitle 
          className="text-2xl font-semibold mb-2 text-primary"
          data-testid="market-sentiment-title"
        >
          Market Sentiment & News Feed
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <section 
            aria-label="AI-Summarized News"
            data-testid="ai-summarized-news"
          >
            <h3 className="font-semibold mb-2">Smart AI-Summarized News:</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Top 3-5 stories that impact the market today</li>
              <li>Each story summarized in 1-2 sentences</li>
              <li>Highlight relevance to user watchlist</li>
            </ul>
          </section>

          <section 
            aria-label="Sentiment Categories"
            data-testid="sentiment-categories"
          >
            <h3 className="font-semibold mb-2">Sentiment-Based Categorization:</h3>
            <p className="flex items-center gap-2">
              Tags stories as{' '}
              {['bullish', 'bearish', 'neutral'].map((sentiment) => {
                const { emoji, label } = getSentimentEmoji(sentiment as SentimentType);
                return (
                  <span 
                    key={sentiment}
                    className="inline-flex items-center gap-1"
                    role="img" 
                    aria-label={label}
                  >
                    {emoji} {label}
                  </span>
                );
              })}
              {' '}based on AI analysis.
            </p>
          </section>

          <section 
            aria-label="Watchlist Feed"
            data-testid="watchlist-feed"
          >
            <h3 className="font-semibold mb-2">Custom Watchlist News Feed:</h3>
            <p>Users see only news related to their selected stocks & sectors.</p>
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
