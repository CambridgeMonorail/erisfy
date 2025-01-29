# Market Opportunities Page – Developer Guide

## 1. Revised Page Flow

Users land on Market Opportunities to explore trending insights, stock movements, and AI-driven suggestions.
They can:

- Manually navigate to Filter Selection to build a filter.
- Click on AI/Predefined opportunities to auto-load relevant filters in Filter Selection.

## 2. Page Structure & Components

### A. AI-Powered Market Overview (Dynamic Insights Panel)

**Position:** Top Section (Hero area)  
**Layout:** Grid-based

#### Components

- **MarketSummaryCard** – AI-driven summary (Top 3-5 insights)
- **TrendingStocksList** – Biggest gainers/losers, most active
- **SectorPerformanceHeatmap** – Quick market movement snapshot
- **QuickChartToggle** – Interactive index charts

#### Developer Notes

- AI-generated summaries should be fetch-on-load.
- The TrendingStocksList should update in real-time.

### B. AI-Driven Opportunity Identification

**Position:** Below Market Overview  
**Layout:** Card-based, horizontally scrollable

#### Components

- **OpportunityCards** – Predefined stock screening suggestions  
  Example: “High-growth undervalued stocks,” “Dividend leaders,” “Tech stocks rebounding”
- **AI-GeneratedFiltersButton** – When clicked, navigates user to Filter Selection with relevant criteria pre-loaded.
- **ViewMoreOpportunitiesLink** – Expands to show more AI-recommended screens.

#### Developer Notes

- AI-generated opportunities should be clickable to pre-load filters in the Filter Selection page.

### C. Main Workspace (Customizable Data Area)

**Position:** Center – Main Interactive Area  
**Layout:** Switchable Views

#### Components

- **DataViewToggle** – Switch between:
  - Simple List View (Stock table)
  - Grid View (Card-based layout)
  - Heatmap View (Performance overview)
- **StockInsightsPanel** – Clicking a stock provides a quick AI summary on movement.
- **ComparisonModePanel** – Side-by-side stock comparisons.

#### Developer Notes

- Implement drag-and-drop reordering for custom layouts.
- Support lazy-loading for large data sets.

### D. Quick Actions Toolbar

**Position:** Floating Right Panel (or Top Toolbar on Mobile)  
**Layout:** Minimalist buttons/icons

#### Components

- **SavedFiltersDropdown** – Quick access to previous searches.
- **CreateAlertButton** – Users can set price/volume alerts.
- **AIChatAssistant** – Conversational search for quick stock queries.

#### Developer Notes

- AI Chat should be floating for mobile.
- Alerts should support email/push notifications.

### E. Market Sentiment & News Feed

**Position:** Below AI-Driven Opportunities  
**Layout:** List-based with sentiment tags

#### Components

- **NewsSummaryCard** – AI-summarized news.
- **SentimentTags** (🟢 Bullish, 🔴 Bearish, ⚪ Neutral).
- **CustomWatchlistNewsFeed** – News filtered for user’s watchlist stocks.

#### Developer Notes

- Use real-time API feeds for stock news.
- AI should summarize key takeaways.

### F. Footer: Learning & Community Resources

**Position:** Fixed Footer  
**Layout:** Grid-based quick links.

#### Components

- **QuickLinks** – Glossary, Tutorials, Community Forum
- **UpgradeCTA** – Subtle prompt for premium features.

#### Developer Notes

- No aggressive pop-ups—CTA should be subtle.

## 3. AI-Generated Opportunities: Linking to Filter Selection

**How AI-Generated Opportunities Work:**

- AI identifies stock screening opportunities based on trends, earnings, and market movements.
- These opportunities are displayed as cards with a "Use This Filter" button.
- Clicking the button navigates the user to Filter Selection with relevant filters pre-loaded.

#### Example AI-Suggested Screens

- “📈 Growth Stocks Beating Earnings 📊” → Loads EPS growth & revenue filters.
- “💰 High-Dividend Yield Stocks 💵” → Loads Dividend & Payout Ratio filters.
- “🚀 Breakout Stocks 📊” → Loads RSI & Moving Average filters.

## 4. API & Data Requirements

**Data Sources Needed:**

- Stock Data – Prices, volume, indicators (via Finnhub, Alpha Vantage)
- Market Trends – Aggregated insights (via Yahoo Finance API)
- AI Insights – GPT-generated summaries (server-side AI processing)
- News Data – Summarized headlines (via financial news APIs)
- User Data – Watchlists, saved filters (stored in Firebase/PostgreSQL)

## 5. Key Differentiators Over Finviz

- **AI-Powered Opportunity Discovery** – Intelligent stock screening suggestions.
- **Market-Driven, Not Just Filters** – Users start with trends and insights rather than raw filters.
- **Click-to-Filter Workflow** – AI helps define filters before users reach the Filter Selection page.
- **Smart Summaries** – AI-driven market insights & stock movement explanations.
