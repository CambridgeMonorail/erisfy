import { createElement, lazy } from 'react';
import { SidebarConfiguration } from '../types/sidebarTypes';
import {
  Swords,
  AudioWaveform,
  SquareTerminal,
  Landmark,
  Wallet,
  Settings,
} from 'lucide-react';
import { Logo } from '@erisfy/shadcnui-blocks';
import { MenuItem, MenubarLayout } from '@erisfy/shell';

// Lazy load all page components with named exports
const LandingPage = lazy(() => import('../pages/landing/Landing').then(m => ({ default: m.LandingPage })));
const AboutPage = lazy(() => import('../pages/about/About').then(m => ({ default: m.AboutPage })));
const BlogPage = lazy(() => import('../pages/blog/Blog').then(m => ({ default: m.BlogPage })));
const IndividualBlogPostPage = lazy(() => import('../pages/blog/IndividualBlogPost').then(m => ({ default: m.IndividualBlogPostPage })));
const ColorPalettePage = lazy(() => import('../pages/color-palette/ColorPalette').then(m => ({ default: m.ColorPalettePage })));
const ContactPage = lazy(() => import('../pages/contact/Contact').then(m => ({ default: m.ContactPage })));
const FAQPage = lazy(() => import('../pages/faq/FAQ').then(m => ({ default: m.FAQPage })));
const FeaturesPage = lazy(() => import('../pages/features/Features').then(m => ({ default: m.FeaturesPage })));
const LibraryPage = lazy(() => import('../pages/library/Library').then(m => ({ default: m.LibraryPage })));
const NotFound = lazy(() => import('../pages/not-found/NotFound').then(m => ({ default: m.NotFound })));
const PricingPage = lazy(() => import('../pages/pricing/Pricing').then(m => ({ default: m.PricingPage })));
const StatusBoardPage = lazy(() => import('../pages/status-board/StatusBoard').then(m => ({ default: m.StatusBoardPage })));
const TermsAndConditionsPage = lazy(() => import('../pages/terms-and-conditions/TermsAndConditions').then(m => ({ default: m.TermsAndConditionsPage })));
const ScreenerResultsPage = lazy(() => import('../pages/screener-results/ScreenerResults').then(m => ({ default: m.ScreenerResultsPage })));
const StockDetailPage = lazy(() => import('../pages/stock-detail/StockDetail').then(m => ({ default: m.StockDetailPage })));
const FilterSelectionScreen = lazy(() => import('../pages/filter-selection/FilterSelectionScreen').then(m => ({ default: m.FilterSelectionScreen })));
const MarketOpportunitiesPage = lazy(() => import('../pages/market-opportunities/MarketOpportunities').then(m => ({ default: m.MarketOpportunitiesPage })));
const OnboardingFlow = lazy(() => import('../pages/onboarding/OnboardingFlow').then(m => ({ default: m.OnboardingFlow })));
const PortfolioPage = lazy(() => import('../pages/portfolio/Portfolio').then(m => ({ default: m.PortfolioPage })));
const SettingsPage = lazy(() => import('../pages/settings/Settings').then(m => ({ default: m.SettingsPage })));

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
  settings: '/settings',
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
      title: 'Settings',
      url: paths.settings,
      icon: Settings,
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
      label: 'Settings',
      path: paths.settings,
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
 * Helper function to create a route object with proper layout wrapping and lazy loading.
 */
const createRoute = (
  path: string,
  Component: React.LazyExoticComponent<React.ComponentType>,
  useLayout = true,
  menuItems: MenuItem[] = navigationConfig.menuItems,
  mode = navigationConfig.mode,
  title = 'ERISFY',
  LogoIcon: React.ComponentType = Landmark,
) => {
  const element = createElement(Component);
  return useLayout
    ? {
        path,
        element: createElement(MenubarLayout, {
          menuItems,
          mode,
          title,
          headerClassName: 'mesh-gradient',
          logoIcon: createElement(Logo, {
            fill: 'currentColor',
            height: '24px',
            name: 'erisfy',
            width: '24px',
          }),
          children: element,
        }),
      }
    : { path, element };
};

// Configure routes with lazy-loaded components
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
  createRoute(paths.settings, SettingsPage),
  createRoute(paths.screener.results, ScreenerResultsPage),
  createRoute(paths.screener.stockDetail, StockDetailPage),
  createRoute(paths.screener.filterSelection, FilterSelectionScreen),
  createRoute(paths.screener.marketOpportunities, MarketOpportunitiesPage), // Updated to MarketOpportunitiesPage
  createRoute(paths.screener.onboardingFlow, OnboardingFlow), // Pca97
  createRoute(paths.notFound, NotFound, false),
] as Array<{ path: string; element: React.ReactElement }>;

export default navigationConfig;
