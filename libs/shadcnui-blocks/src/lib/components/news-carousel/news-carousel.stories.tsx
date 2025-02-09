import type { Meta, StoryObj } from '@storybook/react';
import { NewsCarousel } from './index';

const meta: Meta<typeof NewsCarousel> = {
  title: 'Blocks/NewsCarousel',
  component: NewsCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof NewsCarousel>;

const mockStories = [
  {
    title: 'Market Analysis: Tech Stocks Surge',
    summary: 'Technology sector sees unprecedented growth as AI investments skyrocket',
    date: '2024-02-15',
    imageUrl: 'https://picsum.photos/800/450',
  },
  {
    title: 'Economic Outlook 2024',
    summary: 'Experts predict stable growth despite global challenges',
    date: '2024-02-14',
    imageUrl: 'https://picsum.photos/800/450',
  },
  {
    title: 'Emerging Markets Report',
    summary: 'New opportunities arise in developing economies',
    date: '2024-02-13',
    imageUrl: 'https://picsum.photos/800/450',
  },
  {
    title: 'Sustainability in Finance',
    summary: 'Green investments continue to gain momentum',
    date: '2024-02-12',
    imageUrl: 'https://picsum.photos/800/450',
  },
];

export const Default: Story = {
  args: {
    stories: mockStories,
  },
};
