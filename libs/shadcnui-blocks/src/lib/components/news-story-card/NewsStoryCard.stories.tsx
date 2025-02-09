import type { Meta, StoryObj } from '@storybook/react';
import { NewsStoryCard, type MarketSector } from './index';

const meta: Meta<typeof NewsStoryCard> = {
  title: 'Shadcnui Blocks/NewsStoryCard',
  component: NewsStoryCard,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NewsStoryCard>;

const sampleStory = {
  title: "Tech Giant's Revolutionary AI Chip Breakthrough",
  one_line_summary: "Leading tech company announces groundbreaking AI processor with unprecedented performance gains",
  whats_happening: "A major technology company has unveiled a new artificial intelligence chip that demonstrates performance improvements of up to 300% compared to current-generation processors while consuming 50% less power.",
  market_impact: "This breakthrough could reshape the AI hardware market, potentially impacting competitors in the semiconductor industry and accelerating AI adoption across various sectors.",
  market_sector: "Information Technology" as MarketSector
};

/**
 * Default story showing a typical news story card with tech sector news
 */
export const Default: Story = {
  args: {
    story: sampleStory
  },
};

/**
 * Story demonstrating a financial sector news item
 */
export const FinancialSector: Story = {
  args: {
    story: {
      ...sampleStory,
      title: "Major Bank Announces Blockchain Integration",
      one_line_summary: "Leading financial institution implements blockchain technology for cross-border transactions",
      whats_happening: "One of the world's largest banks has announced the successful integration of blockchain technology into its cross-border payment systems, promising faster and more secure international transfers.",
      market_impact: "This move could significantly reduce transaction costs and processing times in international banking, potentially disrupting traditional payment systems.",
      market_sector: "Financials" as MarketSector
    }
  },
};

/**
 * Story showing a healthcare sector news item
 */
export const HealthcareSector: Story = {
  args: {
    story: {
      ...sampleStory,
      title: "Breakthrough in Cancer Treatment Research",
      one_line_summary: "Novel immunotherapy approach shows promising results in clinical trials",
      whats_happening: "Researchers have developed a new immunotherapy treatment that has shown unprecedented success rates in early-stage clinical trials for treating aggressive forms of cancer.",
      market_impact: "This development could revolutionize cancer treatment protocols and significantly impact healthcare companies focused on immunotherapy.",
      market_sector: "Healthcare" as MarketSector
    }
  },
};

/**
 * Story with custom styling through className prop
 */
export const CustomStyling: Story = {
  args: {
    story: sampleStory,
    className: "max-w-md bg-secondary"
  },
};
