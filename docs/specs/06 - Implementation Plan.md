# Implementation Plan

[Back to Documentation Overview](./readme.md)

This implementation plan outlines the technical architecture and development approach for **Erisfy**, an AI-powered stock screening platform. The document provides a comprehensive guide for setting up the development environment, implementing core features, and deploying the application.

The plan details how to build Erisfy using a modern tech stack within an Nx monorepo structure, with:
- A React-based front end in `apps/client` for the user interface
- A NestJS backend service with Prisma ORM for data management
- Docker Compose for local development
- Node-cron for scheduled tasks
- Shared TypeScript libraries for type safety and code reuse

Each section provides specific implementation steps, code examples, and best practices, enabling developers to understand and execute the technical vision effectively.

## Table of Contents

1. [Overview](#overview)  
2. [Setting Up the Node.js API (NestJS + Nx)](#setting-up-the-nodejs-api-nestjs--nx)  
3. [Database (Postgres) & ORM (Prisma)](#database-postgres--orm-prisma)  
4. [Scheduling Jobs with node-cron](#scheduling-jobs-with-node-cron)  
5. [Front-End (React) Integration & Shared Types](#front-end-react-integration--shared-types)  
6. [Local Development with Docker Compose](#local-development-with-docker-compose)  
7. [Deployment to Low-Cost Platforms](#deployment-to-low-cost-platforms)  
8. [Future Expansion & Considerations](#future-expansion--considerations)  
9. [Summary](#summary)

## 1. Overview

**Erisfy** is an AI-powered application that combines a **React** front end with a **NestJS** middle layer, **PostgreSQL** (managed via **Prisma**), scheduling (with **node-cron**), local-first development (with **Docker Compose**), and deployment to low-cost or free-tier platforms.

Within your **ERISFY** Nx monorepo, you currently have:

- A React front end in `apps/client`
- A plan to create a new NestJS API in `apps/api` (or a similar name of your choosing)
- A shared library structure in `libs/` for cross-cutting code (e.g., TypeScript interfaces)

Simplified architecture diagram:

```
 ┌─────────────────┐         ┌───────────────────┐       ┌─────────────────────┐
 │ React (client)  │  <–––>  │ NestJS (api)      │ <–––> │ PostgreSQL Database │
 └─────────────────┘         └───────────────────┘       └─────────────────────┘
     ▲                          │
     │                          │
     ▼                          ▼
   External APIs (OpenAI, financial datasets, etc.)
```

## 2. Setting Up the Node.js API (NestJS + Nx)

### 2.1. Nx Monorepo Structure for Erisfy

A typical folder layout in **ERISFY** might now look like this:

```
ERISFY/
 ├─ apps/
 │   ├─ client              // React front end
 │   └─ api                 // NestJS application
 ├─ libs/
 │   └─ shared-types        // Shared TypeScript interfaces/types
 ├─ tools/
 ├─ nx.json
 ├─ package.json
 └─ tsconfig.base.json
```

### 2.2 Generating a NestJS App

1. **Install Nx Nest Plugin** (if not installed yet):

   ```bash
   cd ERISFY
   pnpm add -D @nrwl/nest
   ```

2. **Generate the NestJS app**:

   ```bash
   pnpm exec nx g @nrwl/nest:app api
   ```

   - This creates a new NestJS application in `apps/api`, with a default structure (e.g., `main.ts`, `app.module.ts`, etc.).

### 2.3 Basic NestJS Setup

- **`apps/api/src/main.ts`**:

  ```ts
  import { NestFactory } from '@nestjs/core';
  import { AppModule } from './app.module';

  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // if needed
    await app.listen(3001);
    console.log(`Nest API is running on http://localhost:3001`);
  }
  bootstrap();
  ```

- **`apps/api/src/app.module.ts`**:

  ```ts
  import { Module } from '@nestjs/common';
  import { FinanceModule } from './modules/finance/finance.module';
  import { OpenAIModule } from './modules/openai/openai.module';

  @Module({
    imports: [FinanceModule, OpenAIModule],
  })
  export class AppModule {}
  ```

### 2.4 Example Finance Module

Create a folder `apps/api/src/modules/finance/`. Then:

```ts
// apps/api/src/modules/finance/finance.module.ts
import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';

@Module({
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
```

```ts
// finance.controller.ts
import { Controller, Get } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finance')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get('closing-prices')
  getClosingPrices() {
    return this.financeService.fetchClosingPrices();
  }
}
```

```ts
// finance.service.ts
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class FinanceService {
  async fetchClosingPrices() {
    // Example external API call
    const response = await axios.get('https://api.financialdatasets.ai/v1/daily-closing');
    return response.data;
  }
}
```

## 3. Database (Postgres) & ORM (Prisma)

### 3.1 Installing & Initializing Prisma

1. **Install Prisma**:

   ```bash
   cd ERISFY
   pnpm add -D prisma
   pnpm add @prisma/client
   ```

2. **Initialize**:

   ```bash
   pnpm exec prisma init
   ```

   This typically creates a `prisma/` folder at the root or within `apps/api`. Decide where you want it. A common approach is `apps/api/prisma/`.

3. **Schema Configuration** (`schema.prisma` example):

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }

   generator client {
     provider = "prisma-client-js"
   }

   model DailyClose {
     id         Int     @id @default(autoincrement())
     symbol     String
     closePrice Decimal
     date       DateTime
   }
   ```

4. **Migrate & Generate**:

   ```bash
   pnpm exec prisma migrate dev --name init
   pnpm exec prisma generate
   ```

### 3.2 Using Prisma in NestJS

Create a **PrismaService**:

```ts
// apps/api/src/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
```

Provide it in a **DatabaseModule**:

```ts
// apps/api/src/modules/database/database.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
```

Then import **DatabaseModule** in your feature modules:

```ts
// apps/api/src/modules/finance/finance.module.ts
import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
```

And use **PrismaService**:

```ts
// finance.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async fetchClosingPrices() {
    // e.g., read from DB or external API
    const closes = await this.prisma.dailyClose.findMany();
    return closes;
  }
}
```

## 4. Scheduling Jobs with node-cron

You have two main approaches:

1. **Use @nestjs/schedule** (recommended for Nest).
2. **Use node-cron** directly.

### Example with NestJS Schedule

```bash
pnpm add @nestjs/schedule
```

```ts
// apps/api/src/modules/finance/finance.module.ts
import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [FinanceService],
  controllers: [FinanceController],
})
export class FinanceModule {}
```

```ts
// finance.service.ts
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FinanceService {
  @Cron('0 21 * * 1-5', { timeZone: 'America/New_York' })
  async handleDailyCloseData() {
    // 1. Fetch data from external API
    // 2. Store in DB via Prisma
    console.log('Running scheduled job for daily close data...');
  }
}
```

## 5. Front-End (React) Integration & Shared Types

### 5.1 Nx Libraries for Shared Types

Generate a **shared-types** library:

```bash
npx nx g @nrwl/workspace:lib shared-types
```

Add your interfaces in `libs/shared-types/src/index.ts`:

```ts
// libs/shared-types/src/index.ts
export interface DailyCloseDTO {
  id: number;
  symbol: string;
  closePrice: string;
  date: string;
}

// add more as needed...
```

Import in **NestJS** or **React**:

```ts
// In NestJS (apps/api)
import { DailyCloseDTO } from '@erisfy/shared-types';
```

```ts
// In React (apps/client)
import { DailyCloseDTO } from '@erisfy/shared-types';
```

### 5.2 React Integration (apps/client)

1. **Serve** your front end with:

   ```bash
   npx nx serve client
   ```

   Usually runs on `http://localhost:4200`.
2. **NestJS** typically runs on port `3001`, so the client can fetch data from `http://localhost:3001/finance/closing-prices`.

Example snippet:

```tsx
// apps/client/src/components/FinanceData.tsx
import React, { useEffect, useState } from 'react';
import { DailyCloseDTO } from '@erisfy/shared-types';

export function FinanceData() {
  const [data, setData] = useState<DailyCloseDTO[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/finance/closing-prices')
      .then((res) => res.json())
      .then((json: DailyCloseDTO[]) => setData(json))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Finance Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.symbol}: ${item.closePrice} on {item.date}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

## 6. Local Development with Docker Compose

You can still keep a **local-first** strategy using Docker Compose. For instance:

```
ERISFY/
 ├─ docker-compose.yml
 ├─ apps/
 │   ├─ api
 │   │   ├─ Dockerfile
 │   └─ client
 │       ├─ Dockerfile
 ├─ libs/
 ├─ nx.json
 ├─ package.json
 └─ ...
```

### 6.1 docker-compose.yml (Example)

```yaml
version: '3'
services:
  db:
    image: postgres:15
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=erisfydb
    ports:
      - "5432:5432"

  api:
    build:
      context: .
      dockerfile: ./apps/api/Dockerfile
    volumes:
      - ./:/workspace
    ports:
      - "3001:3001"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/erisfydb
    command: ["pnpm", "exec", "nx", "serve", "api", "--host=0.0.0.0"]

  client:
    build:
      context: .
      dockerfile: ./apps/client/Dockerfile
    volumes:
      - ./:/workspace
    ports:
      - "4200:4200"
    depends_on:
      - api
    command: ["pnpm", "exec", "nx", "serve", "client", "--host=0.0.0.0"]
```

### 6.2 Dockerfiles

- **`apps/api/Dockerfile`**:

  ```dockerfile
  FROM node:18-alpine
  WORKDIR /workspace
  COPY package*.json ./
  RUN pnpm install
  COPY . .
  EXPOSE 3001
  ```

- **`apps/client/Dockerfile`**:

  ```dockerfile
  FROM node:18-alpine
  WORKDIR /workspace
  COPY package*.json ./
  RUN pnpm install
  COPY . .
  EXPOSE 4200
  ```

### 6.3 Running Locally

```bash
docker-compose up --build
```

This spins up:

1. **Postgres** on port **5432**
2. **NestJS API** on **3001**
3. **React Client** on **4200**

## 7. Deployment to Low-Cost Platforms

For **Erisfy** deployment, the general steps are:

1. **Build** each app with Nx:

   ```bash
   pnpm exec nx build api
   pnpm exec nx build client
   ```

2. **Dockerize** or push build artifacts to your chosen platform.  
3. **Configure environment variables** (like `DATABASE_URL`, `OPENAI_API_KEY`) via the platform’s dashboard.  
4. **Set up Postgres** (through the platform’s managed DB service or your own container).  
5. **Cron Jobs**: If you rely on `@nestjs/schedule` or `node-cron`, ensure the platform supports persistent containers; otherwise, use a third-party scheduler.

Common platforms: **Railway**, **Render**, **Fly.io**, or you can use **AWS** or **Azure** if you need more control.

## 8. Future Expansion & Considerations

1. **LangChain**  
   - Integrate advanced prompt chaining or retrieval augmentation in your NestJS modules.  
   - Possibly store embeddings in a vector DB or use `pgvector` in Postgres.
2. **Queues & Scalability**  
   - If scheduling tasks becomes heavy, consider a queue like **BullMQ** with Redis, or Nest’s built-in queue module.  
3. **Authentication**  
   - Use [@nestjs/passport](https://docs.nestjs.com/security/authentication) or other Nest auth strategies.  
4. **Testing**  
   - Nx sets up Jest for both the client and Nest. Use `nx test api` or `nx test client`.  
5. **Logging & Monitoring**  
   - Tools like `@nestjs/pino` or `winston` for logs; APM services for performance monitoring.  
6. **Prisma Migrations**  
   - Continue to manage DB migrations with `prisma migrate`, which can be hooked into Nx using custom targets.

## 9. Summary

The **Erisfy** project can now be structured within an **Nx** monorepo, with:

- **apps/client**: The React front end  
- **apps/api**: The NestJS + Prisma back end  
- **libs/shared-types**: Shared TypeScript interfaces and DTOs  

**Docker Compose** provides a simple, local-first strategy for running the entire stack (Postgres, API, and Client). **Deployment** remains straightforward on low-cost providers, especially if you containerize or build your apps via Nx. This updated approach ensures better **type safety**, improved **modularity**, and a clean path for future expansions such as **LangChain**, advanced scheduling, or additional AI integrations.

---

**Next Document**: [07 - Modular Agent Architecture](./07%20-%20Modular%20Agent%20Architecture.md)
