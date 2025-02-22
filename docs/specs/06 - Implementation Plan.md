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

---

## 1. Overview

**Erisfy** is an AI-powered application that combines a **React** front end with a **NestJS** middle layer, **PostgreSQL** (managed via **Prisma**), scheduling (with **node-cron**), local-first development (with **Docker Compose**), and deployment to low-cost or free-tier platforms.

Within your **ERISFY** Nx monorepo, you currently have:

- A React front end in `apps/client`
- A plan to create a new NestJS API in `apps/api` (or a similar name of your choosing)
- A shared library structure in `libs/` for cross-cutting code (e.g., TypeScript interfaces)

Simplified architecture diagram:

```yaml
 ┌─────────────────┐         ┌───────────────────┐       ┌─────────────────────┐
 │ React (client)  │  <–––>  │ NestJS (api)      │ <–––> │ PostgreSQL Database │
 └─────────────────┘         └───────────────────┘       └─────────────────────┘
     ▲                          │
     │                          │
     ▼                          ▼
   External APIs (OpenAI, financial datasets, etc.)
```

---

## 2. Setting Up the Node.js API (NestJS + Nx)

### 2.1. Nx Monorepo Structure for Erisfy

A typical folder layout in **ERISFY** might now look like this:

```text
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
   pnpm add -D @nx/nest
   ```

2. **Generate the NestJS App**:

   ```bash
   pnpm exec nx g @nx/nest:app api
   ```

   This creates a new NestJS application in `apps/api` with a default structure (e.g., `main.ts`, `app.module.ts`, etc.).

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

Create a folder `apps/api/src/modules/finance/` and then add:

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
// apps/api/src/modules/finance/finance.controller.ts
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
// apps/api/src/modules/finance/finance.service.ts
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

---

## 3. Database (Postgres) & ORM (Prisma)

### 3.1 Installing & Initializing Prisma

1. **Install Prisma**:

   ```bash
   cd ERISFY
   pnpm add -D prisma
   pnpm add @prisma/client
   ```

2. **Initialize Prisma**:

   ```bash
   pnpm exec prisma init
   ```

   This creates a `prisma/` folder. A common approach is to move this folder to `apps/api/prisma/`.

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

Then import **DatabaseModule** in your feature modules (e.g., FinanceModule):

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

And use **PrismaService** in your service:

```ts
// apps/api/src/modules/finance/finance.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class FinanceService {
  constructor(private prisma: PrismaService) {}

  async fetchClosingPrices() {
    const closes = await this.prisma.dailyClose.findMany();
    return closes;
  }
}
```

---

## 4. Scheduling Jobs with node-cron

You have two main approaches:

1. **Use @nestjs/schedule** (recommended for Nest)
2. **Use node-cron directly**

### Example with NestJS Schedule

Install the schedule package:

```bash
pnpm add @nestjs/schedule
```

Update your FinanceModule to import the schedule module:

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

In your FinanceService, use the Cron decorator:

```ts
// apps/api/src/modules/finance/finance.service.ts
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

---

## 5. Front-End (React) Integration & Shared Types

### 5.1 Nx Libraries for Shared Types

Generate a **shared-types** library using the updated Nx command:

```bash
npx nx g lib shared-types
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

Import these shared types in both your NestJS and React apps:

```ts
// In NestJS (apps/api)
import { DailyCloseDTO } from '@erisfy/shared-types';
```

```ts
// In React (apps/client)
import { DailyCloseDTO } from '@erisfy/shared-types';
```

### 5.2 React Integration (apps/client)

Serve your React front end:

```bash
npx nx serve client
```

Assuming your NestJS API runs on port 3001, the client can fetch data from `http://localhost:3001/finance/closing-prices`.

Example component:

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

---

## 6. Local Development with Docker Compose

Maintain a local-first strategy using Docker Compose:

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
version: '3.9'
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

Run the following command to build and start the services:

```bash
docker-compose up --build
```

This command spins up:

1. **Postgres** on port **5432**
2. **NestJS API** on **3001**
3. **React Client** on **4200**

---

## 7. Deployment to Low-Cost Platforms

For deployment of **Erisfy**:

1. **Build the Applications**:

   ```bash
   pnpm exec nx build api
   pnpm exec nx build client
   ```

2. **Dockerize or Deploy Artifacts**:  
   Containerize your apps or push build artifacts to your chosen provider.

3. **Configure Environment Variables**:  
   Set variables such as `DATABASE_URL` and `OPENAI_API_KEY` via the platform’s dashboard.

4. **Database Setup**:  
   Use the platform’s managed PostgreSQL service or deploy your own container.

5. **Scheduling Jobs**:  
   Ensure your platform supports persistent containers (for using `@nestjs/schedule` or node-cron) or opt for a third-party scheduler.

Common deployment platforms include **Railway**, **Render**, **Fly.io**, or cloud providers like **AWS** and **Azure** for more control.

---

## 8. Future Expansion & Considerations

1. **LangChain**  
   - Integrate advanced prompt chaining or retrieval augmentation in your NestJS modules.
   - Consider storing embeddings in a vector DB or using `pgvector` in PostgreSQL.

2. **Queues & Scalability**  
   - If scheduled tasks increase in load, explore a queue system like **BullMQ** with Redis or use Nest’s built-in queue module.

3. **Authentication**  
   - Implement authentication strategies using [@nestjs/passport](https://docs.nestjs.com/security/authentication) or other Nest auth modules.

4. **Testing**  
   - Nx sets up Jest for both client and API. Run tests with `nx test api` or `nx test client`.

5. **Logging & Monitoring**  
   - Integrate logging libraries such as `@nestjs/pino` or `winston` and consider using APM services for monitoring performance.

6. **Prisma Migrations**  
   - Continue managing migrations with `prisma migrate`, and consider integrating these steps as custom Nx targets.

---

## 9. Summary

The **Erisfy** project is structured within an **Nx** monorepo using:

- **apps/client**: The React front end  
- **apps/api**: The NestJS + Prisma back end  
- **libs/shared-types**: Shared TypeScript interfaces and DTOs  

Docker Compose provides a local-first approach for running the entire stack (Postgres, API, and Client). Deployment remains straightforward on low-cost providers, especially when containerizing or building the apps via Nx. These updates—particularly replacing the deprecated `@nrwl/nest` package with `@nx/nest`—ensure better type safety, improved modularity, and a clean path for future expansions such as LangChain integrations, advanced scheduling, or additional AI functionalities.

---

**Next Document**: [07 - Modular Agent Architecture](./07%20-%20Modular%20Agent%20Architecture.md)
