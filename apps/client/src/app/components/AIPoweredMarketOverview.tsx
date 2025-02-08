import { FC } from 'react';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent, 
  Badge,
  Separator,
  ScrollArea, 
  cn
} from '@erisfy/shadcnui';
import { Spinner } from '@erisfy/shadcnui-blocks';
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { MarketDataInsights, MarketStory } from '@erisfy/api';
import { useMarketInsights } from '../hooks/useMarketInsights';


type MarketStoryCardProps = {
  story: MarketStory;
};

const MarketStoryCard: FC<MarketStoryCardProps> = ({ story }) => {
  const { title, one_line_summary, whats_happening, market_impact, market_sector } = story;
  
  return (
    <Card className="mb-4 border hover:border-primary/20 transition-colors duration-200 shadow-sm hover:shadow-md">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold leading-tight">{title}</CardTitle>
          <Badge 
            variant="outline" 
            className="bg-background/50 hover:bg-background/80 transition-colors"
          >
            {market_sector}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground mt-2 leading-normal">
          {one_line_summary}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <div className="bg-background/50 rounded-lg p-3">
            <h4 className="font-medium mb-2 text-sm uppercase tracking-wide">
              What's Happening
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {whats_happening}
            </p>
          </div>
          <Separator className="my-2" />
          <div className="bg-background/50 rounded-lg p-3">
            <h4 className="font-medium mb-2 text-sm uppercase tracking-wide">
              Market Impact
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {market_impact}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export interface AIPoweredMarketOverviewProps {
  className?: string;
  date?: string;
}

const getDefaultDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const AIPoweredMarketOverview: FC<AIPoweredMarketOverviewProps> = ({ 
  className,
  date = getDefaultDate()
}) => {
  const { insights, isLoading, error } = useMarketInsights(date);

  //console log insights
  console.log('insights', insights);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-background/50 rounded-lg">
        <Spinner size="lg" aria-label="Loading market insights" />
      </div>
    );
  }

  if (error) {
    return (
      <Card className={cn("border-destructive bg-destructive/5", className)}>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-destructive" />
            <CardTitle className="text-destructive">Error Loading Market Insights</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-destructive/80">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!insights || !insights.stories) {
    return (
      <Card className={cn("border-muted bg-muted/5", className)}>
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground">
            No market insights available
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={cn("bg-card border shadow-md", className)}>
      <CardHeader className="border-b bg-muted/5">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold">Market Insights</CardTitle>
          <p className="text-sm text-muted-foreground font-medium">
            {new Date(insights.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <ScrollArea className="h-[800px] pr-4">
          <div className="space-y-4">
            {insights.stories.map((story, index) => (
              <MarketStoryCard 
                key={`${story.market_sector}-${index}`} 
                story={story} 
              />
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
