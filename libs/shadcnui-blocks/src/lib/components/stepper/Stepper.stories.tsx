import { Meta, StoryObj } from "@storybook/react"
import { Stepper } from "./index"
import { MapPin, Truck, CreditCard, ShoppingCart } from "lucide-react"

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  tags: ["autodocs"],
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
    description: "Add any payment information you have",
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
 */
export const Default: Story = {
  args: {
    currentStep: 1,
    steps,
  },
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
