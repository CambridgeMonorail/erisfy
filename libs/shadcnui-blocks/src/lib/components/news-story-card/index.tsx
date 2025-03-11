import {
  Building2, // Real Estate
  Factory, // Industrials
  Heart, // Healthcare
  Landmark, // Financials
  Laptop, // Information Technology
  Mountain, // Materials
  Newspaper, // Default
  Plug, // Utilities
  Radio, // Communication Services
  ShoppingBasket, // Consumer Staples
  ShoppingCart, // Consumer Discretionary
  Zap, // Energy
  type LucideIcon,
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
} from '@erisfy/shadcnui';

import { type MarketSector } from '@erisfy/api';  // Import the shared type

export type Story = {
  title: string;
  one_line_summary: string;
  whats_happening: string;
  market_impact: string;
  market_sector: MarketSector;  // Changed from market_category to market_sector
};

export interface NewsStoryCardProps {
  story: Story;
  className?: string;
}

const categoryIcons: Record<MarketSector, LucideIcon> = {
  Energy: Zap,
  Materials: Mountain,
  Industrials: Factory,
  Utilities: Plug,
  Healthcare: Heart,
  Financials: Landmark,
  "Consumer Discretionary": ShoppingCart,
  "Consumer Staples": ShoppingBasket,
  "Information Technology": Laptop,
  "Communication Services": Radio,
  "Real Estate": Building2,
};

export function NewsStoryCard({ story, className }: NewsStoryCardProps) {
  const CategoryIcon = categoryIcons[story.market_sector] || Newspaper;

  return (
    <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg overflow-hidden ${className ?? ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge
            variant="secondary"
            className="text-xs font-medium px-2 py-1"
            data-testid="news-story-category-badge"
          >
            {story.market_sector}
          </Badge>
          <CategoryIcon
            className="w-5 h-5 text-blue-500"
            aria-label={`${story.market_sector} sector icon`}
          />
        </div>
        <CardTitle
          className="text-xl font-bold leading-tight mb-2 line-clamp-2"
          aria-label={story.title}
        >
          {story.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {story.one_line_summary}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between pt-0 gap-4">
        <div className="space-y-3">
          <section>
            <h4 className="font-semibold text-sm mb-1 text-gray-700">
              What's Happening:
            </h4>
            <p className="text-sm text-gray-600 line-clamp-3 sm:line-clamp-4">
              {story.whats_happening}
            </p>
          </section>
          <section>
            <h4 className="font-semibold text-sm mb-1 text-gray-700">
              Impact:
            </h4>
            <p className="text-sm text-gray-600 line-clamp-3 sm:line-clamp-4">
              {story.market_impact}  {/* Changed from impact to market_impact */}
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
