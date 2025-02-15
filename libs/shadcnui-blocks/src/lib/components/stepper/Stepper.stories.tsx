import { Meta, StoryObj } from "@storybook/react"
import { Stepper } from "./index"
import { MapPin, Truck, CreditCard, ShoppingCart } from "lucide-react"

const meta: Meta<typeof Stepper> = {
  title: "Shadcnui Blocks/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    viewport: {
      defaultViewport: 'responsive'
    },
    layout: 'centered'
  }
}

export default meta

type Story = StoryObj<typeof Stepper>

const steps = [
  {
    title: "Address",
    description: "Add your address here",
    icon: MapPin,
  },
  {
    title: "Shipping",
    description: "Set your preferred shipping method",
    icon: Truck,
  },
  {
    title: "Payment",
    description: "Add any payment information",
    icon: CreditCard,
  },
  {
    title: "Checkout",
    description: "Confirm your order",
    icon: ShoppingCart,
  },
]

/**
 * Default Stepper story demonstrating the initial step.
 * View in different viewport sizes to see responsive behavior.
 */
export const Default: Story = {
  args: {
    currentStep: 1,
    steps,
  },
  parameters: {
    docs: {
      description: {
        story: 'The stepper adapts to different screen sizes by:\n- Hiding descriptions on tablet screens\n- Showing only icons and active step label on mobile\n- Reducing icon sizes on smaller screens'
      }
    }
  }
}

/**
 * Stepper story demonstrating the second step.
 */
export const StepTwo: Story = {
  args: {
    currentStep: 2,
    steps,
  },
}

/**
 * Stepper story demonstrating the third step.
 */
export const StepThree: Story = {
  args: {
    currentStep: 3,
    steps,
  },
}

/**
 * Stepper story demonstrating the final step.
 */
export const StepFour: Story = {
  args: {
    currentStep: 4,
    steps,
  },
}
