import { type FC, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Github,
  Twitter,
  Rocket,
  Palette,
  Paintbrush,
  BarChart,
  ChartLine,
  Video,
  type LucideProps,
} from 'lucide-react';

import { useOnboarding } from '../../hooks/useOnboarding';
import {
  AboutSection,
  CTASection,
  FeaturesSection,
  Footer,
  StepsSection,
  HeroSection,
} from '@erisfy/landing';
import { Logo, Tagline } from '@erisfy/shadcnui-blocks';

import preReleaseImage from '../../../assets/images/pre-release.png';
import { ApiError, ApiResponse } from '@erisfy/api';

type SocialUrls = {
  GITHUB_URL: string;
  DISCORD_URL: string;
  TWITTER_URL: string;
};

const SOCIAL_URLS: SocialUrls = {
  GITHUB_URL: 'https://github.com/CambridgeMonorail/erisfy',
  DISCORD_URL: 'https://discord.com/invite/your-discord-invite',
  TWITTER_URL: 'https://x.com/TimDMorris',
} as const;


type OnboardingStatus = {
  hasViewed: boolean;
  lastViewedAt?: string;
};

export const LandingPage: FC = () => {
  const navigate = useNavigate();
  const { onboarding, isLoading, error } = useOnboarding();

  const handleScrollToFeatures = useCallback(() => {
    if (onboarding?.hasViewed) {
      navigate('/home');
    } else {
      navigate('/screener/onboarding-flow');
    }
  }, [navigate, onboarding]);

  const handleGitHubRedirect = useCallback(() => {
    window.open(SOCIAL_URLS.GITHUB_URL, '_blank', 'noopener,noreferrer');
  }, []);

  useEffect(() => {
    document.title = 'Erisfy - Find the Right Stocks, Faster';
  }, []);

  return (
    <div
      className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-primary text-foreground"
      data-testid="landing-page"
      role="main"
      aria-live="polite"
    >
      {error && (
        <div 
          role="alert" 
          className="bg-destructive text-destructive-foreground p-4 rounded-md"
        >
          {error}
        </div>
      )}
      <div 
        className="relative bg-primary" 
        data-testid="hero-section-container"
        id="hero-title"
        aria-labelledby="hero-title"
      >
        <img
          src={preReleaseImage}
          alt="Pre-release banner"
          className="absolute top-0 right-0 w-40 h-40 mt-12 transform rotate-45"
        />
        <HeroSection
          title="Erisfy: Find the Right Stocks, Faster. Invest Smarter with AI."
          subtitle="AI-powered stock screening that gives you clear, data-backed insights—so you can invest with confidence."
          description="Erisfy’s AI-powered stock screener helps you find high-quality investment opportunities in seconds—without the complexity. Get personalized insights and invest with confidence."
          image={
            <Logo
              fill="currentColor"
              height="448px"
              name="erisfy"
              width="448px"
            />
          }
          imageAlt="Logo for the boilerplate"
          ctaPrimary={{
            text: 'Explore Erisfy on GitHub',
            link: 'https://github.com/CambridgeMonorail/erisfy',
          }}
          ctaSecondary={{
            text: 'Try AI-Powered Stock Screening',
            onClick: handleScrollToFeatures,
          }}
          layout="left"
          data-testid="hero-section"
          variant="dark"
        />
      </div>
      <AboutSection
        title="The Smartest Stock Screener for Everyday Investors"
        description="Finding the right stocks shouldn't be complicated. Erisfy's AI-powered screener simplifies investing by filtering through thousands of stocks to find the best opportunities. We do the heavy lifting so you don't have to. No jargon. No endless spreadsheets. Just clear, actionable insights."
        logos={[
          <Logo
            name="nx"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="nx"
            title="Nx"
            ariaLabel="Nx"
          />,
          <Logo
            name="tailwind"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="tailwind"
            title="Tailwind CSS"
            ariaLabel="Tailwind CSS"
          />,
          <Logo
            name="shadcn"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="shadcn"
            title="Shadcn"
            ariaLabel="Shadcn"
          />,
          <Logo
            name="pnpm"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="pnpm"
            title="Pnpm"
            ariaLabel="Pnpm"
          />,
          <Logo
            name="react"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="react"
            title="React"
            ariaLabel="React"
          />,
          <Logo
            name="vite"
            className="w-26 h-26 sm:w-12 sm:h-12"
            key="vite"
            title="Vite"
            ariaLabel="Vite"
          />,
        ]}
        header="Enterprise-Grade Technology Stack"
        subheader="Built with the same tools trusted by Fortune 500 companies"
        data-testid="about-section"
      />
      <FeaturesSection
        id="features"
        title="Smarter Investing, Powered by AI"
        features={[
          {
            id: 'ai-screening',
            title: 'Find High-Quality Stocks with AI',
            description:
              'Find high-quality stock opportunities with AI-powered screening, tailored to your investment strategy.',
            icon: <Rocket className="text-red-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            id: 'smart-filters',
            title: 'Smart Filters & Natural Language Search',
            description:
              'Screen thousands of stocks instantly using smart filters or simple natural language search.',
            icon: <Palette className="text-blue-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            id: 'market-moves',
            title: 'Understand Market Moves with AI',
            description:
              'Get AI-driven insights that break down stock trends, risks, and opportunities in plain language—so you always know why a stock is moving.',
            icon: <Paintbrush className="text-green-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            id: 'adaptive-ai',
            title: 'AI That Adapts to You',
            description:
              'Erisfy grows with your portfolio—customizable AI tools that adapt as your investment strategies evolve.',
            icon: <BarChart className="text-yellow-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            id: 'learn-invest',
            title: 'Learn & Invest with Confidence',
            description:
              'Step-by-step guides and AI-explained insights help you navigate Erisfy like a pro—whether you’re new to investing or an expert.',
            icon: <ChartLine className="text-purple-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            id: 'real-time',
            title: 'Real-Time AI Market Insights',
            description:
              'AI-powered analysis delivers real-time stock insights—so you’re always ahead of the market.',
            icon: <Video className="text-orange-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
        ]}
        data-testid="features-section"
      />
      <CTASection
        variant="light"
        title="Experience It Yourself"
        description="See Erisfy in action—where AI helps you find, analyze, and track stocks faster than ever. Try the demo and discover how smart investing starts with the right insights."
        buttonText={isLoading ? "Loading..." : "Try AI-Powered Stock Screening"}
        buttonAction={handleScrollToFeatures}
        disabled={isLoading}
        data-testid="demo-section"
        aria-label="Try demo section"
      />
      <CTASection
        variant="dark"
        title="Join the Community"
        description="Join thousands of investors using AI to find smarter opportunities. Learn, share insights, and take control of your investments with confidence."
        buttonText="Explore Erisfy on GitHub"
        buttonAction={handleGitHubRedirect}
        data-testid="community-section"
        aria-label="Community section"
      />
      <StepsSection
        title="Quick Start with Erisfy"
        steps={[
          {
            title: 'Clone the Repository.',
            description: 'Access our codebase directly from GitHub.',
          },
          {
            title: 'Install Dependencies.',
            description: 'Use your preferred package manager to set up the necessary components.',
          },
          {
            title: 'Run the Application.',
            description: 'Launch Erisfy locally and explore its features.',
          },
        ]}
        buttonText="Read the Documentation"
        buttonAction={() =>
          window.open('https://github.com/CambridgeMonorail/erisfy', '_blank')
        }
        data-testid="steps-section"
      />
      <Tagline
        text="AI-Powered Insights. Confident Decisions."
        dataTestId="tagline"
      />
      <Footer
        className="w-full px-4 sm:px-6 lg:px-8"
        navigationLinks={[
          { text: 'Home', url: '#' },
          { text: 'Features', url: '#features' },
          { text: 'Documentation', url: SOCIAL_URLS.GITHUB_URL },
          { text: 'Community', url: SOCIAL_URLS.DISCORD_URL },
          { text: 'GitHub', url: SOCIAL_URLS.GITHUB_URL },
        ]}
        socialMediaIcons={[
          {
            icon: (props: LucideProps) => <Github {...props} />,
            url: SOCIAL_URLS.GITHUB_URL,
            'aria-label': 'Visit Erisfy on GitHub',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          {
            icon: (props: LucideProps) => <Twitter {...props} />,
            url: SOCIAL_URLS.TWITTER_URL,
            'aria-label': 'Follow Erisfy on Twitter',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        ]}
        copyrightText="&copy; 2025 Erisfy. All rights reserved."
        data-testid="footer"
      />
    </div>
  );
};
