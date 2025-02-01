import { FC, useEffect } from 'react';
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

export const LandingPage: FC = () => {
  const navigate = useNavigate();

  const handleScrollToFeatures = () => {
    const featuresElement = document.getElementById('features');
    if (featuresElement) {
      featuresElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Any other side effects can be added here
  }, []);

  return (
    <div
      className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-primary text-foreground"
      data-testid="landing-page"
    >
      <div className="relative bg-primary" data-testid="hero-section-container">
        <img
          src={preReleaseImage}
          alt="Pre-release"
          className="absolute top-0 right-0 w-40 h-40 mt-12 transform rotate-45"
        />
        <HeroSection
          title="Erisfy: The Fintech Solution So Good It Doesn’t Even Exist"
          subtitle="Order in chaos, profit in trading."
          description="Built to showcase the future of fintech—Erisfy is powered by cutting-edge ShadCN/UI components, the chaos of Eris, and a healthy dose of your imagination. AI-driven trading never looked this unreal"
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
            text: 'Start Pretending for Free',
            link: 'https://github.com/CambridgeMonorail/erisfy',
          }}
          ctaSecondary={{
            text: 'Explore the Illusion',
            onClick: handleScrollToFeatures,
          }}
          layout="left"
          data-testid="hero-section"
          variant="dark"
        />
      </div>
      <AboutSection
        title="Why Erisfy?"
        description="Erisfy isn’t just a product—it’s a state of mind. Designed to make you 
        question reality, this completely fictional fintech showcase combines cutting-edge UI 
        components with the unparalleled power of… your imagination.
        
        Whether you're managing 
        nonexistent portfolios or trading hypothetical stocks, Erisfy ensures you’re always ahead 
        of the curve—by not actually having any kind of backend."
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
        title="What You’ll Get (if Erisfy Were Real)"
        features={[
          {
            title: 'Instant Chaos Management',
            description:
              'Tame the wildest data with a trading dashboard that practically doesn’t exist.',
            icon: <Rocket className="text-red-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Effortless UI Magic',
            description:
              'ShadCN/UI ensures your hypothetical fintech app is so beautiful, it might even bring Zeus to tears.',
            icon: <Palette className="text-blue-500" />,
            className:
              'hover:shadow-lg hover:scale-105 transition-transform duration-300',
          },
          {
            title: 'Data, Gloriously Imagined',
            description:
              'Real-time updates on the markets that matter—if you believe in them enough.',
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
        variant="light" //
        title="Experience It Yourself"
        description="Click below to enter a world where Erisfy exists—and where every trade you make is smarter, faster, and powered by AI-fueled chaos.
Just kidding. But do check out the demo."
        buttonText="Try the Demo"
        buttonAction={() => navigate('/home')}
        data-testid="demo-section"
      />
      <CTASection
        variant="dark"
        title="Join the Community"
        description="Become part of the Erisfy family, where ideas flow freely, trading is smarter, and we all agree this product doesn’t actually exist."
        buttonText="Contribute on GitHub"
        buttonAction={() =>
          window.open('https://github.com/CambridgeMonorail/erisfy', '_blank')
        }
        data-testid="community-section"
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
          {
            text: 'Documentation',
            url: 'https://github.com/CambridgeMonorail/erisfy',
          },
          {
            text: 'Community',
            url: 'https://discord.com/invite/your-discord-invite',
          },
          {
            text: 'GitHub',
            url: 'https://github.com/CambridgeMonorail/erisfy',
          },
        ]}
        socialMediaIcons={[
          {
            icon: (props) => <Github {...props} />,
            url: 'https://github.com/CambridgeMonorail/erisfy',
          },
          {
            icon: (props) => <Twitter {...props} />,
            url: 'https://x.com/TimDMorris',
          },
        ]}
        copyrightText="&copy; 2024 Erisfy. All rights reserved."
        data-testid="footer"
      />
    </div>
  );
};
