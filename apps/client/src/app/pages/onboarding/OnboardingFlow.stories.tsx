import type { Meta, StoryObj } from '@storybook/react';
import { OnboardingFlow } from './OnboardingFlow';
import { ErisfyProBanner } from '../../components/ErisfyProBanner'; // P74ff

const meta: Meta<typeof OnboardingFlow> = {
  title: 'Onboarding/OnboardingFlow',
  component: OnboardingFlow,
  tags: ['autodocs'],
  argTypes: {
    step: {
      name: 'Step',
      control: 'number',
      description: 'The current step in the Smart Start',
    },
    progress: {
      name: 'Progress',
      control: 'number',
      description: 'The progress of the Smart Start',
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingFlow>;

/**
 * Default story for the OnboardingFlow component.
 * This example shows the Smart Start starting from the welcome screen.
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
 * WelcomeScreen story for the OnboardingFlow component.
 * This example shows the Smart Start at the welcome screen stage.
 */
export const WelcomeScreen: Story = {
  name: 'Welcome Screen',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 1,
    progress: 0,
  },
};

/**
 * SelectInvestmentStyle story for the OnboardingFlow component.
 * This example shows the Smart Start at the select investment style stage.
 */
export const SelectInvestmentStyle: Story = {
  name: 'Select Investment Style',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 2,
    progress: 25,
  },
};

/**
 * SetRiskTolerance story for the OnboardingFlow component.
 * This example shows the Smart Start at the set risk tolerance stage.
 */
export const SetRiskTolerance: Story = {
  name: 'Set Risk Tolerance',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 3,
    progress: 50,
  },
};

/**
 * SetPreferences story for the OnboardingFlow component.
 * This example shows the Smart Start at the set preferences stage.
 */
export const SetPreferences: Story = {
  name: 'Set Preferences',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 4,
    progress: 75,
  },
};

/**
 * ReviewAndConfirm story for the OnboardingFlow component.
 * This example shows the Smart Start at the review and confirm stage.
 */
export const ReviewAndConfirm: Story = {
  name: 'Review & Confirm',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 5,
    progress: 100,
  },
};

/**
 * RedirectToStockScreenerResults story for the OnboardingFlow component.
 * This example shows the Smart Start at the redirect to stock screener results stage.
 */
export const RedirectToStockScreenerResults: Story = {
  name: 'Redirect to Stock Screener Results',
  render: (args) => <OnboardingFlow {...args} />,
  args: {
    step: 6,
    progress: 100,
  },
};

/**
 * ErisfyProBanner story for the OnboardingFlow component.
 * This example shows the ErisfyProBanner component.
 */
export const ErisfyProBannerStory: Story = {
  name: 'Erisfy Pro Banner',
  render: () => <ErisfyProBanner />,
}; // Pdbdf
