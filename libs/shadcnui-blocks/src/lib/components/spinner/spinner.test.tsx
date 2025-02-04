import { render, screen } from '@testing-library/react';
import { Spinner } from './index';

// Mock the cn function
vi.mock('@erisfy/shadcnui', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    const spinner = screen.getByRole('status');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('relative', 'inline-block', 'aspect-square', 'transform-gpu', 'size-5');
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies custom size when number is provided', () => {
    render(<Spinner size={40} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('applies variant classes correctly', () => {
    render(<Spinner variant="primary" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('[&>div]:bg-primary');
  });

  it('applies size variant classes correctly', () => {
    render(<Spinner size="lg" />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveClass('size-8');
  });
});
