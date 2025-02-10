import type { Meta, StoryObj } from '@storybook/react';
import { DEFAULT_OPTIONS, NewsCarousel, type NewsCarouselProps } from './index';

import type { Story } from '../news-story-card';
import { type MarketSector } from '@erisfy/api';

const meta: Meta<typeof NewsCarousel> = {
  component: NewsCarousel,
  title: 'Shadcnui Blocks/NewsCarousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive carousel component for displaying news stories. Features include navigation controls, slide indicators, and support for different viewport sizes with responsive layouts.'
      }
    }
  }
};

export default meta;
type NewsCarouselStory = StoryObj<typeof NewsCarousel>;

const mockStories: Story[] = [
  {
    title: 'Federal Reserve Announces Interest Rate Decision',
    one_line_summary: 'Fed maintains current interest rates despite inflation concerns',
    whats_happening: 'The Federal Reserve decided to keep interest rates unchanged at their latest meeting, citing the need to balance inflation concerns with economic growth. This decision comes amid mixed economic indicators and ongoing market uncertainty.',
    market_impact: 'This decision could affect borrowing costs, market liquidity, and overall economic growth trajectory.',
    market_sector: 'Financials' as MarketSector
  },
  {
    title: 'Major Tech Company Announces Restructuring',
    one_line_summary: 'Silicon Valley giant reveals plans for organizational changes',
    whats_happening: 'A leading tech company announced major restructuring plans, including department reorganizations and strategic shifts in product focus. The changes aim to streamline operations and improve efficiency.',
    market_impact: 'Could influence industry-wide hiring trends and tech sector valuations.',
    market_sector: 'Information Technology' as MarketSector
  },
  {
    title: 'Healthcare Innovation Breakthrough',
    one_line_summary: 'Novel treatment method shows promising results',
    whats_happening: 'Researchers have developed a new therapeutic approach that shows significant improvement in treatment outcomes.',
    market_impact: 'Potential to disrupt current treatment paradigms and affect healthcare company valuations.',
    market_sector: 'Healthcare' as MarketSector
  },
  {
    title: 'Energy Market Developments',
    one_line_summary: 'Renewable energy adoption accelerates',
    whats_happening: 'Major utilities announce significant investments in renewable energy infrastructure.',
    market_impact: 'Could accelerate the transition away from traditional energy sources and impact energy sector dynamics.',
    market_sector: 'Energy' as MarketSector
  }
];

/**
 * Default story showing a responsive carousel with navigation controls and slide indicators
 */
export const Default: NewsCarouselStory = {
  args: {
    stories: mockStories,
    options: DEFAULT_OPTIONS
  }
};

/**
 * Story demonstrating infinite loop functionality
 */
export const WithLooping: NewsCarouselStory = {
  args: {
    stories: mockStories,
    options: {
      loop: true,
      align: 'start',
      skipSnaps: false
    }
  }
};

/**
 * Story showing custom styling applied to the carousel container
 */
export const WithCustomStyling: NewsCarouselStory = {
  args: {
    stories: mockStories,
    className: 'bg-muted/50 p-6 rounded-xl',
    options: DEFAULT_OPTIONS
  }
};

/**
 * Story showing carousel behavior with single item
 */
export const SingleStory: NewsCarouselStory = {
  args: {
    stories: [mockStories[0]],
    options: DEFAULT_OPTIONS
  }
};

/**
 * Story demonstrating empty state handling
 */
export const EmptyState: NewsCarouselStory = {
  args: {
    stories: [],
    options: DEFAULT_OPTIONS
  }
};

/**
 * Story showing carousel with many items to demonstrate scrolling behavior
 */
export const ManyItems: NewsCarouselStory = {
  args: {
    stories: Array.from({ length: 8 }, (_, i) => ({
      ...mockStories[i % mockStories.length],
      title: `${mockStories[i % mockStories.length].title} - ${i + 1}`
    })),
    options: DEFAULT_OPTIONS
  }
};
