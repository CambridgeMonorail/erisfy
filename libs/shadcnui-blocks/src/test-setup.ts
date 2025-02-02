import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import * as React from 'react';

// Mock all shadcnui components
vi.mock('@erisfy/shadcnui', () => {
  const components: Record<string, React.FC<any>> = {
    Button: (props) => React.createElement('button', { type: 'button', ...props }, props.children),
    Alert: (props) => React.createElement('div', { role: 'alert', ...props }, props.children),
    AlertTitle: (props) => React.createElement('h5', props, props.children),
    AlertDescription: (props) => React.createElement('div', props, props.children),
  };

  return components;
});

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  AlertCircle: (props: any) => React.createElement('svg', props),
  RefreshCw: (props: any) => React.createElement('svg', props),
}));
