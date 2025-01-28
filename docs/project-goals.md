# Erosfy Project Goals

## Overview

This document outlines the goals for an **exploration of building a FinTech UI** using [Shadcn components](https://ui.shadcn.com/) in a **React Single-Page Application (SPA)**. The primary focus is to develop a **user-centric stock screener** that integrates **advanced AI capabilities** to streamline fundamental analysis, filtering, and personalized insights.

## Background

Through our discussions, we identified multiple **pain points** in traditional stock screening:

- **Overwhelming Metrics**: Users struggle to pick from dozens of ratios and fundamental data points.  
- **Analysis Paralysis**: Even after selecting filters, large result sets make it hard to pinpoint top picks.  
- **Lack of Forward-Looking Insights**: Most screeners rely on static, historical data and ignore real-time catalysts or sentiment.  
- **Difficulty Incorporating Intangibles**: Factors like management quality or brand perception are rarely captured by numeric filters.  
- **Limited Personalization**: Generic filters do not adjust to different investor styles, risk profiles, or market conditions.

After conducting **competitor analysis** of existing platforms with customizable fundamental scoring and comprehensive screening features, we identified these potential strategies:

- **Rule Types for Scoring**: Custom scoring models leveraging criteria like static ranges, historical comparisons, metric comparisons, growth rates over time, etc.  
- **Extensive Filter Library**: Covering hundreds of financial metrics, grouped for easy exploration.  
- **User-Friendly Score Building**: Letting investors combine and weight multiple rules into personalized scoring models.

**Key Architecture Considerations**:

1. **Public Landing Page** (pre-login marketing, CTAs).  
2. **Authentication & Onboarding** (capture user style, preferences).  
3. **Main Dashboard** (user-specific quick picks, market overview).  
4. **Screener** (advanced filters, integrated scoring models, watchlist actions).  
5. **Watchlist** (monitor selected stocks, receive alerts).  
6. **Stock Detail View** (deep dives, AI score breakdown, news sentiment).  
7. **Advanced Features** (clustering, scenario analysis, personalized scoring model builder).  
8. **UI Polishing & Extended Tools** (responsive design, richer visualizations, mobile support).

## Goals

1. **Shadcn-Driven UI**  
   - Leverage Shadcn’s React component library for a clean, modern interface.  
   - Ensure a cohesive design system that promotes consistency and easy theming.

2. **Comprehensive & Customizable Stock Screener**  
   - Offer an extensive library of metrics with category-based organization.  
   - Implement **custom scoring models**:  
     - **Static Range** (e.g., P/E < 15).  
     - **Historical Range** (compare current value to past 3-year average).  
     - **Metrics Comparison** (ROE vs. Debt/Equity).  
     - **Change Over Time** (EPS growth over 5 years).  
     - **Max Decline** (largest drop in revenue or EPS).

3. **Personalized Filter & Recommendation Engine**  
   - Use onboarding inputs (risk tolerance, style, sectors) to **auto-suggest** relevant filters.  
   - Allow iterative refinement based on user interactions (previous filters, watchlist behavior).

4. **AI & Advanced Insights**  
   - **Sentiment Analysis**: Integrate headlines and social data to surface qualitative factors.  
   - **Cluster & Compare**: Group similar stocks by fundamentals, highlight outliers.  
   - **Scenario Modeling**: Prompt “what-if” analyses (interest rates, macro changes).

5. **Usability & Clarity**  
   - Provide **tooltips** and **explanatory hints** for advanced features.  
   - Maintain **intuitive workflows**: easy switching between screener, watchlist, scoring models.  
   - Ensure **responsive design** for desktop, tablet, and mobile.

6. **Iterative Growth**  
   - Build **minimum viable** versions of each feature for feedback.  
   - Gradually refine & expand, incorporating user testing results and performance data.

## Expected Outcomes

By weaving **customizable scoring** and **comprehensive filters** into a **Shadcn-based React SPA**, we aim to deliver a **powerful** yet **intuitive** stock screening solution that:

- Empowers users to craft **personalized** fundamental analysis rules.  
- Adapts quickly to changing market conditions through **AI-driven insights**.  
- Reduces **analysis paralysis** with clear scoring, filtering, and summarization tools.  
- Provides a **visually appealing**, **smooth** user experience aligned with modern best practices.
