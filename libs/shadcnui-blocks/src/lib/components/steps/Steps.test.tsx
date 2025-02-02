import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Steps } from '.';

// Mock the cn function from shadcnui
vi.mock('@erisfy/shadcnui', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

describe('Steps', () => {
  const mockSteps = [
    { title: 'Step 1', description: 'Description 1' },
    { title: 'Step 2', description: 'Description 2' },
    { title: 'Step 3', description: 'Description 3' },
  ];

  it('renders nothing when steps array is empty', () => {
    render(<Steps steps={[]} />);
    expect(screen.queryByTestId('steps-section')).not.toBeInTheDocument();
  });

  it('renders all steps with correct content', () => {
    render(<Steps steps={mockSteps} />);
    
    mockSteps.forEach((step, index) => {
      expect(screen.getByText(step.title)).toBeInTheDocument();
      expect(screen.getByText(step.description)).toBeInTheDocument();
      const stepNumber = screen.getByText((index + 1).toString());
      expect(stepNumber).toBeInTheDocument();
      expect(stepNumber).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('renders heading and subheading when provided', () => {
    const props = {
      heading: 'Test Heading',
      subheading: 'Test Subheading',
      steps: mockSteps,
    };

    render(<Steps {...props} />);

    expect(screen.getByTestId('steps-heading')).toHaveTextContent(props.heading);
    expect(screen.getByTestId('steps-subheading')).toHaveTextContent(props.subheading);
  });

  it('renders highlighted text in subheading correctly', () => {
    const props = {
      subheading: 'This is a test highlight text',
      highlight: 'highlight',
      highlightClassName: 'text-primary',
      steps: mockSteps,
    };

    render(<Steps {...props} />);
    
    const highlightedText = screen.getByText('highlight');
    expect(highlightedText).toHaveClass('text-primary');
  });

  it('applies custom className when provided', () => {
    const customClass = 'custom-test-class';
    render(<Steps steps={mockSteps} className={customClass} />);
    
    const section = screen.getByTestId('steps-section');
    expect(section.className).toContain(customClass);
  });

  it('renders correct number of steps', () => {
    render(<Steps steps={mockSteps} />);
    
    const steps = screen.getAllByRole('listitem');
    expect(steps).toHaveLength(mockSteps.length);
  });

  it('renders steps with correct accessibility attributes', () => {
    render(<Steps steps={mockSteps} />);
    
    const list = screen.getByRole('list');
    expect(list).toHaveAttribute('aria-label', 'Process steps');
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(mockSteps.length);
  });

  it('handles multiple highlights in subheading', () => {
    const props = {
      subheading: 'Test test test',
      highlight: 'test',
      highlightClassName: 'text-primary',
      steps: mockSteps,
    };

    render(<Steps {...props} />);
    
    const highlightedTexts = screen.getAllByText('test');
    highlightedTexts.forEach(element => {
      expect(element).toHaveClass('text-primary');
    });
  });
});
