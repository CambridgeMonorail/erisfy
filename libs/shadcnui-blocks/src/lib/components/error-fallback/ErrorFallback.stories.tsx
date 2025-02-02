import type { Meta, StoryObj } from '@storybook/react';
import { ErrorFallback } from './index';

const meta = {
  title: 'Blocks/Feedback/ErrorFallback',
  component: ErrorFallback,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A fallback component that displays user-friendly error messages with a refresh option.',
      },
    },
  },
  argTypes: {
    error: {
      control: 'object',
      description: 'The error object containing message and optional status code',
      table: {
        type: { summary: 'Error & { statusCode?: number; message: string; }' },
      },
    },
  },
} satisfies Meta<typeof ErrorFallback>;

export default meta;
type Story = StoryObj<typeof ErrorFallback>;

/**
 * Basic error display with a generic error message.
 */
export const Basic: Story = {
  args: {
    error: new Error('An unexpected error occurred'),
  },
};

/**
 * Shows a specific error message with an HTTP status code.
 */
export const HttpError: Story = {
  args: {
    error: Object.assign(new Error('Failed to fetch data: Server responded with 404'), {
      statusCode: 404,
    }),
  },
};

/**
 * Displays a network connectivity error message.
 */
export const NetworkError: Story = {
  args: {
    error: Object.assign(new Error('Unable to connect to the server. Please check your internet connection.'), {
      statusCode: 0,
    }),
  },
};

/**
 * Shows how the component handles long error messages.
 */
export const LongErrorMessage: Story = {
  args: {
    error: new Error('This is a very long error message that demonstrates how the component handles text wrapping and container sizing for extensive error descriptions that might span multiple lines.'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates text wrapping behavior with long error messages.',
      },
    },
  },
};

/**
 * Mobile viewport display of the error message.
 */
export const MobileView: Story = {
  args: {
    error: new Error('Error displayed on mobile device'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Shows how the error appears on mobile devices.',
      },
    },
  },
};
