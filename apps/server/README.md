# Erisfy Server API

This document provides comprehensive documentation for the Erisfy backend server, which handles market news analysis and data processing. It includes setup instructions, API documentation, development guidelines, and troubleshooting information.

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
   - [Market News Endpoints](#market-news-endpoints)
   - [Background Jobs](#background-jobs)
3. [Development](#development)
   - [Prerequisites](#prerequisites)
   - [Environment Setup](#environment-variables)
   - [Database Setup](#docker-database-setup)
   - [Running the Server](#running-the-server)
4. [Database Management](#database-management)
   - [Schema Updates](#updating-the-database-schema)
   - [Troubleshooting](#troubleshooting-database-issues)
5. [Testing](#testing)
6. [Error Handling](#error-responses)

## Overview

The Erisfy Server is a NestJS-based backend that:

- Provides REST APIs for market news and analysis
- Manages automated data collection from various sources
- Processes and stores market data using PostgreSQL
- Integrates with OpenAI for market analysis
- Runs scheduled background jobs for data updates

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
    }
    [];
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

- Node.js v20.14.0 (or higher)
- pnpm v9.15.0 (or higher)
- Docker Desktop

### Environment Variables

Create a `.env.development` file in the server directory by copying `.env.example`:

```sh
cp .env.example .env.development
```

Required environment variables:

- `DATABASE_URL` - PostgreSQL connection string
- `OPENAI_API_KEY` - Your OpenAI API key
- `PORT` - Server port (defaults to 3001)
- `NODE_ENV` - Environment (development/production/test)

### Docker Database Setup

The project uses Docker Compose to manage the PostgreSQL database. Configuration is defined in `docker-compose.yml` at the root of the project.

#### Database Configuration

When running locally with Docker, use these database settings in your `.env.development`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erisfydb?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=erisfydb
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
```

#### Starting the Database

1. Start the PostgreSQL container:

   ```sh
   pnpm run serve:docker
   ```

2. For first-time setup, run database migrations:

   ```sh
   nx run server:prisma-migrate
   ```

#### Database Management with Adminer

Adminer is included for database management:

- Access at: <http://localhost:8080>
- System: PostgreSQL
- Server: db
- Username: postgres
- Password: postgres
- Database: erisfydb

#### Troubleshooting Database Issues

1. **Port Conflicts**:
   - Check for running PostgreSQL instances: `docker ps`
   - Stop conflicting services or modify port in docker-compose.yml

2. **Container Issues**:
   - Verify Docker Desktop is running
   - Check logs: `docker-compose logs db`
   - Try removing container: `docker-compose down`
   - For fresh start: `docker-compose down -v`

### Running the Server

Start the development server:

```bash
pnpm nx serve server
```

The server will be available at <http://localhost:3001/api>

### Database Management

#### Updating the Database Schema

When modifying the Prisma schema:

1. Create and apply new migration:

   ```sh
   pnpm run prisma:migrate
   ```

2. Pull pending changes from DB:

   ```sh
   npx prisma db pull
   ```

3. Update Prisma client:

   ```sh
   npx prisma generate
   ```

**Note**: Nx runs Prisma commands in a non-interactive shell, so you may not be prompted for a migration name. You can work around this by running:
```
npx prisma migrate dev --name your_migration
```
You can also pass the --name argument directly via Nx:
```
nx run server:prisma-migrate -- --name your_migration
```
Consider using a consistent naming format such as `day_of_week_day_month_year` for your migrations.

### Testing

To run server tests:

```bash
# Run all tests
pnpm nx test server

# Run tests in watch mode
pnpm nx test server --watch

# Run specific test file
pnpm nx test server --testFile=path/to/test
```

### Error Responses

The API may return the following HTTP status codes:

- `200` - Success
- `404` - No market news data found
- `500` - Internal server error (e.g., database connection issues, OpenAI API errors)
