import type { Meta, StoryObj } from '@storybook/react';
import { NewsCarousel } from './index';
import type { Story } from '../news-story-card';

const meta: Meta<typeof NewsCarousel> = {
  component: NewsCarousel,
  title: 'Shadcnui Blocks/NewsCarousel',
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive carousel component for displaying news stories with navigation controls and slide indicators.'
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
    whats_happening: 'The Federal Reserve decided to keep interest rates unchanged at their latest meeting.',
    impact: 'This decision could affect mortgage rates and market sentiment.',
    category: 'Economy'
  },
  {
    title: 'Major Tech Company Announces Restructuring',
    one_line_summary: 'Silicon Valley giant reveals plans for organizational changes',
    whats_happening: 'A leading tech company announced major restructuring plans.',
    impact: 'The restructuring could influence industry trends.',
    category: 'Business'
  },
  {
    title: 'Job Market Shows Strong Growth',
    one_line_summary: 'Latest employment report exceeds expectations',
    whats_happening: 'The latest jobs report shows significant growth in employment numbers.',
    impact: 'Strong job growth could lead to wage increases.',
    category: 'Employment'
  },
  {
    title: 'New Investment Trends Emerge',
    one_line_summary: 'Sustainable tech investments reach record highs',
    whats_happening: 'Investors are increasingly focusing on green technology companies.',
    impact: 'This trend could accelerate sustainable technology development.',
    category: 'Investments'
  }
];

/**
 * Default story showing multiple news stories in a carousel
 */
export const Default: NewsCarouselStory = {
  args: {
    stories: mockStories
  }
};

/**
 * Story showing carousel with looping enabled
 */
export const WithLooping: NewsCarouselStory = {
  args: {
    stories: mockStories,
    options: {
      loop: true
    }
  }
};

/**
 * Story showing single story view
 */
export const SingleStory: NewsCarouselStory = {
  args: {
    stories: [mockStories[0]]
  }
};

/**
 * Story showing empty state handling
 */
export const EmptyState: NewsCarouselStory = {
  args: {
    stories: []
  }
};

/**
 * Story showing many items to demonstrate scrolling
 */
export const ManyItems: NewsCarouselStory = {
  args: {
    stories: [
      ...mockStories,
      ...mockStories.map((story, index) => ({
        ...story,
        title: `${story.title} - Series ${index + 2}`,
      }))
    ]
  }
};
