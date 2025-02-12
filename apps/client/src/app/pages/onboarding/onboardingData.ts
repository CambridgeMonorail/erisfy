import {
  TrendingUp,
  Tag,
  DollarSign,
  Rocket,
  Scale,
  User,
  Shield,
  SlidersHorizontal,
  type LucideIcon,
} from 'lucide-react';

export type InvestmentStyle = {
  title: string;
  description: string;
  criteria: string[];
  icon: LucideIcon;
  value: 'growth' | 'value' | 'dividend' | 'momentum' | 'balanced' | 'experienced';
};

export type RiskTolerance = {
  title: string;
  description: string;
  criteria: string[];
  icon: LucideIcon;
  value: 'conservative' | 'moderate' | 'aggressive' | 'custom';
};

export const investmentStylesData: InvestmentStyle[] = [
  {
    title: 'Growth Investor',
    description: 'For those seeking high-growth stocks with strong future potential.',
    criteria: [
      'High revenue and earnings growth',
      'Strong price momentum',
      'High P/E ratios',
    ],
    icon: TrendingUp,
    value: 'growth',
  },
  {
    title: 'Value Investor',
    description: 'For those who prefer to invest in undervalued stocks with strong fundamentals.',
    criteria: [
      'Low P/E and P/B ratios',
      'Solid balance sheet',
      'High dividend yield',
    ],
    icon: Tag,
    value: 'value',
  },
  {
    title: 'Dividend Investor',
    description: 'For those looking for steady income through high-dividend-paying stocks.',
    criteria: [
      'High dividend yield',
      'Stable earnings',
      'Strong payout ratio',
    ],
    icon: DollarSign,
    value: 'dividend',
  },
  {
    title: 'Momentum Trader',
    description: 'For those who trade based on stock price trends and technical indicators.',
    criteria: [
      'High RSI',
      'Moving average breakouts',
      'Recent strong price performance',
    ],
    icon: Rocket,
    value: 'momentum',
  },
  {
    title: 'Balanced Portfolio',
    description: 'For those who want a diversified approach combining value, growth, and income.',
    criteria: [
      'Mix of growth, value, and dividend stocks',
      'Risk-adjusted returns',
    ],
    icon: Scale,
    value: 'balanced',
  },
  {
    title: "I Know What I'm Doing (Experienced Investor)",
    description: 'Skip guidance and go straight to the full feature set.',
    criteria: ['Direct access to all filters and customization tools'],
    icon: User,
    value: 'experienced',
  },
];

export const riskTolerancesData: RiskTolerance[] = [
  {
    title: 'Conservative Investor (Low Risk)',
    description: 'Prioritizing stability over high returns.',
    criteria: [
      'Focus on low-volatility stocks',
      'Preference for dividend-paying & blue-chip companies',
      'Avoids highly speculative investments',
    ],
    icon: Shield,
    value: 'conservative',
  },
  {
    title: 'Moderate Investor (Medium Risk)',
    description: 'Balancing growth potential with risk management.',
    criteria: [
      'Invests in a mix of stable and growth-oriented stocks',
      'Accepts some volatility for better returns',
      'Diversified portfolio with moderate risk exposure',
    ],
    icon: Scale,
    value: 'moderate',
  },
  {
    title: 'Aggressive Investor (High Risk)',
    description: 'Seeking high returns with higher market exposure.',
    criteria: [
      'Comfortable with market fluctuations & volatility',
      'Invests in growth stocks, emerging markets, and high-risk sectors',
      'Willing to accept short-term losses for long-term gains',
    ],
    icon: Rocket,
    value: 'aggressive',
  },
  {
    title: "I Know What I'm Doing (Custom Risk Level)",
    description: 'Skip guidance and manually configure risk settings.',
    criteria: [
      'Direct access to full customization of risk parameters',
      'Ability to fine-tune portfolio strategy without pre-set options',
    ],
    icon: SlidersHorizontal,
    value: 'custom',
  },
];
