import { type FC, useMemo } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  cn,
} from '@erisfy/shadcnui';
import { Spinner, NewsCarousel } from '@erisfy/shadcnui-blocks';
import { AlertCircle } from 'lucide-react';
import type { MarketDataInsights } from '@erisfy/api';

/**
 * Props for the LatestMarketInsights component
 */
export interface LatestMarketInsightsProps {
  /** Optional CSS class name to apply additional styling */
  className?: string;
  /** Market data and news stories to display */
  data?: MarketDataInsights;
  /** Whether the data is currently loading */
  isLoading: boolean;
  /** Error that occurred during data fetching, if any */
  error?: Error | null;
}

/**
 * Displays the latest market insights and news stories
 * 
 * Shows appropriate loading, error, and empty states based on the provided props.
 */
export const LatestMarketInsights: FC<LatestMarketInsightsProps> = ({
  className = '',
  data,
  isLoading,
  error,
}) => {
  // Format the date once when data changes
  const formattedDate = useMemo(() => {
    if (!data?.date) return '';
    
    try {
      return new Date(data.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return 'Invalid date';
    }
  }, [data?.date]);

  // Loading state
  if (isLoading) {
    return (
      <div 
        className="flex justify-center items-center h-64 bg-background/50 rounded-lg"
        role="status"
      >
        <Spinner size="lg" aria-label="Loading market news" />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <Card 
        className={cn('border-destructive bg-destructive/5', className)}
        role="alert"
        aria-live="assertive"
      >
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" aria-hidden="true" />
            <CardTitle className="text-destructive">
              Error Loading Market News
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive/80">{error.message}</p>
        </CardContent>
      </Card>
    );
  }

  // Empty state
  if (!data?.stories || data.stories.length === 0) {
    return (
      <Card 
        className={cn('border-muted bg-muted/5', className)}
        aria-live="polite"
      >
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No market news available
          </p>
        </CardContent>
      </Card>
    );
  }

  // Content state with stories
  return (
    <Card className={cn('bg-card border shadow-md', className)}>
      <CardHeader className="border-b bg-muted/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Market News</CardTitle>
          <time 
            dateTime={data.date instanceof Date ? data.date.toISOString() : data.date}
            className="text-sm text-muted-foreground font-medium"
          >
            {formattedDate}
          </time>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <NewsCarousel stories={data.stories} />
      </CardContent>
    </Card>
  );
};
