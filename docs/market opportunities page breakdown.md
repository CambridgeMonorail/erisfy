# Market Opportunities Page - Component Breakdown

## 1️⃣ Page Regions & Contents

| Region                                | Purpose                                                                 | Key Components (Child Components)                                                                 |
|---------------------------------------|-------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------|
| Header (Top Navigation)               | Provides branding, navigation, and search.                              | TopNavBar, SearchBar                                                                              |
| AI-Powered Market Overview (Hero Section) | Displays top-level insights, market trends, and index charts.            | MarketSummaryCard, TrendingStocksList, SectorPerformanceHeatmap, QuickChartToggle                 |
| AI-Driven Opportunity Discovery       | Suggests AI-generated or predefined stock screening opportunities.       | OpportunityCards, AI-GeneratedFiltersButton, ViewMoreOpportunitiesLink                            |
| Main Workspace (Customizable Data Area) | Displays stock data in different views (list, grid, heatmap).            | DataViewToggle, StockInsightsPanel, ComparisonModePanel                                           |
| Quick Actions Toolbar                 | Provides fast access to saved filters, alerts, and AI chat.              | SavedFiltersDropdown, CreateAlertButton, AIChatAssistant                                          |
| Market Sentiment & News Feed          | AI-generated stock news summaries and sentiment-based categorization.    | NewsSummaryCard, SentimentTags, CustomWatchlistNewsFeed                                           |
| Footer: Learning & Community Resources | Links to educational content and community discussions.                  | QuickLinks, UpgradeCTA                                                                            |

## 2️⃣ Component Placement Within Regions

This outlines where each component sits and what it does.

### 📍 Header (Top Navigation)

- **TopNavBar** → Main site navigation.
- **SearchBar** → Users can search for stocks, sectors, or insights.

### 📍 AI-Powered Market Overview (Hero Section)

- **MarketSummaryCard (Left)** → Displays AI-generated 3-5 key market insights.
- **TrendingStocksList (Left)** → Shows Top 3 gainers, losers, and most active stocks.
- **SectorPerformanceHeatmap (Right)** → Displays sector performance trends.
- **QuickChartToggle (Right)** → Users can switch between major indices (DOW, NASDAQ, S&P, etc.).

### 📍 AI-Driven Opportunity Discovery

- **OpportunityCards** → Displays AI or predefined stock screening opportunities.
- **AI-GeneratedFiltersButton** → Clicking applies an AI-generated filter and redirects to Filter Selection.
- **ViewMoreOpportunitiesLink** → Expands to reveal more stock screening ideas.

### 📍 Main Workspace (Customizable Data Area)

- **DataViewToggle (Top)** → Lets users switch between List View, Grid View, or Heatmap.
- **StockInsightsPanel (Left)** → Clicking a stock shows AI-generated insights.
- **ComparisonModePanel (Right)** → Users can compare stocks side-by-side.

### 📍 Quick Actions Toolbar (Floating Sidebar)

- **SavedFiltersDropdown** → Quick access to previously saved filters.
- **CreateAlertButton** → Users can set alerts for price changes, volume spikes, etc.
- **AIChatAssistant** → Conversational search that helps users find stocks using natural language.

### 📍 Market Sentiment & News Feed

- **NewsSummaryCard** → AI-generated summary of key stock market news.
- **SentimentTags** → Categorizes news into Bullish 🟢, Bearish 🔴, or Neutral ⚪.
- **CustomWatchlistNewsFeed** → News feed filtered by user’s watchlist stocks.

### 📍 Footer: Learning & Community Resources

- **QuickLinks** → Directs users to Glossary, Tutorials, Community Forum.
- **UpgradeCTA** → Subtle prompt for premium features.

## 3️⃣ Summary of Developer Implementation Plan

### Header Section

- Implement TopNavBar and SearchBar.

### Hero Section: AI-Powered Market Overview

- Fetch AI market insights for MarketSummaryCard.
- Populate TrendingStocksList, SectorPerformanceHeatmap, and QuickChartToggle.

### AI-Driven Opportunity Discovery

- Generate OpportunityCards based on trends & heuristics.
- Ensure AI-GeneratedFiltersButton links to Filter Selection with preloaded filters.

### Main Workspace

- Implement DataViewToggle to switch views.
- Add clickable stocks to StockInsightsPanel.
- Enable stock comparisons in ComparisonModePanel.

### Quick Actions Toolbar

- Implement SavedFiltersDropdown, CreateAlertButton, and AIChatAssistant.

### Market Sentiment & News Feed

- Fetch real-time news for NewsSummaryCard.
- Apply SentimentTags based on AI classification.
- Filter CustomWatchlistNewsFeed based on user preferences.

### Footer

- Provide quick access to educational resources.
- Display optional upgrade CTA for premium features.

![Market Opportunities Page Wireframe](docs/images/market opportunities page wireframe.png)
