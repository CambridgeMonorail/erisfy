[Back to Documentation Overview](./readme.md)

# Implementation Plan

## Table of Contents

1. [Overview](#overview)
2. [Setting Up the Node.js API](#setting-up-the-nodejs-api)
3. [Database (Postgres) & ORM (Sequelize Example)](#database-postgres--orm-sequelize-example)
4. [Scheduling Jobs with node-cron](#scheduling-jobs-with-node-cron)
5. [Front-End (React) Integration](#front-end-react-integration)
6. [Local Development with Docker Compose](#local-development-with-docker-compose)
7. [Deployment to Low-Cost Platforms](#deployment-to-low-cost-platforms)
8. [Future Expansion & Considerations](#future-expansion--considerations)
9. [Summary](#summary)

## Overview

This document outlines the implementation plan for Erisfy, an AI-powered stock screener. The plan includes setting up the front-end using React, the middle layer using Node.js, and the database using PostgreSQL. It also covers local development setup with Docker Compose, deployment strategies, and future expansion considerations.

### React Front End

- Create a single-page application (SPA) using React (e.g., Create React App or Vite).
- Handles user interactions, renders UI, and makes requests to the Node.js API.

### Node.js Middle Layer

- Express (or Fastify) for REST APIs.
- Integrates with third-party APIs (OpenAI, FinancialDatasets.ai).
- Schedules and runs background jobs (end-of-day financial data retrieval, etc.).
- Manages authentication, security, and business logic.

### PostgreSQL Database

- Stores user accounts, financial data (closing prices, metrics), and any AI results.
- Accessible via an ORM (e.g., Sequelize, TypeORM, or Prisma).

### Local Development & Deployment

- Docker Compose for easy local development with a single command.
- Deployment on a low-cost/free tier platform (Railway, Render, Fly.io, etc.).

A simplified architecture diagram:

```text
 ┌─────────────┐         ┌────────────────┐       ┌─────────────────────┐
 │ React       │  <–––>  │ Express Server │ <–––> │ PostgreSQL Database │
 │ (Frontend)  │         │ (Node.js API)  │       └─────────────────────┘
 └─────────────┘         └────────────────┘
     ▲                          │
     │                          │
     ▼                          ▼
    External APIs (OpenAI, financialdatasets.ai)
```

## Setting Up the Node.js API

### Directory Structure (example):

```text
project-root/
  ├─ frontend/               // React app
  ├─ server/
  │   ├─ src/
  │   │   ├─ app.js          // Express app
  │   │   ├─ routes/
  │   │   │   ├─ finance.js  // Finance routes
  │   │   │   ├─ openai.js   // OpenAI routes
  │   │   │   └─ ...
  │   │   ├─ controllers/    // Logic for each route
  │   │   ├─ services/       // Utility / service logic (API calls, DB queries)
  │   │   ├─ models/         // ORM definitions
  │   │   ├─ cron/           // Cron job definitions
  │   │   └─ ...
  │   ├─ package.json
  │   └─ ...
  ├─ docker-compose.yml
  └─ ...
```

### Express Setup

Install dependencies:

```bash
cd server
npm init -y
npm install express cors axios node-cron dotenv pg sequelize
```

(pg + sequelize for Postgres & ORM, axios for external API calls, node-cron for scheduling, dotenv for env vars.)

#### app.js example:

```js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import route modules
const financeRoutes = require('./routes/finance');
const openAIRoutes = require('./routes/openai');

// Register routes
app.use('/api/finance', financeRoutes);
app.use('/api/openai', openAIRoutes);

module.exports = app;
```

#### server.js example (to start the server):

```js
const app = require('./src/app');
const { sequelize } = require('./src/models'); // if using Sequelize

const PORT = process.env.PORT || 3001;

// Sync DB (only in dev, adjust for production migrations)
sequelize.sync({ force: false }).then(() => {
  console.log('Database connected.');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => console.error('DB Connection Error:', err));
```

### Finance Route (Example)

```js
// routes/finance.js
const express = require('express');
const router = express.Router();
const axios = require('axios');

// Example controller/handler for retrieving financial data
router.get('/closing-prices', async (req, res) => {
  try {
    // Suppose financialdatasets.ai has an endpoint for daily close
    // Check docs for exact URL or parameters:
    const apiResponse = await axios.get('https://api.financialdatasets.ai/v1/daily-closing');
    // Process or store data in DB here
    res.json(apiResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching closing prices' });
  }
});

module.exports = router;
```

### OpenAI Route (Example)

```js
// routes/openai.js
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post('/generate', async (req, res) => {
  try {
    const { userPrompt } = req.body;
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: userPrompt,
      max_tokens: 100,
    });
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'OpenAI API error' });
  }
});

module.exports = router;
```

## Database (Postgres) & ORM (Sequelize Example)

Install:

```bash
npm install sequelize pg pg-hstore
```

Initialize Sequelize:

Create a models/index.js file to initialize Sequelize:

```js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});

// Load models here...
// Example: const User = require('./User')(sequelize);
// module.exports = { sequelize, User, ... };

module.exports = { sequelize };
```

Adjust environment variables DB_NAME, DB_USER, DB_PASS, and DB_HOST.

Defining a Model (example for storing daily closes):

```js
// models/DailyClose.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('DailyClose', {
    symbol: { type: DataTypes.STRING, allowNull: false },
    closePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  }, {
    tableName: 'daily_closes',
    timestamps: false,
  });
};
```

Usage:

```js
// models/DailyClose.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('DailyClose', {
    symbol: { type: DataTypes.STRING, allowNull: false },
    closePrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    date: { type: DataTypes.DATEONLY, allowNull: false },
  }, {
    tableName: 'daily_closes',
    timestamps: false,
  });
};
```

## Scheduling Jobs with node-cron

Install:

```bash
npm install node-cron
```

Define cron job in something like src/cron/financeCron.js:

```js
const cron = require('node-cron');
const axios = require('axios');
const { DailyClose } = require('../models');

// Run every weekday at 4:00 PM EST => 21:00 UTC (Mon-Fri: 1-5)
cron.schedule('0 21 * * 1-5', async () => {
  try {
    // 1. Fetch end-of-day data
    const response = await axios.get('https://api.financialdatasets.ai/v1/daily-closing');
    // 2. Parse data (assuming response.data = [ { symbol, closePrice, ... } ])
    const dataArray = response.data;
    // 3. Store in DB
    for (const item of dataArray) {
      await DailyClose.create({
        symbol: item.symbol,
        closePrice: item.closePrice,
        date: new Date().toISOString().slice(0, 10), // or however you manage date
      });
    }
    console.log('Daily close data saved successfully!');
  } catch (error) {
    console.error('Failed to fetch/store daily close data:', error);
  }
}, {
  scheduled: true,
  timezone: 'America/New_York',
});
```

Import or require that cron definition in your main server.js or app.js to initialize it.

## Front-End (React) Integration

### Fetch Data (example snippet in a React component):

```js
import React, { useState, useEffect } from 'react';

function FinanceData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/finance/closing-prices');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h2>Finance Data</h2>
      {/* Render table or chart with data */}
    </div>
  );
}

export default FinanceData;
```

### OpenAI usage (e.g., a form that sends a user prompt):

```js
import React, { useState } from 'react';

function OpenAIForm() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/openai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userPrompt: prompt }),
      });
      const data = await res.json();
      setResponse(data.choices?.[0].text || '');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {response && <div>{response}</div>}
    </div>
  );
}

export default OpenAIForm;
```

## Local Development with Docker Compose

Use Docker Compose for a smoother local dev experience. Create a docker-compose.yml at the project root:

```yaml
version: '3'
services:
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=mydb
    ports:
      - "5432:5432"
  
  api:
    build: 
      context: ./server
    volumes:
      - ./server:/usr/src/app
    ports:
      - "3001:3001"
    depends_on:
      - db
    environment:
      - DB_HOST=db
      - DB_USER=postgres
      - DB_PASS=postgres
      - DB_NAME=mydb
      - OPENAI_API_KEY=your-openai-key-here
    command: ["npm", "run", "dev"]  # or your start script
  
  frontend:
    build:
      context: ./frontend
    volumes:
      - ./frontend:/usr/src/app
    ports:
      - "3000:3000"
    depends_on:
      - api
    command: ["npm", "start"]  # or "npm run dev" for CRA/Vite
```

In server/Dockerfile (simplified):

```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
```

In frontend/Dockerfile (simplified):

```dockerfile
FROM node:18-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
```

Then run:

```bash
docker-compose up --build
```

- db starts (Postgres)
- api starts (Node Express)
- frontend starts (React)

## Deployment to Low-Cost Platforms

### Render / Railway / Fly.io

- Each typically allows you to create a service from your GitHub repo.
- Provide environment variables (DB credentials, OPENAI_API_KEY) in their dashboard.
- Spin up a managed Postgres instance or connect to an external Postgres (like ElephantSQL).

### Frontend

- Build the React app into static files and host them on Vercel, Netlify, or even the same Node server behind an / route or a separate CDN.

### Cron Jobs

- Verify your hosting platform supports persistent processes if you rely on node-cron.
- If not, consider an external scheduler that pings a special endpoint at scheduled times.

## Future Expansion & Considerations

### LangChain.js

- If you want advanced prompt chaining or retrieval augmentation with embeddings, you can integrate LangChain.js.

### Message Queue

- If scheduled tasks become large or you need concurrency, use a job queue like BullMQ (Redis-based).

### Security / Auth

- Use libraries like jsonwebtoken to add JWT-based authentication to your routes.

### Database Migrations

- For production, set up migrations (e.g., sequelize-cli or Umzug for Sequelize).

### Logging & Monitoring

- Integrate logging libraries (e.g., winston or pino) and set up basic app monitoring.

## Summary

### The Node.js Stack Approach

- React handles UI and direct calls to the Node.js API.
- Express (or Fastify) provides a clean REST-layer for routes:
  - Finance route to fetch data from external APIs (FinancialDatasets.ai, etc.)
  - OpenAI route to handle GPT completions
- Postgres (Sequelize) for relational data storage of user, financial, and AI-related data.
- node-cron for scheduled tasks (e.g., daily close data retrieval).
- Docker Compose for local dev, making it simpler to spin up the entire stack with a single command.
- Deploy to a low-cost or free tier hosting platform, ensuring environment variables and cron job support are set up correctly.

Following this plan, should give us have a stable foundation that’s easy to run locally and straightforward to deploy in a cost-effective way. Later, we can add advanced AI features (e.g., LangChain, embeddings, vector databases) or scale out with more robust job scheduling/queuing solutions as our application grows.

**Next Document: [07 - Modular Agent Architecture](./07%20-%20Modular%20Agent%20Architecture.md)**