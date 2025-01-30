import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingFlow } from './OnboardingFlow';

const meta: Meta<typeof OnboardingFlow> = {
  title: 'Onboarding/OnboardingFlow',
  component: OnboardingFlow,
  tags: ['autodocs'],
  argTypes: {
    step: {
      name: 'Step',
      control: 'number',
      description: 'The current step in the onboarding flow',
    },
    progress: {
      name: 'Progress',
      control: 'number',
      description: 'The progress of the onboarding flow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingFlow>;

/**
 * Default story for the OnboardingFlow component.
 * This example shows the onboarding flow starting from the welcome screen.
 */
export const Default: Story = {
  name: 'Default',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 1,
    progress: 0,
  },
};

/**
 * GuidedSteps story for the OnboardingFlow component.
 * This example shows the onboarding flow at the guided steps stage.
 */
export const GuidedSteps: Story = {
  name: 'Guided Steps',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 2,
    progress: 33.33,
  },
};

/**
 * QuickSetupQuestionnaire story for the OnboardingFlow component.
 * This example shows the onboarding flow at the quick setup questionnaire stage.
 */
export const QuickSetupQuestionnaire: Story = {
  name: 'Quick Setup Questionnaire',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 3,
    progress: 66.66,
  },
};
