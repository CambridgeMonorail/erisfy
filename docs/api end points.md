# Erisfy API Documentation

This document provides a comprehensive overview of all available API endpoints in the Erisfy platform.

## Base URL

- Development: `http://localhost:3001/api`
- Production: `https://api.erisfy.com/api`

## Authentication

Bearer token authentication is required for protected endpoints. Include the token in the Authorization header:

```http
Authorization: Bearer <your-token>
```

## Available Endpoints

### Market Insights (`/market-insights`)

Real-time market news and insights with AI analysis.

#### GET /market-insights

Returns comprehensive market insights with curated analysis.

**Response:**

```json
{
  "id": "string",
  "date": "string",
  "stories": [
    {
      "id": "string",
      "title": "string",
      "one_line_summary": "string",
      "whats_happening": "string",
      "market_impact": "string",
      "market_sector": "string"
    }
  ]
}
```

#### GET /market-insights/latest

Returns the most recent market data record with curated stories.

**Response:**

```json
{
  "id": "string",           // Unique identifier for the market insights record
  "date": "string",        // ISO 8601 timestamp of when the insights were generated
  "stories": [             // Array of market stories and their analysis
    {
      "id": "string",      // Unique identifier for the story
      "title": "string",   // Story headline
      "one_line_summary": "string",  // Concise summary of the story
      "whats_happening": "string",   // Detailed explanation of the event
      "market_impact": "string",     // Analysis of potential market implications
      "market_sector": "string"      // Affected market sector
    }
  ]
}
```

**Notes:**

- The `date` field uses ISO 8601 format (e.g., "2025-03-13T17:41:18.423Z")
- Stories are ordered by relevance and impact
- Empty stories array indicates no current market stories
- Market sectors align with standard industry classification

#### GET /market-insights/trigger

Manually triggers the market news curation pipeline.

### News Analysis (`/news-analysis`)

Advanced AI-powered financial news analysis using LangGraph.

#### POST /news-analysis/analyze

Multi-agent AI news analysis pipeline.

**Request Body:**

```json
{
  "query": "string",
  "tickers": ["string"],
  "bypassCache": boolean
}
```

#### GET /news-analysis/market-sentiment

Latest AI-powered market sentiment analysis.

**Response:**

```json
{
  "structuredAnalysis": {
    "analysis": "string",         // Natural language analysis of market conditions
    "sectors": ["string"],        // Array of affected market sectors
    "marketSentiment": "string",  // Overall market sentiment (positive/negative/neutral)
    "tickers": ["string"]         // Array of mentioned stock tickers
  },
  "sentiment": "string",          // Overall sentiment (positive/negative/neutral)
  "stockInfoMap": {              // Map of ticker symbols to their market data
    "[ticker]": {
      "ticker": "string",        // Stock ticker symbol
      "price": number,          // Current stock price
      "dayChange": number,      // Price change for the day
      "dayChangePercent": number, // Percentage price change for the day
      "marketCap": number,      // Market capitalization
      "time": "string",         // ISO timestamp of the data
      "error": "string"         // Optional error message if data fetch failed
    }
  },
  "stockInfo": {                // Single stock information (typically first analyzed stock)
    "ticker": "string",
    "price": number,
    "dayChange": number,
    "dayChangePercent": number,
    "marketCap": number,
    "time": "string",
    "error": "string"
  }
}
```

**Notes:**

- `stockInfoMap` contains real-time market data for all mentioned tickers
- Invalid tickers will have error messages and zero values
- Times are in ISO 8601 format
- Market cap is in USD
- Price changes are in the stock's trading currency

### POST /news-analysis/clear-cache

Clears cached news analysis results from the last 2 hours.

### Basic News Analysis (`/basic-news-analysis`)

Simple sentiment and topic extraction from news content.

#### POST /basic-news-analysis/analyze

Basic sentiment analysis of text content.

**Request Body:**

```json
{
  "content": "string"
}
```

#### GET /basic-news-analysis/history

Get historical basic analysis results.

**Query Parameters:**

- `limit`: Maximum number of records to return (default: 10)

### OpenAI Integration (`/openai`)

Direct GPT-powered analysis endpoints.

#### GET /openai/market-stories

GPT-analyzed market stories.

#### POST /openai/prompt

Send a custom prompt to OpenAI.

#### POST /openai/analyze

Analyze content using OpenAI.

#### POST /openai/news-analysis

Direct GPT news analysis.

#### POST /openai/news-analysis/structured

GPT-4 analysis with structured JSON output.

### Stock Data (`/stock-data`)

Financial market data endpoints.

#### GET /stock-data/{ticker}

Returns real-time stock data for a specified ticker symbol.

#### GET /stock-data

Search stock data from query.

**Query Parameters:**

- `query`: Text query to extract ticker from

### Tavily Search (`/tavily`)

Financial information search and research.

#### POST /tavily/search

Search for financial market information.

**Request Body:**

```json
{
  "query": "string",
  "search_depth": "basic" | "advanced",
  "include_answer": boolean,
  "include_domains": ["string"],
  "max_results": number
}
```

### User Onboarding (`/onboardings`)

User onboarding workflow management.

#### GET /onboardings

Get all onboarding records.

**Query Parameters:**

- `userId`: Filter by user ID
- `hasViewed`: Filter by viewed status

#### GET /onboardings/{id}

Get single onboarding record.

#### POST /onboardings

Create onboarding record.

#### PATCH /onboardings/{id}

Update onboarding record.

#### DELETE /onboardings/{id}

Delete onboarding record.

## Error Responses

All endpoints may return the following error responses:

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Resource not found",
  "error": "Not Found"
}
```

### 500 Internal Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error occurred",
  "error": "Internal Server Error"
}
```

## Rate Limiting

API endpoints are subject to rate limiting to prevent abuse. Current limits:

- 100 requests per minute per IP address
- 1000 requests per hour per API key

## Additional Notes

- All endpoints return JSON responses
- Timestamps are in ISO 8601 format
- All requests must include `Content-Type: application/json` header
- CORS is enabled for development (`localhost:4200`) and production (`cambridgemonorail.github.io`)
