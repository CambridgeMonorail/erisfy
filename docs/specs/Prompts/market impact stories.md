# LLM Query

Below is a query we use with an LLM to understand and automate a value investing system. This query includes technical requirements, system checks, data sources, scheduling, reporting, and a list of outstanding questions to clarify before implementation.

---------

Identify the five biggest news stories today that are likely to impact the financial markets and the price of stocks, either positively or negatively. Then structure that data as json using the following data structures:

// Define the allowed market sectors as a union type type
MarketSector = | "Energy" | "Materials" | "Industrials" | "Utilities" | "Healthcare" | "Financials" | "Consumer Discretionary" | "Consumer Staples" | "Information Technology" | "Communication Services" | "Real Estate";
// Define a type for an individual market story
interface MarketStory { title: string; one_line_summary: string; whats_happening: string; market_impact: string; market_sector: MarketSector; }
// Define the overall data structure containing an array of stories, including a date field
interface MarketData { date: string; // e.g., "2025-02-03" stories: MarketStory[]; }

## Integration with Nx Monorepo

This document will be referenced in our Nx workspace to guide automation tasks and data structures relevant to market impact stories. Further steps include integrating these structures with our React SPA and TS-based API clients.
