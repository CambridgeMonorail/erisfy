import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './index';

const meta = {
  title: 'Shadcnui Blocks/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'destructive', 'muted'],
    },
    size: {
      control: 'select',
      options: ['sm', 'default', 'lg', 40],
    },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default spinner with standard size and appearance
 */
export const Default: Story = {
  args: {},
};

/**
 * Primary variant spinner useful for important loading states
 */
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

/**
 * Small size spinner for compact UI elements
 */
export const Small: Story = {
  args: {
    size: 'sm',
  },
};

/**
 * Large size spinner for prominent loading states
 */
export const Large: Story = {
  args: {
    size: 'lg',
  },
};

/**
 * Custom size spinner defined in pixels
 */
export const CustomSize: Story = {
  args: {
    size: 40,
  },
};

/**
 * Destructive variant for error or warning states
 */
export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
};

/**
 * Example of multiple spinners with different variants
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Spinner variant="default" />
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="destructive" />
      <Spinner variant="muted" />
    </div>
  ),
};

/**
 * Example of multiple spinners with different sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="default" />
      <Spinner size="lg" />
      <Spinner size={40} />
    </div>
  ),
};
