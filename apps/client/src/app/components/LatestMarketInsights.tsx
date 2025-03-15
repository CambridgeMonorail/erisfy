import { type FC, useEffect } from 'react';
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

export interface LatestMarketInsightsProps {
  className?: string;
  data?: MarketDataInsights;
  isLoading: boolean;
  error?: Error | null;
}

export const LatestMarketInsights: FC<LatestMarketInsightsProps> = ({
  className = '',
  data,
  isLoading,
  error,
}) => {
  // Add detailed debugging for props and rendering conditions
  useEffect(() => {
    console.log('[LatestMarketInsights] Component props:', {
      data,
      hasData: !!data,
      storiesCount: data?.stories?.length || 0,
      isLoading,
      hasError: !!error,
    });
    
    if (data) {
      console.log('[LatestMarketInsights] Data structure:', {
        id: data.id,
        date: data.date,
        storiesArray: Array.isArray(data.stories),
        stories: data.stories,
      });
    }
    
    // Log which rendering condition will be triggered
    if (isLoading) {
      console.log('[LatestMarketInsights] Will render loading state');
    } else if (error) {
      console.log('[LatestMarketInsights] Will render error state:', error.message);
    } else if (!data?.stories || data.stories.length === 0) {
      console.log('[LatestMarketInsights] Will render empty state - no stories available');
      console.log('[LatestMarketInsights] Condition details:', {
        dataExists: !!data,
        storiesExists: !!data?.stories,
        storiesLength: data?.stories?.length || 0
      });
    } else {
      console.log('[LatestMarketInsights] Will render news carousel with', data.stories.length, 'stories');
    }
  }, [data, isLoading, error]);

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

  if (!data?.stories || data.stories.length === 0) {
    console.log('[LatestMarketInsights] Rendering empty state because:', {
      dataExists: !!data,
      storiesExists: !!data?.stories,
      storiesIsArray: Array.isArray(data?.stories),
      storiesLength: data?.stories?.length || 0
    });
    
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

  console.log('[LatestMarketInsights] Rendering news carousel with stories:', data.stories);

  return (
    <Card className={cn('bg-card border shadow-md', className)}>
      <CardHeader className="border-b bg-muted/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Market News</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">
            {new Date(data.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <NewsCarousel stories={data.stories} />
      </CardContent>
    </Card>
  );
};
