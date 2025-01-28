import { Meta, StoryObj } from '@storybook/react';
import { Tag, TagProps } from './index';


const meta: Meta<TagProps> = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'destructive', 'outline'],
    },
    onRemove: { action: 'removed' },
  },
};

export default meta;

type Story = StoryObj<TagProps>;

/**
 * Default variant of the Tag component.
 */
export const Default: Story = {
  args: {
    children: 'Default Tag',
    variant: 'default',
  },
};

/**
 * Secondary variant of the Tag component.
 */
export const Secondary: Story = {
  args: {
    children: 'Secondary Tag',
    variant: 'secondary',
  },
};

/**
 * Destructive variant of the Tag component.
 */
export const Destructive: Story = {
  args: {
    children: 'Destructive Tag',
    variant: 'destructive',
  },
};

/**
 * Outline variant of the Tag component.
 */
export const Outline: Story = {
  args: {
    children: 'Outline Tag',
    variant: 'outline',
  },
};

