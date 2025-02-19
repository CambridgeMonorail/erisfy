# Erisfy Server API

This is the backend server for Erisfy, providing market news and analysis through various API endpoints.

## API Endpoints

### Market News Endpoints

Base path: `/market-news`

#### Get Latest Market News
- **GET** `/market-news`
- Returns the most recent market data record with associated stories
- Response structure:
  ```typescript
  {
    id: string;
    date: string;
    createdAt: string;
    stories: {
      id: string;
      title: string;
      one_line_summary: string;
      whats_happening: string;
      market_impact: string;
      market_sector: string;
      marketDataRecordId: string;
    }[];
  }
  ```

#### Trigger News Update
- **GET** `/market-news/trigger`
- Manually triggers the market news fetch process
- Response:
  ```typescript
  {
    message: string; // 'Market news update triggered'
  }
  ```

### Background Jobs

The server includes automated tasks:

- Daily Market News Fetch
  - Runs automatically at 08:00 UTC every day
  - Fetches latest market stories using OpenAI
  - Stores the data in the database

## Development

### Prerequisites
- Node.js
- pnpm
- PostgreSQL database
- OpenAI API key

### Environment Variables
Make sure to set up the following environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key

### Running the Server
```bash
# Install dependencies
pnpm install

# Start the development server
pnpm nx serve server
```

### Error Responses
The API may return the following HTTP status codes:
- `200` - Success
- `404` - No market news data found
- `500` - Internal server error (e.g., database connection issues, OpenAI API errors)
