import { render, screen } from '@testing-library/react';
import { Spinner } from './index';

describe('Spinner', () => {
  it('renders with default props', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies custom size when number is provided', () => {
    render(<Spinner size={40} />);
    const spinner = screen.getByRole('status');
    expect(spinner).toHaveStyle({ width: '40px', height: '40px' });
  });

  it('applies variant classes correctly', () => {
    render(<Spinner variant="primary" />);
    expect(screen.getByRole('status')).toHaveClass('[&>div]:bg-primary');
  });
});
