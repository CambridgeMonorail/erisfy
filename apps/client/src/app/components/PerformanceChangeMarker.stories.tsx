import { Meta, StoryObj } from '@storybook/react';
import { PerformanceChangeMarker } from './PerformanceChangeMarker';

const meta: Meta<typeof PerformanceChangeMarker> = {
  title: 'Components/PerformanceChangeMarker',
  component: PerformanceChangeMarker,
  tags: ['autodocs'],
  argTypes: {
    value: { control: 'number' },
    orientation: { control: 'radio', options: ['vertical', 'horizontal'] },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof PerformanceChangeMarker>;

/**
 * Default horizontal orientation with a value of 50.
 */
export const Horizontal: Story = {
  args: {
    value: 50,
    orientation: 'horizontal',
  },
};

/**
 * Vertical orientation with a value of 75.
 */
export const Vertical: Story = {
  args: {
    value: 75,
    orientation: 'vertical',
  },
};

/**
 * Horizontal orientation with a value of 25 and custom class.
 */
export const HorizontalCustomClass: Story = {
  args: {
    value: 25,
    orientation: 'horizontal',
    className: 'w-64 h-4',
  },
};

/**
 * Vertical orientation with a value of 90 and custom class.
 */
export const VerticalCustomClass: Story = {
  args: {
    value: 90,
    orientation: 'vertical',
    className: 'h-64 w-4',
  },
};

/**
 * Debug vertical orientation with default and custom class.
 */
export const DebugVertical: Story = {
  args: {
    value: 50,
    orientation: 'vertical',
    className: 'h-64 w-4 bg-red-200',
  },
};
