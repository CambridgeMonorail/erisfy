# Erisfy

![Erisfy Logo](docs/images/logos/app-logo.svg)

I'm learning LLMs and Agentic AI by building something

![Project Status](https://img.shields.io/badge/status-alpha-orange?style=for-the-badge)
![Version](https://img.shields.io/github/package-json/v/CambridgeMonorail/erisfy?style=for-the-badge)
![Build Status](https://img.shields.io/github/actions/workflow/status/CambridgeMonorail/erisfy/ci.yml?style=for-the-badge)
![License](https://img.shields.io/github/license/CambridgeMonorail/erisfy?style=for-the-badge)
![Last Commit](https://img.shields.io/github/last-commit/CambridgeMonorail/erisfy?style=for-the-badge)

**NOTE: This project is currently in alpha. In fact, it's very alpha. This means it is still under active development and may undergo significant changes. Features may be incomplete or unstable. Got suggestions on what you would like to see or how to make it better? Add an issue and let us know!**

## Table of Contents

- [Overview](#overview)
- [Project Goals](#project-goals)
- [Features](#features)
- [Why This Project Was Built](#why-this-project-was-built)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Development Tasks](#development-tasks)
- [Install Nx Console](#install-nx-console)
- [Projects](#projects)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Useful links](#useful-links)
- [FAQs](#faqs)

## Overview

Erisfy is an AI-powered stock screener that simplifies investing by transforming raw market data into clear, actionable insights, enabling investors to discover opportunities, analyze trends, and make confident decisions faster. The project aims to integrate Large Language Models (LLM) and Agentic AI into modern TypeScript-based web products. The project is in its early alpha stage and is a work in progress. The goal is to learn by doing, creating a functional application that showcases the potential of LLM and Agentic AI in FinTech.

## Project Goals

- **Learning Through Building**: Create a practical application that serves as a learning platform for integrating Large Language Models (LLM) and Agentic AI into modern web applications.
- **AI-Powered Stock Screening**: Build an intelligent system that transforms complex market data into clear, actionable insights for investors at all levels.
- **Modular AI Architecture**: Implement a flexible, modular agent architecture with weighted filters and rule sets that can evolve through feedback loops.
- **Developer Education**: Document the journey of building AI-powered features, sharing insights and lessons learned with the developer community.
- **Accessible Investment Intelligence**: Democratize financial analysis by making AI-driven insights available and understandable to everyday investors.
- **User-Centric Design**: Create an interface that simplifies complex financial data without overwhelming users, focusing on clear explanations and guided experiences.
- **Transparent AI Decision-Making**: Implement explainable AI features that help users understand the reasoning behind investment recommendations.
- **Adaptive Learning System**: Develop AI filters that adjust based on user preferences and investment styles, creating a more personalized experience.

For a detailed breakdown of the project's features and roadmap, see the [Implementation Plan](./docs/specs/06%20-%20Implementation%20Plan.md) and [Modular Agent Architecture](./docs/specs/07%20-%20Modular%20Agent%20Architecture.md) documentation.

## Features

- 🤖 **AI-Powered Analysis**: Transforms complex market data into clear, actionable insights using LLMs and Agentic AI
- 🎯 **Modular Agent Architecture**: Flexible AI agents with weighted filters and rule sets that evolve through feedback
- 🔍 **Smart Stock Screening**: Intelligent system for discovering investment opportunities based on customizable criteria
- 📊 **Natural Language Insights**: Plain-language explanations of market trends and investment recommendations
- 🎓 **Learning-Focused Design**: Educational components that help users understand investment concepts and AI decisions
- ⚡ **Adaptive Filtering**: Dynamic filters that adjust based on user preferences and investment styles
- 🛠 **Modern Tech Stack**: Built with React, TypeScript, and Nx in a scalable monorepo architecture
- 🎨 **User-Centric UI**: Clean interface using Tailwind CSS and shadcn/ui for consistent design patterns
- 🧪 **Comprehensive Testing**: End-to-end and unit testing with Playwright and Vitest
- 📱 **Responsive Design**: Mobile-first approach ensuring accessibility across all devices
- 🔄 **Continuous Integration**: Automated builds and testing through GitHub Actions
- 📚 **Extensive Documentation**: Detailed documentation of architecture, features, and development practices

## Why This Project Was Built

Large Language Models (LLMs) and Agentic AI represent powerful technologies that are transforming software development and user experiences. However, the best way to truly understand and harness these technologies is through hands-on application to real-world problems. This project was born from that philosophy of learning by doing.

Erisfy serves as a practical learning platform where we're actively exploring and implementing:

- Integration of LLMs for natural language processing and user interactions
- Development of modular AI agents with specific, focused capabilities
- Creation of weighted filtering systems that learn and adapt from user feedback
- Implementation of transparent, explainable AI decision-making processes
- Building AI-driven features that solve real user problems in the investment space

Rather than just experimenting with AI in isolation, we're building a functional, user-centric application that demonstrates how these technologies can make complex financial data more accessible and actionable for everyday investors. This approach allows us to:

- Learn through practical implementation challenges
- Document and share insights about integrating AI into modern web applications
- Create reusable patterns for AI-driven features
- Build something genuinely useful while advancing our understanding of AI technologies

By focusing on a real-world application in the FinTech space, we ensure our learning is grounded in practical problems and user needs, rather than theoretical exercises. The project aims to be both a learning journey and a useful tool, demonstrating how AI can democratize financial analysis and decision-making.

## Technologies Used

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Nx](https://img.shields.io/badge/Nx-143055?style=for-the-badge&logo=nx&logoColor=white)](https://nx.dev/)
[![Markdown](https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white)](https://www.markdownguide.org/)
[![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white)](https://pnpm.io/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/)
[![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white)](https://github.com/features/actions)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcn&logoColor=white)](https://ui.shadcn.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-2EAD33?style=for-the-badge&logo=playwright&logoColor=white)](https://playwright.dev/)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white)](https://storybook.js.org/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)](https://eslint.org/)
[![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=github-copilot&logoColor=white)](https://github.com/features/copilot)

## Prerequisites

To use Erisfy, make sure you have the following installed and configured:

- Node.js v20.14.0 (or higher)
- pnpm v9.15.0 (or higher)
- Docker Desktop (required for certain services)

### Environment Configuration

The [server application](./apps/server) requires environment variables to be configured. We use different environment files for development and production:

- `.env.development`: Local development environment (not committed to source control)
- `.env.production`: Production environment with placeholders (populated by CI pipeline)
- `.env.example`: Example configuration template

Follow these steps for local development:

1. Navigate to the server application directory:

   ```sh
   cd apps/server
   ```

2. Copy the example environment file to create your development environment:

   ```sh
   cp .env.example .env.development
   ```

3. Edit `.env.development` and set your environment variables:
   - `PORT`: The server port (defaults to 3001)
   - `NODE_ENV`: The environment (development/production/test)
   - `OPENAI_API_KEY`: Your OpenAI API key (required)

**Note**: The `.env.development` file contains sensitive information and is not committed to the repository. Each developer needs to maintain their own `.env.development` file locally.

#### Database Connection Settings

When running the application locally with Docker, ensure your server's database configuration matches the Docker settings:

```env
# Database connection settings in .env.development
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/erisfydb?schema=public"
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=erisfydb
POSTGRES_PORT=5432
POSTGRES_HOST=localhost
```

These environment variables should match the values in `docker-compose.yml`. If you modify the Docker configuration, update your environment variables accordingly.

#### First-Time Database Setup

When running the database for the first time:

1. Start the Docker container:
   ```sh
   pnpm run serve:docker
   ```

2. Run database migrations:
   ```sh
   pnpm run prisma:migrate
   ```

This will create the necessary database schema and apply any pending migrations.

## Installation

To install the project, follow these steps:

1. Clone the repository:

   ```sh
   git clone https://github.com/CambridgeMonorail/erisfy.git
   ```

2. Navigate to the project directory:

   ```sh
   cd erisfy
   ```

3. Install dependencies:

   ```sh
   pnpm install
   ```

## Running Locally

To run Erisfy locally, you'll need to start multiple services in the following order:

1. Start the PostgreSQL database using Docker:

   ```sh
   pnpm run serve:docker
   ```

   This will spin up the PostgreSQL database container. Wait until you see the database is ready to accept connections.

2. Start the server application:

   ```sh
   pnpm run serve:server
   ```

   The server will run on port 3001 by default. Wait until you see the message indicating the server is running.

3. Start the client application:

   ```sh
   pnpm run serve:client
   ```

   The client will run on port 4200 by default and should automatically open in your default browser.

### Docker Configuration

The project uses Docker Compose to manage the PostgreSQL database service. The configuration is defined in `docker-compose.yml`:

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
```

This configuration:
- Uses PostgreSQL version 15
- Creates a database named 'erisfydb'
- Sets up default credentials (username: postgres, password: postgres)
- Maps port 5432 on your host machine to port 5432 in the container

#### Managing the Docker Container

- Start the container: `pnpm run serve:docker`
- Stop the container: Press Ctrl+C in the terminal running Docker
- Remove the container: `docker-compose down`
- Remove container and data volume: `docker-compose down -v`

#### Troubleshooting Docker Issues

1. **Port Conflicts**: If port 5432 is already in use:
   - Check for running PostgreSQL instances: `docker ps`
   - Stop any conflicting services
   - Or modify the port mapping in docker-compose.yml

2. **Container Won't Start**:
   - Check Docker Desktop is running
   - Try removing the container: `docker-compose down`
   - Check Docker logs: `docker-compose logs db`

3. **Data Persistence**:
   - Data is stored in a Docker volume by default
   - To start fresh, remove the volume: `docker-compose down -v`

### Development Commands Quick Reference

- `pnpm run serve:docker`: Start the PostgreSQL database container
- `pnpm run serve:server`: Start the backend server in development mode
- `pnpm run serve:client`: Start the frontend client in development mode
- `pnpm run build:client`: Create a production bundle of the client
- `pnpm run build:server`: Create a production bundle of the server

To see all available targets to run for a project:

```sh
npx nx show project client
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Development Tasks

The following scripts are available to manage and build the project:

- **Build**
  - `pnpm run build:affected`: Build only the affected projects.
  - `pnpm run build:all`: Build all projects.
  - `pnpm run build:client`: Build the client application.
  - `pnpm run build:shadcnui`: Build the shadcnui library.

- **Clean**
  - `pnpm run clean`: Clean all projects.

- **Format**
  - `pnpm run format:check`: Check the formatting of the code.
  - `pnpm run format`: Format the code.

- **Lint**
  - `pnpm run lint:affected`: Lint only the affected projects.
  - `pnpm run lint:all`: Lint all projects.
  - `pnpm run lint:client`: Lint the client application.
  - `pnpm run lint:shadcnui`: Lint the shadcnui library.

- **Precommit**
  - `pnpm run precommit`: Run lint, type-check, build, and test for all projects before committing.

- **Prepare**
  - `pnpm run prepare`: Prepare Husky for Git hooks.

- **Serve**
  - `pnpm run serve:client`: Serve the client application.
  - `pnpm run serve:storybook`: Serve the Storybook instance.

- **Test**
  - `pnpm run test:affected`: Test only the affected projects.
  - `pnpm run test:all`: Test all projects.
  - `pnpm run test:client`: Test the client application.
  - `pnpm run test:shadcnui`: Test the shadcnui library.

- **Type-check**
  - `pnpm run type-check:affected`: Type-check only the affected projects.
  - `pnpm run type-check:all`: Type-check all projects.
  - `pnpm run type-check:client`: Type-check the client application.
  - `pnpm run type-check:shadcnui`: Type-check the shadcnui library.

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Projects

### Current Projects

- **Erisfy**: The main project integrating LLM and Agentic AI into a modern TypeScript-based web product.

### Supporting Documentation

For detailed information on the projects, refer to the supporting documentation in the `docs/specs` directory:

- [01 - Elevator Pitch](./docs/specs/01%20-%20elevator%20pitch.md)
- [02 - Pitch](./docs/specs/02%20-%20pitch.md)
- [03 - Competitor Analysis](./docs/specs/03%20-%20Competitor%20Analysis.md)
- [04 - Product Requirements Document (PRD)](./docs/specs/04%20-%20PRD.md)
- [05 - Technical Requirements Document (TRD)](./docs/specs/05%20-%20TRD.md)
- [06 - Implementation Plan](./docs/specs/06%20-%20Implementation%20Plan.md)
- [07 - Modular Agent Architecture](./docs/specs/07%20-%20Modular%20Agent%20Architecture.md)

## Theming Your App

To learn how to theme your app using Shadcn UI and Tailwind CSS, please refer to the detailed guide in [docs/theming-a-new-app.md](./docs/theming-a-new-app.md).

**Note:** The current theme was generated using the Ready.js [Shadcn UI Theme Generator](https://www.readyjs.dev/tools/shadcn-ui-theme-generator).

### Adding a New Component Page to the Routing in Your React SPA

To add a new component page to the routing in your React SPA, please refer to the detailed guide in [docs/adding-new-component-page.md](./docs/adding-new-component-page.md).

## API Mocking for Frontend Development and GitHub Pages

The client application (`apps/client`) includes API mocking capabilities using Mock Service Worker (MSW). This feature is particularly important as it allows us to:

1. Deploy and showcase the frontend on GitHub Pages without requiring a backend
2. Develop and test frontend features independently of the backend
3. Present working demos of the application for review before backend deployment
4. Enable frontend developers to work without a local backend setup

### Enabling/Disabling API Mocks in the Client

The API mocking configuration is specific to the client application located in `apps/client`. To enable or disable the mocks:

1. Open the `.env` file in the `apps/client` directory
2. Set the `VITE_REACT_APP_USE_MOCKS` environment variable:
   ```ini
   # Enable mocks for GitHub Pages deployment or local frontend-only development
   VITE_REACT_APP_USE_MOCKS=true

   # Disable mocks when working with the actual backend
   VITE_REACT_APP_USE_MOCKS=false
   ```

When mocks are enabled, the client application will intercept API requests and return mock data instead of attempting to communicate with the backend server. This is particularly useful for:
- GitHub Pages deployments where no backend is available
- Frontend development and testing
- Creating demonstrations and previews
- UI/UX reviews and demonstrations

### Mock Implementation Details

The mock service implementation for the client is located in:
- `apps/client/src/mocks/` - Main mocking setup and handlers
- `apps/client/src/mocks/handlers/` - API endpoint mock implementations
- `apps/client/src/mocks/data/` - Mock data responses

To add or modify mock endpoints:

1. Create or update handler files in `apps/client/src/mocks/handlers/`
2. Define mock data in `apps/client/src/mocks/data/`
3. Register handlers in `apps/client/src/mocks/browser.ts`

Example mock handler:
```typescript
// apps/client/src/mocks/handlers/stockHandler.ts
rest.get('/api/stocks', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(mockStocksData));
});
```

When deploying to GitHub Pages, these mocks ensure that:
- The application remains functional without a backend
- Features can be demonstrated to stakeholders
- UI/UX can be reviewed in a production-like environment
- Frontend iterations can be quickly deployed and tested

### Running Tests with MSW

First, ensure that the mock server is set up in the `apps/client/src/mocks/server.ts` file.

Next, import and start the mock server in your test setup file (`apps/client/src/test/setup.ts`):

```typescript
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

Finally, write your tests as usual, and MSW will intercept the API requests and return the mock responses.

### Development Workflow with API Mocks

When working on frontend features, you can choose between using mocked or real API endpoints:

1. **Local Development with Mocks** (No Backend Required):
   ```env
   # apps/client/.env.development
   VITE_REACT_APP_USE_MOCKS=true
   ```
   Perfect for:
   - Initial UI development
   - Prototyping new features
   - Working offline
   - Frontend-only changes

2. **Full Stack Development** (Backend Required):
   ```env
   # apps/client/.env.development
   VITE_REACT_APP_USE_MOCKS=false
   ```
   Used when:
   - Testing real API integration
   - Developing backend features
   - Validating end-to-end functionality

3. **Production Deployment**:
   ```env
   # apps/client/.env.production
   VITE_REACT_APP_USE_MOCKS=false
   ```
   Always use real API endpoints in production.

4. **GitHub Pages Deployment**:
   ```env
   # apps/client/.env.production
   VITE_REACT_APP_USE_MOCKS=true
   ```
   Enables demonstration of frontend features without backend deployment.

## Reference Documentation

For detailed steps on setting up MSW and integrating API mocking in Erisfy, refer to the [Integrating API Mocking with MSW in Erisfy](./docs/specs/working/Integrating%20API%20Mocking%20with%20MSW%20in%20Erisfy.md) documentation.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes. For detailed guidelines on how to contribute, see [Contributing](./docs/CONTRIBUTING.md).

## License

This project is licensed under the MIT License.

## Acknowledgments

- [joshuarobs/nx-shadcn-ui-monorepo](https://github.com/joshuarobs/nx-shadcn-ui-monorepo)
- [Shadcn UI](https://github.com/shadcn-ui/ui)
- [Nx](https://nx.dev)
- [Shadcn UI Theme Generator](https://www.readyjs.dev/tools/shadcn-ui-theme-generator): A tool for generating themes for Shadcn UI.

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## FAQs

### Why doesn't the app load?

It's not finished yet.

### Why is the button not working?

It's not finished yet.

### Why is there no dark mode?

It's not finished yet.

### Why does the page look weird on mobile?

It's not finished yet.

### Why is the documentation incomplete?

It's not finished yet.

### Why can't I find the feature I need?

It's not finished yet.

### Why is the sky blue?

It's not finished yet. (Just kidding, that's actually due to Rayleigh scattering.)
