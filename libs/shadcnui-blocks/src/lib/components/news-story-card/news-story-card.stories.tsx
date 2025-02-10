import type { Meta, StoryObj } from '@storybook/react';
import { NewsStoryCard, type Story } from './index';

const meta: Meta<typeof NewsStoryCard> = {
  component: NewsStoryCard,
  title: 'Shadcnui Blocks/NewsStoryCard',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A card component for displaying financial news stories with categorization and structured content.'
      }
    }
  },
  decorators: [
    (Story) => (
      <div className="max-w-md">
        <Story />
      </div>
    )
  ]
};

export default meta;
type NewsStoryObj = StoryObj<typeof NewsStoryCard>;

const baseStory: Story = {
  title: 'Federal Reserve Announces Interest Rate Decision',
  one_line_summary: 'Fed maintains current interest rates despite inflation concerns',
  whats_happening: 'The Federal Reserve decided to keep interest rates unchanged at their latest meeting, citing the need to balance inflation control with economic growth.',
  impact: 'This decision could affect mortgage rates, savings accounts, and overall market sentiment in the coming months.',
  category: 'Economy'
};

/**
 * Default story showcasing an economic news story with standard length content
 * @see Story.category for available categories
 */
export const Economy: NewsStoryObj = {
  args: {
    story: baseStory
  }
};

/**
 * Story showcasing business-related news
 */
export const Business: NewsStoryObj = {
  args: {
    story: {
      title: 'Major Tech Company Announces Restructuring',
      one_line_summary: 'Silicon Valley giant reveals plans for organizational changes',
      whats_happening: 'A leading tech company announced major restructuring plans, including department reorganizations and strategic shifts in product focus.',
      impact: 'The restructuring could influence industry trends and affect competitor strategies in the tech sector.',
      category: 'Business',
    },
  },
};

/**
 * Story showcasing employment-related news
 */
export const Employment: NewsStoryObj = {
  args: {
    story: {
      title: 'Job Market Shows Strong Growth',
      one_line_summary: 'Latest employment report exceeds expectations',
      whats_happening: 'The latest jobs report shows significant growth in employment numbers across multiple sectors, particularly in technology and healthcare.',
      impact: 'Strong job growth could lead to wage increases and potential shifts in monetary policy.',
      category: 'Employment',
    },
  },
};

/**
 * Story showcasing investment news
 */
export const Investments: NewsStoryObj = {
  args: {
    story: {
      title: 'New Investment Trends Emerge in Green Technology',
      one_line_summary: 'Sustainable tech investments reach record highs',
      whats_happening: 'Investors are increasingly focusing on green technology companies, with record amounts of capital flowing into sustainable energy and climate tech startups.',
      impact: 'This trend could accelerate the development of sustainable technologies and influence traditional energy sector valuations.',
      category: 'Investments',
    },
  },
};

/**
 * Demonstrates how the card handles long content with automatic truncation
 * and responsive behavior
 */
export const LongContent: NewsStoryObj = {
  parameters: {
    docs: {
      description: {
        story: 'Shows how the component handles overflow content with ellipsis and maintains consistent height.'
      }
    }
  },
  args: {
    story: {
      ...baseStory,
      title: 'Global Economic Summit Addresses Multiple Critical Challenges',
      one_line_summary: 'World leaders gather to discuss pressing economic issues including climate change, digital currencies, and trade relations in an unprecedented three-day summit',
      whats_happening: 'The summit brought together leaders from over 190 countries to address critical global challenges. Discussions centered around climate finance, cryptocurrency regulations, international trade agreements, and measures to prevent future financial crises. Several groundbreaking agreements were reached.',
      impact: 'The decisions made at this summit will have far-reaching implications for global trade, financial markets, and international cooperation. Markets are expected to react strongly to the new policies, while businesses will need to adapt to new regulatory frameworks. Long-term effects could reshape the global economic landscape.',
      category: 'Economy',
    },
  },
};
