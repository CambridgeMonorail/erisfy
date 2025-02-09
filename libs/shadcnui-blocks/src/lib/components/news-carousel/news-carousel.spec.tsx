import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NewsCarousel } from './index';

const mockStories = [
  {
    title: 'Test Story 1',
    summary: 'Summary 1',
    date: '2024-02-15',
  },
  {
    title: 'Test Story 2',
    summary: 'Summary 2',
    date: '2024-02-14',
  },
];

describe('NewsCarousel', () => {
  it('renders all stories', () => {
    render(<NewsCarousel stories={mockStories} />);

    expect(screen.getByText('Test Story 1')).toBeInTheDocument();
    expect(screen.getByText('Test Story 2')).toBeInTheDocument();
    expect(screen.getByText('Summary 1')).toBeInTheDocument();
    expect(screen.getByText('Summary 2')).toBeInTheDocument();
  });

  it('renders navigation buttons', () => {
    render(<NewsCarousel stories={mockStories} />);

    const prevButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it('handles empty stories array', () => {
    render(<NewsCarousel stories={[]} />);

    const carousel = screen.getByRole('region');
    expect(carousel).toBeInTheDocument();
    expect(carousel).toBeEmpty();
  });
});
