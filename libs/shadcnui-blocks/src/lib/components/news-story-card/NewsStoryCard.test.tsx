import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { NewsStoryCard, type MarketSector } from './index';

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Newspaper: vi.fn(() => null),
  ShoppingCart: vi.fn(() => null),
  Briefcase: vi.fn(() => null),
  LineChart: vi.fn(() => null),
  Building2: vi.fn(() => null),
}));

// Mock the shadcn components
vi.mock('@erisfy/shadcnui', () => ({
  Card: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card">
      {children}
    </div>
  )),
  CardHeader: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card-header">
      {children}
    </div>
  )),
  CardContent: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card-content">
      {children}
    </div>
  )),
  CardTitle: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card-title">
      {children}
    </div>
  )),
  CardDescription: vi.fn(({ children, className }) => (
    <div className={className} data-testid="card-description">
      {children}
    </div>
  )),
  Badge: vi.fn(({ children, className }) => (
    <div className={className} data-testid="badge">
      {children}
    </div>
  )),
}));

describe('NewsStoryCard', () => {
  const mockStory = {
    title: "Test Story Title",
    one_line_summary: "Test Summary",
    whats_happening: "Test What's Happening",
    market_impact: "Test Market Impact",
    market_sector: "Information Technology" as MarketSector
  };

  it('renders all story content correctly', () => {
    render(<NewsStoryCard story={mockStory} />);

    expect(screen.getByText(mockStory.title)).toBeInTheDocument();
    expect(screen.getByText(mockStory.one_line_summary)).toBeInTheDocument();
    expect(screen.getByText(mockStory.whats_happening)).toBeInTheDocument();
    expect(screen.getByText(mockStory.market_impact)).toBeInTheDocument();
    expect(screen.getByText(mockStory.market_sector)).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    const customClass = 'test-custom-class';
    render(<NewsStoryCard story={mockStory} className={customClass} />);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass(customClass);
    expect(card).toHaveClass('h-full');
    expect(card).toHaveClass('flex');
    expect(card).toHaveClass('flex-col');
  });

  it('renders correct section headers', () => {
    render(<NewsStoryCard story={mockStory} />);

    expect(screen.getByText("What's Happening:")).toBeInTheDocument();
    expect(screen.getByText("Impact:")).toBeInTheDocument();
  });

  it('applies hover and transition classes', () => {
    render(<NewsStoryCard story={mockStory} />);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('hover:shadow-lg');
    expect(card).toHaveClass('transition-all');
  });
});
