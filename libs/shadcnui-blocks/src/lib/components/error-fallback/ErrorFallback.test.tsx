import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { ErrorFallback } from './index';
import '@testing-library/jest-dom';

describe('ErrorFallback', () => {
  const originalWindow = { ...window };
  
  beforeEach(() => {
    // Create a new mock for window.location
    const mockLocation = {
      ...window.location,
      reload: vi.fn(),
    };
    
    // Delete the property to avoid the "Cannot redefine property" error
    delete (window as any).location;
    
    // Set up our mock implementation
    (window as any).location = mockLocation;
  });

  afterEach(() => {
    // Restore the original window object
    (window as any).location = originalWindow.location;
    vi.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render error title and message correctly', () => {
      const error = new Error('Test error message');
      const { container } = render(<ErrorFallback error={error} />);
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    it('should render default message when error message is empty', () => {
      const error = new Error('');
      render(<ErrorFallback error={error} />);
      
      expect(screen.getByText('We apologize for the inconvenience. Our team has been notified of this issue.')).toBeInTheDocument();
    });

    it('should handle error with status code', () => {
      const error = Object.assign(new Error('Not Found'), { statusCode: 404 });
      render(<ErrorFallback error={error} />);
      
      expect(screen.getByText('Not Found')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper ARIA attributes', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} />);
      
      const alertElement = screen.getByTestId('error-alert');
      expect(alertElement).toHaveAttribute('role', 'alert');
      expect(alertElement).toHaveAttribute('aria-live', 'assertive');
    });

    it('should have accessible refresh button', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeVisible();
      expect(button).toHaveAccessibleName(/refresh page/i);
    });
  });

  describe('interactions', () => {
    it('should trigger page reload when refresh button is clicked', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} />);
      
      const refreshButton = screen.getByTestId('refresh-button');
      fireEvent.click(refreshButton);
      
      expect(window.location.reload).toHaveBeenCalledTimes(1);
    });
  });

  describe('test ids', () => {
    it('should have all required test ids', () => {
      const error = new Error('Test error');
      render(<ErrorFallback error={error} />);
      
      expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
      expect(screen.getByTestId('error-alert')).toBeInTheDocument();
      expect(screen.getByTestId('refresh-button')).toBeInTheDocument();
    });
  });
});
