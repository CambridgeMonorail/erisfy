import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from '.';
import { Github, Twitter, Linkedin } from 'lucide-react';

const meta = {
  title: 'Landing/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    componentSubtitle: 'Site footer component with navigation and social links',
    docs: {
      description: {
        component: 'A responsive footer component that includes navigation links, social media icons, and copyright information.'
      }
    }
  },
  argTypes: {
    navigationLinks: {
      description: 'Array of navigation links to be displayed in the footer',
      control: { type: 'object' },
      table: {
        type: { summary: 'Array<{ text: string, url: string }>' }
      }
    },
    socialMediaIcons: {
      description: 'Array of social media icons with links',
      control: { type: 'object' },
      table: {
        type: { summary: 'Array<{ icon: LucideIcon, url: string, target?: string, rel?: string }>' }
      }
    },
    copyrightText: {
      description: 'Copyright text displayed at the bottom',
      control: 'text'
    },
    className: {
      description: 'Additional CSS classes to apply',
      control: 'text'
    },
    'aria-label': {
      description: 'Accessible label for the footer',
      control: 'text',
      table: {
        type: { summary: 'string' }
      }
    }
  }
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof Footer>;

/**
 * Primary footer configuration with standard navigation and social links
 */
export const Primary: Story = {
  args: {
    navigationLinks: [
      { text: 'About Us', url: '/about' },
      { text: 'Features', url: '/features' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'Contact', url: '/contact' }
    ],
    socialMediaIcons: [
      {
        icon: (props) => <Github {...props} />,
        url: 'https://github.com/CambridgeMonorail/erisfy',
        'aria-label': 'Visit our GitHub page',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: (props) => <Twitter {...props} />,
        url: 'https://twitter.com',
        'aria-label': 'Visit our Twitter page',
        target: '_blank',
        rel: 'noopener noreferrer'
      },
      {
        icon: (props) => <Linkedin {...props} />,
        url: 'https://linkedin.com',
        'aria-label': 'Visit our LinkedIn page',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    ],
    copyrightText: '© 2025 Erisfy. All rights reserved.',
    'aria-label': 'Site footer'
  }
};

/**
 * Minimal footer configuration with essential elements only
 */
export const Minimal: Story = {
  args: {
    navigationLinks: [
      { text: 'Privacy', url: '/privacy' },
      { text: 'Terms', url: '/terms' }
    ],
    socialMediaIcons: [
      {
        icon: (props) => <Github {...props} />,
        url: 'https://github.com/CambridgeMonorail/erisfy',
        'aria-label': 'Visit our GitHub page',
        target: '_blank',
        rel: 'noopener noreferrer'
      }
    ],
    copyrightText: '© 2025 Erisfy',
    'aria-label': 'Site footer'
  }
};

/**
 * Footer with dark theme styling
 */
export const DarkTheme: Story = {
  args: {
    ...Primary.args,
    className: 'bg-background text-foreground dark'
  },
  parameters: {
    backgrounds: { default: 'dark' }
  }
};

/**
 * Footer with many navigation items to test responsive behavior
 */
export const WithManyLinks: Story = {
  args: {
    navigationLinks: [
      { text: 'Home', url: '/' },
      { text: 'About', url: '/about' },
      { text: 'Features', url: '/features' },
      { text: 'Pricing', url: '/pricing' },
      { text: 'Contact', url: '/contact' },
      { text: 'Blog', url: '/blog' },
      { text: 'Careers', url: '/careers' },
      { text: 'Support', url: '/support' }
    ],
    ...Primary.args
  }
};

/**
 * Footer rendered without any content to test fallback behavior
 */
export const Empty: Story = {
  args: {
    navigationLinks: [],
    socialMediaIcons: [],
    copyrightText: '',
    'aria-label': 'Site footer'
  }
};
