import { createElement } from 'react';
import { SidebarConfiguration } from '../types/sidebarTypes';
import {
  Swords,
  AudioWaveform,
  SquareTerminal,
  Landmark,
  Wallet,
} from 'lucide-react';
import { Logo } from '@erisfy/shadcnui-blocks';

import { LandingPage } from '../pages/landing/Landing';
import { AboutPage } from '../pages/about/About';
import { BlogPage } from '../pages/blog/Blog';
import { IndividualBlogPostPage } from '../pages/blog/IndividualBlogPost';
import { ColorPalettePage } from '../pages/color-palette/ColorPalette';
import { ContactPage } from '../pages/contact/Contact';
import { FAQPage } from '../pages/faq/FAQ';
import { FeaturesPage } from '../pages/features/Features';
import { LibraryPage } from '../pages/library/Library';
import { NotFound } from '../pages/not-found/NotFound';
import { PricingPage } from '../pages/pricing/Pricing';
import { StatusBoardPage } from '../pages/status-board/StatusBoard';
import { TermsAndConditionsPage } from '../pages/terms-and-conditions/TermsAndConditions';
import { ScreenerResultsPage } from '../pages/screener-results/ScreenerResults';
import { StockDetailPage } from '../pages/stock-detail/StockDetail';
import { FilterSelectionScreen } from '../pages/filter-selection/FilterSelectionScreen';
import { MarketOpportunitiesPage } from '../pages/market-opportunities/MarketOpportunities';
import { OnboardingFlow } from '../pages/onboarding/OnboardingFlow';
import { PortfolioPage } from '../pages/portfolio/Portfolio';
import { MenuItem, MenubarLayout } from '@erisfy/shell';

/**
 * Object containing all the paths used in the application.
 */
const paths = {
  landing: '/',
  about: '/about',
  blog: '/blog',
  blogPost: '/blog/:postId',
  contact: '/contact',
  dashboard: '/dashboard',
  faq: '/faq',
  features: '/features',
  home: '/home',
  pricing: '/pricing',
  statusBoard: '/status-board',
  termsAndConditions: '/terms-and-conditions',
  portfolio: '/portfolio',
  components: {
    colorPalette: '/color-palette',
    library: '/library',
  },
  screener: {
    marketOpportunities: '/screener/market-opportunities',
    filterSelection: '/screener/filter-selection',
    results: '/screener/results',
    stockDetail: '/screener/stock-detail/:ticker',
    onboardingFlow: '/screener/onboarding-flow', // P701d
  },
  notFound: '*',
};

/**
 * Configuration for the sidebar, including user information, teams, and navigation items.
 */
const sidebarData: SidebarConfiguration = {
  user: {
    name: 'erisfy',
    email: 'm@example.com',
    avatar: 'erisfy/assets/images/avatars/avatar.jpg',
  },
  teams: [
    {
      name: 'erisfy',
      logo: Swords,
      plan: 'Enterprise',
    },
    {
      name: 'erisfy Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navMain: [
    {
      title: 'Screener',
      url: paths.screener.results,
      icon: Landmark,
      items: [
        { title: 'Smart Start', url: paths.screener.onboardingFlow },
        {
          title: 'Market Opportunities',
          url: paths.screener.marketOpportunities,
        },
        { title: 'Filter Selection', url: paths.screener.filterSelection },
        { title: 'Screener Results', url: paths.screener.results },
        { title: 'Stock Detail', url: paths.screener.stockDetail },
      ],
    },
    {
      title: 'Portfolio',
      url: paths.portfolio,
      icon: Wallet,
      items: [
        { title: 'Overview', url: paths.portfolio },
        // Future portfolio-related pages can be added here
      ],
    },
    {
      title: 'Work in Progress',
      url: paths.about,
      icon: SquareTerminal,
      items: [
        {
          title: 'Sample Pages',
          url: paths.about,
          items: [
            { title: 'Landing', url: paths.landing },
            { title: 'Dashboard', url: paths.dashboard },
            { title: 'About', url: paths.about },
            { title: 'Features', url: paths.features },
            { title: 'Pricing', url: paths.pricing },
            { title: 'FAQ', url: paths.faq },
            { title: 'Contact', url: paths.contact },
            { title: 'Blog', url: paths.blog },
            { title: 'Terms and Conditions', url: paths.termsAndConditions },
            { title: 'StatusBoard', url: paths.statusBoard },
          ],
        },
        {
          title: 'Components',
          url: paths.components.library,
          items: [
            { title: 'Shadcn/ui Components', url: paths.components.library },
            { title: 'Color Palette', url: paths.components.colorPalette },
          ],
        },
      ],
    },
  ],
};

/**
 * Configuration object for navigation, including paths, sidebar data, and routes.
 */
export const navigationConfig = {
  paths,
  sidebarData,
  routes: [] as Array<{ path: string; element: React.ReactElement }>, // Initialize routes as an empty array
  teams: [
    {
      name: 'Erisfy Inc.',
      logo: Swords,
      plan: 'Enterprise',
    },
    {
      name: 'RWOC Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  menuItems: [
    {
      label: 'Screener',
      path: paths.screener.results,
      children: [
        { label: 'Smart Start', path: paths.screener.onboardingFlow }, // P58c2
        {
          label: 'Market Opportunities',
          path: paths.screener.marketOpportunities,
        },
        { label: 'Screening Rules', path: paths.screener.filterSelection },
        { label: 'Screener Results', path: paths.screener.results },
        { label: 'Stock Detail', path: paths.screener.stockDetail },
      ],
    },
    {
      label: 'Portfolio',
      path: paths.portfolio,
      children: [
        { label: 'Overview', path: paths.portfolio },
        // Future portfolio-related pages can be added here
      ],
    },
    {
      label: 'Work in Progress',
      path: paths.about,
      children: [
        {
          label: 'Sample Pages',
          path: paths.about,
          children: [
            { label: 'Landing', path: paths.landing },
            { label: 'Dashboard', path: paths.dashboard },
            { label: 'About', path: paths.about },
            { label: 'Features', path: paths.features },
            { label: 'Pricing', path: paths.pricing },
            { label: 'FAQ', path: paths.faq },
            { label: 'Contact', path: paths.contact },
            { label: 'Blog', path: paths.blog },
            { label: 'Terms and Conditions', path: paths.termsAndConditions },
            { label: 'StatusBoard', path: paths.statusBoard },
          ],
        },
        {
          label: 'Components',
          path: paths.components.library,
          children: [
            { label: 'Shadcn/ui Components', path: paths.components.library },
            { label: 'Color Palette', path: paths.components.colorPalette },
          ],
        },
      ],
    },
  ] as MenuItem[],
  mode: 'header' as 'header' | 'below-header',
};

/**
 * Helper function to create a route object.
 * @param path - The URL path for the route.
 * @param component - The React component to render for the route.
 * @param useLayout - Whether to wrap the component with the MenubarLayout component.
 * @param menuItems - The menu items to pass to the MenubarLayout component.
 * @param mode - The mode to pass to the MenubarLayout component.
 * @param title - The title to pass to the MenubarLayout component.
 * @param LogoIcon - The logo icon component to pass to the MenubarLayout component.
 * @returns The route object.
 */
const createRoute = (
  path: string,
  component: React.ComponentType,
  useLayout = true,
  menuItems: MenuItem[] = navigationConfig.menuItems,
  mode = navigationConfig.mode,
  title = 'ERISFY',
  LogoIcon: React.ComponentType = Landmark,
) => {
  return useLayout
    ? {
        path,
        element: createElement(MenubarLayout, {
          menuItems,
          mode,
          title,
          logoIcon: createElement(Logo, {
            fill: 'currentColor',
            height: '24px',
            name: 'erisfy',
            width: '24px',
          }),
          children: createElement(component),
        }),
      }
    : { path, element: createElement(component) };
};

/**
 * Array of route objects for the application.
 */
navigationConfig.routes = [
  createRoute(paths.landing, LandingPage, false),
  createRoute(paths.about, AboutPage),
  createRoute(paths.blog, BlogPage),
  createRoute(paths.blogPost, IndividualBlogPostPage),
  createRoute(paths.components.colorPalette, ColorPalettePage),
  createRoute(paths.components.library, LibraryPage),
  createRoute(paths.contact, ContactPage),
  createRoute(paths.dashboard, MarketOpportunitiesPage), // Updated to MarketOpportunitiesPage
  createRoute(paths.faq, FAQPage),
  createRoute(paths.features, FeaturesPage),
  createRoute(paths.home, MarketOpportunitiesPage), // Updated to MarketOpportunitiesPage
  createRoute(paths.pricing, PricingPage),
  createRoute(paths.statusBoard, StatusBoardPage),
  createRoute(paths.termsAndConditions, TermsAndConditionsPage),
  createRoute(paths.portfolio, PortfolioPage),
  createRoute(paths.screener.results, ScreenerResultsPage),
  createRoute(paths.screener.stockDetail, StockDetailPage),
  createRoute(paths.screener.filterSelection, FilterSelectionScreen),
  createRoute(paths.screener.marketOpportunities, MarketOpportunitiesPage), // Updated to MarketOpportunitiesPage
  createRoute(paths.screener.onboardingFlow, OnboardingFlow), // Pca97
  createRoute(paths.notFound, NotFound, false),
] as Array<{ path: string; element: React.ReactElement }>;

export default navigationConfig;
