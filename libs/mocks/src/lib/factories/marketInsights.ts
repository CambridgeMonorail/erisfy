import { faker } from '@faker-js/faker';
import { MarketDataInsights, MarketStory, MarketSector } from '@erisfy/api';

const marketSectors: MarketSector[] = [
  "Energy", "Materials", "Industrials", "Utilities", "Healthcare", 
  "Financials", "Consumer Discretionary", "Consumer Staples", 
  "Information Technology", "Communication Services", "Real Estate"
];

const storyTemplates = {
  financial: {
    titles: [
      "Bank of {country} {action} Interest Rates to {rate}%",
      "{bank} Reports {quarter} Quarter Earnings",
      "Financial Markets React to {event}",
    ],
    summaries: [
      "{bank} has {action} its base interest rate from {oldRate}% to {newRate}%, marking a significant shift in monetary policy.",
      "The {index} index {movement} to {value} points, reflecting {sentiment} market sentiment.",
    ]
  },
  economic: {
    titles: [
      "{indicator} {movement} {direction} in {month}",
      "Consumer Confidence {movement} to {value}",
      "GDP Growth {movement} to {rate}% in {quarter}",
    ],
    summaries: [
      "The {country} economy showed {sentiment} signs as {indicator} {movement} to {value}, compared to analysts' expectations.",
      "{indicator} data reveals a {movement} trend, with figures reaching {value}, impacting market outlook.",
    ]
  }
};

const generateNumber = (min: number, max: number, decimals = 1): number => 
  Number(faker.number.float({ min, max, fractionDigits: decimals }).toFixed(decimals));

const generateDate = (): string => {
  const futureDate = faker.date.future();
  const year = futureDate.getFullYear();
  const month = String(futureDate.getMonth() + 1).padStart(2, '0');
  const day = String(futureDate.getDate()).padStart(2, '0');
  console.log('year', year);
  console.log('month', month);
  console.log('day', day);
  return `${year}-${month}-${day}`;
};

const createMarketStory = (sector: MarketSector): MarketStory => {
  const isFinancial = sector === "Financials";
  const templates = isFinancial ? storyTemplates.financial : storyTemplates.economic;
  
  const randomRate = generateNumber(3, 6);
  const randomChange = generateNumber(0.1, 0.5);
  
  const variables = {
    country: faker.location.country(),
    bank: faker.company.name(),
    action: faker.helpers.arrayElement(['raises', 'cuts', 'maintains']),
    rate: randomRate,
    oldRate: randomRate + randomChange,
    newRate: randomRate,
    quarter: faker.helpers.arrayElement(['Q1', 'Q2', 'Q3', 'Q4']),
    event: faker.helpers.arrayElement(['Policy Change', 'Market Volatility', 'Economic Data']),
    indicator: faker.helpers.arrayElement(['GDP', 'Inflation', 'Employment', 'Consumer Spending']),
    movement: faker.helpers.arrayElement(['increased', 'decreased', 'stabilized']),
    direction: faker.helpers.arrayElement(['unexpectedly', 'significantly', 'marginally']),
    month: faker.date.month(),
    value: generateNumber(50, 150),
    sentiment: faker.helpers.arrayElement(['positive', 'negative', 'mixed']),
  };

  const title = faker.helpers.arrayElement(templates.titles)
    .replace(/{(\w+)}/g, (_, key) => String(variables[key as keyof typeof variables]));

  const summary = faker.helpers.arrayElement(templates.summaries)
    .replace(/{(\w+)}/g, (_, key) => String(variables[key as keyof typeof variables]));

  return {
    title,
    one_line_summary: summary,
    whats_happening: faker.lorem.paragraph({ min: 3, max: 5 }),
    market_impact: `This development could ${faker.helpers.arrayElement([
      'positively impact',
      'negatively affect',
      'create opportunities in'
    ])} the ${sector} sector, particularly regarding ${faker.company.catchPhraseAdjective()} ${faker.company.buzzAdjective()} ${faker.company.buzzPhrase()}  .`,
    market_sector: sector
  };
};

export const createMarketDataInsights = (override?: Partial<MarketDataInsights>): MarketDataInsights => {
  const selectedSectors = faker.helpers.arrayElements(marketSectors, 5);
  return {
    date: generateDate(),
    stories: selectedSectors.map(sector => createMarketStory(sector)),
    ...override
  };
};
