import { FC } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  cn,
  Button
} from '@erisfy/shadcnui';
import { Spinner, NewsCarousel } from '@erisfy/shadcnui-blocks';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { useMarketNews } from '../hooks/useMarketNews';

export interface AIPoweredMarketOverviewProps {
  className?: string;
}

export const AIPoweredMarketOverview: FC<AIPoweredMarketOverviewProps> = ({ 
  className
}) => {
  const { news, isLoading, error, isUpdating, triggerUpdate } = useMarketNews();
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-background/50 rounded-lg">
        <Spinner size="lg" aria-label="Loading market news" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={cn("border-destructive bg-destructive/5", className)}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Error Loading Market News</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive/80">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!news || !news.stories) {
    return (
      <Card className={cn("border-muted bg-muted/5", className)}>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No market news available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-card border shadow-md", className)}>
      <CardHeader className="border-b bg-muted/5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-xl font-semibold">Market News</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={triggerUpdate}
              disabled={isUpdating}
              className="gap-2"
            >
              <RefreshCw className={cn("h-4 w-4", isUpdating && "animate-spin")} />
              {isUpdating ? "Updating..." : "Update News"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground font-medium">
            {new Date(news.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <NewsCarousel stories={news.stories} />
      </CardContent>
    </Card>
  );
};
