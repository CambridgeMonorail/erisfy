import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricDisplay } from './metric-display';

describe('MetricDisplay', () => {
  it('renders with basic props', () => {
    render(<MetricDisplay label="Users" value="1,234" />);
    
    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('1,234')).toBeInTheDocument();
  });

  it('renders with subValue when provided', () => {
    render(
      <MetricDisplay 
        label="Revenue" 
        value="$50,000" 
        subValue="+15% from last month" 
      />
    );

    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$50,000')).toBeInTheDocument();
    expect(screen.getByText('+15% from last month')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    render(
      <MetricDisplay 
        label="Views" 
        value="5,678" 
        className="custom-class" 
      />
    );

    const container = screen.getByRole('group');
    expect(container).toHaveClass('custom-class');
  });

  it('adds title attribute when provided', () => {
    const title = 'Total number of active users';
    render(
      <MetricDisplay 
        label="Active Users" 
        value="892" 
        title={title} 
      />
    );

    const container = screen.getByRole('group');
    expect(container).toHaveAttribute('title', title);
  });

  it('generates correct aria-labelledby ID', () => {
    render(<MetricDisplay label="Active Users" value="892" />);

    const container = screen.getByRole('group');
    const label = screen.getByText('Active Users');
    
    expect(container).toHaveAttribute('aria-labelledby', 'metric-label-active-users');
    expect(label).toHaveAttribute('id', 'metric-label-active-users');
  });

  it('handles numeric values correctly', () => {
    render(<MetricDisplay label="Count" value={1234} subValue={56} />);

    expect(screen.getByText('1234')).toBeInTheDocument();
    expect(screen.getByText('56')).toBeInTheDocument();
  });
});
