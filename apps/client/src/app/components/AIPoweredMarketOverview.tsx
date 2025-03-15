import { type ReactNode } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  cn,
  Button,
} from '@erisfy/shadcnui';
import { Spinner, NewsCarousel } from '@erisfy/shadcnui-blocks';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useMarketNews } from '../hooks/useMarketNews';
import { type StockData } from '../utils/mockData'; // TODO: Move this type to shared-types library

export interface LatestMarketInsightsProps {
  className?: string;
  newsBasedInsights: StockData[];
  isLoading: boolean;
  onNewsUpdate?: () => void;
}

export const LatestMarketInsights = ({
  className = '',
  newsBasedInsights = [],
  isLoading: insightsLoading,
  onNewsUpdate,
}: LatestMarketInsightsProps): ReactNode => {
  const {
    news,
    isLoading: newsLoading,
    error,
    isUpdating,
    triggerUpdate
  } = useMarketNews();

  const isLoading = insightsLoading || newsLoading;

  const handleUpdate = () => {
    triggerUpdate();
    onNewsUpdate?.();
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-background/50 rounded-lg">
        <Spinner size="lg" aria-label="Loading market news" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={cn('border-destructive bg-destructive/5', className)}>
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

  if (!news || news.length === 0) {
    return (
      <Card className={cn('border-muted bg-muted/5', className)}>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No market news available
          </p>
        </CardContent>
      </Card>
    );
  }

  // Since Story type doesn't have a date field, use current date for display
  const latestNewsDate = new Date();

  return (
    <Card className={cn('bg-card border shadow-md', className)}>
      <CardHeader className="border-b bg-muted/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl font-semibold">Market News</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={handleUpdate}
              disabled={isUpdating}
              className="gap-2"
            >
              <RefreshCw
                className={cn('h-4 w-4', isUpdating && 'animate-spin')}
                aria-hidden="true"
              />
              <span>{isUpdating ? 'Updating...' : 'Update News'}</span>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {latestNewsDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <NewsCarousel stories={news} />
      </CardContent>
    </Card>
  );
};
