import {
  Newspaper,
  ShoppingCart,
  Briefcase,
  LineChart,
  Building2,
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

export type NewsCategory = 'Economy' | 'Employment' | 'Investments' | 'Business';

export type Story = {
  title: string;
  one_line_summary: string;
  whats_happening: string;
  impact: string;
  category: NewsCategory;
};

export interface NewsStoryCardProps {
  story: Story;
  className?: string;
}

const categoryIcons: Record<NewsCategory, LucideIcon> = {
  Economy: LineChart,
  Employment: Building2,
  Investments: Briefcase,
  Business: ShoppingCart,
};

export function NewsStoryCard({ story, className }: NewsStoryCardProps) {
  const CategoryIcon = categoryIcons[story.category] || Newspaper;

  return (
    <Card className={`h-full flex flex-col transition-all duration-300 hover:shadow-lg overflow-hidden ${className ?? ''}`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="text-xs font-medium px-2 py-1">
            {story.category}
          </Badge>
          <CategoryIcon 
            className="w-5 h-5 text-blue-500" 
            aria-label={`${story.category} category icon`}
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
              {story.impact}
            </p>
          </section>
        </div>
      </CardContent>
    </Card>
  );
}
