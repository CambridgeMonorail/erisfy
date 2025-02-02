import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ErrorBoundary } from './ErrorBoundary';

const ErrorComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {
      // Suppress console.error during tests
    });
  });

  it('renders children when no error occurs', () => {
    render(
      <ErrorBoundary fallback={() => <div>Error occurred</div>}>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeDefined();
  });

  it('renders fallback when error occurs', () => {
    render(
      <ErrorBoundary fallback={(error) => <div>Error: {error.message}</div>}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error: Test error')).toBeDefined();
  });

  it('calls onError when error occurs', () => {
    const onError = vi.fn();
    
    render(
      <ErrorBoundary fallback={() => <div>Error occurred</div>} onError={onError}>
        <ErrorComponent />
      </ErrorBoundary>
    );

    expect(onError).toHaveBeenCalled();
  });
});
