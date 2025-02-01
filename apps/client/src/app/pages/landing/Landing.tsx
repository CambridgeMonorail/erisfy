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
} from 'lucide-react';

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

const GITHUB_URL = 'https://github.com/CambridgeMonorail/erisfy';
const DISCORD_URL = 'https://discord.com/invite/your-discord-invite';
const TWITTER_URL = 'https://x.com/TimDMorris';

export const LandingPage: FC = () => {
  const navigate = useNavigate();

  const handleScrollToFeatures = useCallback(() => {
    const featuresElement = document.getElementById('features');
    featuresElement?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleGitHubRedirect = useCallback(() => {
    window.open(GITHUB_URL, '_blank', 'noopener,noreferrer');
  }, []);

  useEffect(() => {
    document.title = 'Erisfy - Find the Right Stocks, Faster';
  }, []);

  return (
    <div
      className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-primary text-foreground"
      data-testid="landing-page"
      role="main"
    >
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
          title="Erisfy: Find the Right Stocks, Faster."
          subtitle="Smarter investing starts with the right insights."
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
            text: 'Find Out More',
            onClick: handleScrollToFeatures,
          }}
          layout="left"
          data-testid="hero-section"
          variant="dark"
        />
      </div>
      <AboutSection
        title="The Smartest Stock Screener for Everyday Investors"
        description="Most stock screeners flood you with complex data. Erisfy makes investing simple. Our AI-powered system helps you filter, analyze, and find high-potential stocks in just a few clicks—so you can focus on making informed decisions, not interpreting spreadsheets."
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
        header="Our Divine panoply"
        subheader="Built on a foundation of chaotic brilliance"
        data-testid="about-section"
      />
      <FeaturesSection
        id="features"
        title="What You’ll Get (if Erisfy Were Real)"
        features={[
          {
            title: 'AI-Powered Stock Discovery',
            description:
              'Get personalized stock recommendations tailored to your goals.',
            icon: <Rocket className="text-red-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Effortless Smart Filtering',
            description:
              'Set filters or just type what you’re looking for—Erisfy handles the rest.',
            icon: <Palette className="text-blue-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Clear, Actionable Insights',
            description:
              'AI explains stock movements in plain language, not just numbers.',
            icon: <Paintbrush className="text-green-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Scalability Without Bounds',
            description:
              'Scale your pretend portfolios and fictional assets to infinity (and beyond).',
            icon: <BarChart className="text-yellow-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Documentation Worth Reading',
            description:
              'Enjoy non-existent but perfectly written guides that make your journey into chaos seamless.',
            icon: <ChartLine className="text-purple-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Performance Beyond Reality',
            description:
              'Optimized for trading at the speed of thought (or maybe faster).',
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
        description="Click below to enter a world where Erisfy exists—and where every trade you make is smarter, faster, and powered by AI-fueled chaos.
Just kidding. But do check out the demo."
        buttonText="Try the Demo"
        buttonAction={() => navigate('/home')}
        data-testid="demo-section"
        aria-label="Try demo section"
      />
      <CTASection
        variant="dark"
        title="Join the Community"
        description="Join a growing community of investors using AI to simplify stock research. Learn from experts, share insights, and take control of your financial future."
        buttonText="Explore Erisfy on GitHub"
        buttonAction={handleGitHubRedirect}
        data-testid="community-section"
        aria-label="Community section"
      />
      <StepsSection
        title="Get Started in No Time (Hypothetically)"
        steps={[
          {
            title: 'Clone the repository.',
            description: 'Download the tools of the trade—if they existed.',
          },
          {
            title: 'Install dependencies.',
            description: 'Use pnpm, because it sounds cool and works fast.',
          },
          {
            title: 'Start the server.',
            description: 'Witness the power of imagination brought to life (in your dev environment).',
          },
        ]}
        buttonText="Read the Documentation"
        buttonAction={() =>
          window.open('https://github.com/CambridgeMonorail/erisfy', '_blank')
        }
        data-testid="steps-section"
      />
      <Tagline
        text="Harness Chaos. Trade Smarter."
        dataTestId="tagline"
      />
      <Footer
        className="w-full px-4 sm:px-6 lg:px-8"
        navigationLinks={[
          { text: 'Home', url: '#' },
          { text: 'Features', url: '#features' },
          { text: 'Documentation', url: GITHUB_URL },
          { text: 'Community', url: DISCORD_URL },
          { text: 'GitHub', url: GITHUB_URL },
        ]}
        socialMediaIcons={[
          {
            icon: (props) => <Github {...props} />,
            url: GITHUB_URL,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          {
            icon: (props) => <Twitter {...props} />,
            url: TWITTER_URL,
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        ]}
        copyrightText="&copy; 2024 Erisfy. All rights reserved."
        data-testid="footer"
      />
    </div>
  );
};
