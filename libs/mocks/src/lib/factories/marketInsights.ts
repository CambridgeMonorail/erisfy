import { faker } from '@faker-js/faker';
import { MarketDataInsights, MarketStory, MarketSector } from '@erisfy/api';

// Sample realistic market stories for mock data
const realisticMarketStories = [
  {
    title: "S&P 500 hit with weekly loss after renewed tariff jitters",
    one_line_summary: "Renewed tariff concerns lead to S&P 500 weekly loss",
    whats_happening: "Renewed tariff concerns in the U.S. stock market have caused the S&P 500 to experience a weekly loss.",
    market_impact: "Negative impact on stock market",
    market_sector: "Overall stock market"
  },
  {
    title: "Yields on U.S. government debt mixed after lower private-sector job creation",
    one_line_summary: "Mixed yields on U.S. government debt due to lower private-sector job creation",
    whats_happening: "Yields on U.S. government debt are mixed following data showing fewer private-sector jobs created than expected.",
    market_impact: "Impact on bond market",
    market_sector: "Bond market"
  },
  {
    title: "Ford's stock performance at its worst in 4 years",
    one_line_summary: "Ford's stock shows worst performance in 4 years",
    whats_happening: "Ford's stock is experiencing its worst showing in four years.",
    market_impact: "Negative impact on Ford's stock",
    market_sector: "Automotive sector"
  },
  {
    title: "Impact of Trump tariffs on moving markets",
    one_line_summary: "Trump tariffs influencing market movements",
    whats_happening: "Trump tariffs are affecting market movements, prompting investors to stay informed.",
    market_impact: "Influence on various market sectors",
    market_sector: "Multiple sectors"
  },
  {
    title: "U.S. Stock Market Headlines",
    one_line_summary: "Positive movement in U.S. stock markets",
    whats_happening: "Positive movements observed in various U.S. stock market indices.",
    market_impact: "Positive impact on U.S. stock market",
    market_sector: "Overall U.S. stock market"
  },
  {
    title: "Tech stocks rally on AI advancements",
    one_line_summary: "Technology sector sees gains driven by AI developments",
    whats_happening: "Technology stocks are rallying as companies announce breakthroughs in artificial intelligence.",
    market_impact: "Positive impact on tech sector",
    market_sector: "Information Technology"
  },
  {
    title: "Healthcare stocks dip amid regulatory uncertainty",
    one_line_summary: "Healthcare sector faces pressure from potential policy changes",
    whats_happening: "Healthcare stocks are experiencing a downturn as investors react to potential regulatory changes.",
    market_impact: "Negative impact on healthcare industry",
    market_sector: "Healthcare"
  },
  {
    title: "Energy sector struggles as oil prices fall",
    one_line_summary: "Energy companies face headwinds from declining oil prices",
    whats_happening: "Energy sector stocks are declining as global oil prices continue to fall due to oversupply concerns.",
    market_impact: "Negative impact on energy companies",
    market_sector: "Energy"
  }
];

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

const generateDate = (date?: string): string => {
  if (date) return date;

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
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

/**
 * Creates a market data insights record with realistic stories.
 *
 * @param override - Optional partial object to override default values
 * @param useRealisticStories - When true, uses predefined realistic stories instead of generating random ones
 * @returns A complete MarketDataInsights object
 */
export const createMarketDataInsights = (
  override?: Partial<MarketDataInsights>,
  useRealisticStories = true
): MarketDataInsights => {
  const recordId = crypto.randomUUID();
  const currentDate = override?.date || generateDate();
  const timestamp = new Date().toISOString();

  let stories;
  if (useRealisticStories) {
    // Select 5 random stories from our realistic stories array
    const shuffledStories = [...realisticMarketStories]
      .sort(() => 0.5 - Math.random())
      .slice(0, 5);

    stories = shuffledStories.map(story => ({
      id: crypto.randomUUID(),
      title: story.title,
      one_line_summary: story.one_line_summary,
      whats_happening: story.whats_happening,
      market_impact: story.market_impact,
      market_sector: story.market_sector,
      marketDataRecordId: recordId,
      createdAt: timestamp,
      updatedAt: timestamp
    }));
  } else {
    // Use the original faker-based story generation
    const selectedSectors = faker.helpers.arrayElements(marketSectors, 5);
    stories = selectedSectors.map(sector => ({
      id: crypto.randomUUID(),
      ...createMarketStory(sector),
      marketDataRecordId: recordId,
      createdAt: timestamp,
      updatedAt: timestamp
    }));
  }

  return {
    id: recordId,
    date: currentDate,
    createdAt: timestamp,
    updatedAt: timestamp,
    stories,
    ...override
  };
};

/**
 * Creates an array of market insights for different dates
 *
 * @param count - Number of records to create
 * @param baseDate - Optional base date to start from (will create records for consecutive days)
 * @returns Array of MarketDataInsights objects
 */
export const createMarketDataInsightsArray = (
  count = 1,
  baseDate?: string
): MarketDataInsights[] => {
  const results: MarketDataInsights[] = [];

  for (let i = 0; i < count; i++) {
    // If a base date is provided, create sequential dates
    let date: string | undefined = undefined;
    if (baseDate) {
      const baseDateObj = new Date(baseDate);
      baseDateObj.setDate(baseDateObj.getDate() - i);
      date = baseDateObj.toISOString().split('T')[0];
    }

    results.push(createMarketDataInsights({ date }));
  }

  return results;
};
