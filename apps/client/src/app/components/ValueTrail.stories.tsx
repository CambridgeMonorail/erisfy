import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { ValueTrail, ValueTrailProps } from './ValueTrail';

const meta: Meta<ValueTrailProps> = {
  title: 'Components/ValueTrail',
  component: ValueTrail,
  tags: ['autodocs'],
  argTypes: {
    oldValue: { control: { type: 'number', min: 0, max: 100 } },
    newValue: { control: { type: 'number', min: 0, max: 100 } },
    className: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<ValueTrailProps>;

/**
 * Default story demonstrating the ValueTrail component with default values.
 */
export const Default: Story = {
  args: {
    oldValue: 30,
    newValue: 70,
  },
};

/**
 * Story demonstrating the ValueTrail component with a decreasing value.
 */
export const DecreasingValue: Story = {
  args: {
    oldValue: 70,
    newValue: 30,
  },
};

/**
 * Story demonstrating the ValueTrail component with the same old and new values.
 */
export const SameValue: Story = {
  args: {
    oldValue: 50,
    newValue: 50,
  },
};
