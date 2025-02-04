import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ErrorFallback } from './index';
import '@testing-library/jest-dom';

// Mock Lucide icons
vi.mock('lucide-react', () => ({
  AlertCircle: vi.fn(() => (
    <svg data-testid="alert-circle-icon" aria-hidden="true" />
  )),
  RefreshCw: vi.fn(() => (
    <svg data-testid="refresh-icon" aria-hidden="true" />
  )),
}));

// Mock shadcn components and utilities
vi.mock('@erisfy/shadcnui', () => ({
  Button: vi.fn(({ children, ...props }) => (
    <button {...props}>{children}</button>
  )),
  Alert: vi.fn(({ children, ...props }) => (
    <div role="alert" {...props}>{children}</div>
  )),
  AlertTitle: vi.fn(({ children, ...props }) => (
    <h2 {...props}>{children}</h2>
  )),
  AlertDescription: vi.fn(({ children, ...props }) => (
    <div {...props}>{children}</div>
  )),
  cn: (...inputs: unknown[]) => inputs.filter(Boolean).join(' '),
}));

type MockLocation = Partial<Location> & {
  reload: () => void;
};

describe('ErrorFallback', () => {
  const originalWindow = { ...window };
  const mockOnRecover = vi.fn();
  
  beforeEach(() => {
    // Create a new mock for window.location
    const mockLocation: MockLocation = {
      ...window.location,
      reload: vi.fn(),
    };
    
    // Delete the property to avoid the "Cannot redefine property" error
    delete (window as { location?: Location }).location;
    
    // Set up our mock implementation
    (window as { location: MockLocation }).location = mockLocation;
  });

  afterEach(() => {
    // Restore the original window object
    (window as { location: Location }).location = originalWindow.location;
    vi.clearAllMocks();
    mockOnRecover.mockClear();
  });

  describe('rendering', () => {
    it('should render error title and message correctly', () => {
      const error = new Error('Test error message');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
      expect(screen.getByText('Try Again')).toBeInTheDocument();
    });

    it('should render default message when error message is empty', () => {
      const error = new Error('');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });

    it('should handle error with status code', () => {
      const error = Object.assign(new Error('Not Found'), { statusCode: 404 });
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });

    it('should render error details when provided', () => {
      const error = Object.assign(new Error('Test error'), { 
        details: { code: 'ERR_001' } 
      });
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      expect(screen.getByTestId('error-details')).toHaveTextContent('Details: {"code":"ERR_001"}');
    });

    it('should use custom texts when provided', () => {
      const error = new Error('Test error');
      render(
        <ErrorFallback 
          error={error} 
          onRecover={mockOnRecover}
          titleText="Custom Title"
          retryButtonText="Custom Retry"
        />
      );
      
      expect(screen.getByText('Custom Title')).toBeInTheDocument();
      expect(screen.getByText('Custom Retry')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      const containerElement = screen.getByTestId('error-fallback');
      expect(containerElement).toHaveAttribute('role', 'alert');
      expect(containerElement).toHaveAttribute('aria-live', 'assertive');
    });

    it('should have accessible retry button', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeVisible();
      expect(button).toHaveAccessibleName('Try Again');
    });
  });

  describe('interactions', () => {
    it('should call onRecover when retry button is clicked', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      const retryButton = screen.getByTestId('retry-button');
      fireEvent.click(retryButton);
      
      expect(mockOnRecover).toHaveBeenCalledTimes(1);
    });

    // Remove the page reload test since we're using onRecover for all actions
    // and the window.location.reload functionality is not needed

    it('should disable retry button when loading', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} isLoading={true} />);
      
      const retryButton = screen.getByTestId('retry-button');
      expect(retryButton).toBeDisabled();
    });
  });

  describe('test ids', () => {
    it('should have all required test ids', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} onRecover={mockOnRecover} />);
      
      const elements = [
        'error-fallback',
        'error-alert',
        'alert-circle-icon', // Changed from 'error-icon'
        'error-message',
        'retry-button'
      ];

      elements.forEach(testId => {
        expect(screen.getByTestId(testId)).toBeInTheDocument();
      });
    });
  });
});
