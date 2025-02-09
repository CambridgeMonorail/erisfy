import { type FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from '@erisfy/shadcnui';
import {
  Newspaper,
  ShoppingCart,
  Briefcase,
  LineChart,
  Building2,
  type LucideIcon,
} from 'lucide-react';

export type MarketSector =
  | 'Energy'
  | 'Materials'
  | 'Industrials'
  | 'Utilities'
  | 'Healthcare'
  | 'Financials'
  | 'Consumer Discretionary'
  | 'Consumer Staples'
  | 'Information Technology'
  | 'Communication Services'
  | 'Real Estate';

export type NewsStory = {
  title: string;
  one_line_summary: string;
  whats_happening: string;
  market_impact: string;
  market_sector: MarketSector;
};

export interface NewsStoryCardProps {
  story: NewsStory;
  className?: string;
}

const CATEGORY_ICONS: Record<MarketSector, LucideIcon> = {
  'Energy': LineChart,
  'Materials': Building2,
  'Industrials': Briefcase,
  'Utilities': Building2,
  'Healthcare': Briefcase,
  'Financials': ShoppingCart,
  'Consumer Discretionary': ShoppingCart,
  'Consumer Staples': ShoppingCart,
  'Information Technology': Briefcase,
  'Communication Services': Building2,
  'Real Estate': Building2,
};

export const NewsStoryCard: FC<NewsStoryCardProps> = ({ story, className = '' }) => {
  const CategoryIcon = CATEGORY_ICONS[story.market_sector] || Newspaper;

  return (
    <Card
      className={`
        h-full flex flex-col
        transition-all duration-300
        hover:shadow-xl shadow-md
        bg-card border-border/40
        rounded-xl overflow-hidden
        ${className}
      `}
    >
      <CardHeader className="p-6 pb-4 space-y-4">
        <div className="flex items-center justify-between">
          <Badge
            variant="secondary"
            className="text-sm font-medium px-3 py-1 rounded-lg"
            aria-label={`Market sector: ${story.market_sector}`}
          >
            {story.market_sector}
          </Badge>
          <CategoryIcon
            className="w-6 h-6 text-primary transition-colors duration-200 hover:text-primary/80"
            aria-hidden="true"
          />
        </div>
        <div className="space-y-2">
          <CardTitle
            className="text-2xl font-bold leading-tight line-clamp-2 text-foreground"
            title={story.title}
          >
            {story.title}
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground/90 line-clamp-2">
            {story.one_line_summary}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between p-6 pt-2 space-y-6">
        <div className="space-y-6">
          <section
            aria-label="What's Happening"
            className="rounded-lg bg-muted/50 p-4"
          >
            <h4 className="font-semibold text-base mb-2 text-foreground">
              What's Happening:
            </h4>
            <p className="text-base text-muted-foreground line-clamp-3">
              {story.whats_happening}
            </p>
          </section>
          <section
            aria-label="Market Impact"
            className="rounded-lg bg-muted/50 p-4"
          >
            <h4 className="font-semibold text-base mb-2 text-foreground">
              Impact:
            </h4>
            <p className="text-base text-muted-foreground line-clamp-3">
              {story.market_impact}
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
};
