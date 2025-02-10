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
        component: 'A card component for displaying financial news stories with market sector categorization and structured content.'
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
  market_impact: 'This decision could affect mortgage rates, savings accounts, and overall market sentiment in the coming months.',
  market_sector: 'Financials'  // Changed from market_category to market_sector
};

/**
 * Default story showcasing a financial sector news story
 */
export const Financials: NewsStoryObj = {
  args: {
    story: baseStory
  }
};

/**
 * Story showcasing technology sector news
 */
export const Technology: NewsStoryObj = {
  args: {
    story: {
      title: 'Major Tech Company Announces Restructuring',
      one_line_summary: 'Silicon Valley giant reveals plans for organizational changes',
      whats_happening: 'A leading tech company announced major restructuring plans, including department reorganizations and strategic shifts in product focus.',
      market_impact: 'The restructuring could influence industry trends and affect competitor strategies in the tech sector.',
      market_sector: 'Information Technology',  // Changed from market_category
    },
  },
};

/**
 * Story showcasing healthcare sector news
 */
export const Healthcare: NewsStoryObj = {
  args: {
    story: {
      title: 'Healthcare Innovation Breakthrough',
      one_line_summary: 'Novel treatment method receives FDA approval',
      whats_happening: 'A breakthrough treatment method has received FDA approval, marking a significant advancement in patient care technology.',
      market_impact: 'This approval could reshape treatment protocols and create new opportunities in the healthcare market.',
      market_sector: 'Healthcare',  // Changed from market_category
    },
  },
};

/**
 * Story showcasing energy sector news
 */
export const Energy: NewsStoryObj = {
  args: {
    story: {
      title: 'Renewable Energy Investment Surge',
      one_line_summary: 'Clean energy projects attract record funding',
      whats_happening: 'Major energy companies are increasing their investments in renewable energy projects, with solar and wind power leading the way.',
      market_impact: 'This shift could accelerate the energy sector transition and affect traditional energy company valuations.',
      market_sector: 'Energy',  // Changed from market_category
    },
  },
};

/**
 * Demonstrates how the card handles long content with automatic truncation
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
      market_impact: 'The decisions made at this summit will have far-reaching implications for global trade, financial markets, and international cooperation. Markets are expected to react strongly to the new policies, while businesses will need to adapt to new regulatory frameworks. Long-term effects could reshape the global economic landscape.',
      market_sector: 'Financials',  // Changed from market_category
    },
  },
};
