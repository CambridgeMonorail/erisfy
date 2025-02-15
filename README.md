<p align="center">
  <img src="docs/images/logos/app-logo.svg" alt="Erisfy Logo" width="25%" height="25%">
</p>

# Erisfy

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
- [Installation](#installation)
- [Usage](#usage)
- [Run tasks](#run-tasks)
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

- **Simplified Setup**: Provide a ready-to-use boilerplate for developers looking to build SPAs using modern tools without SSR or Next.js.
- **Seamless Integration**: Combine Nx for monorepo management, Tailwind CSS for utility-first styling, and Shadcn UI for cohesive, customizable UI components.
- **Scalability and Modularity**: Offer a scalable architecture with reusable libraries and clear boundaries between projects.
- **Enhanced Developer Experience**: Deliver a well-documented, intuitive, and maintainable codebase to boost productivity and reduce onboarding time.
- **Community Collaboration**: Foster an open-source community to innovate, improve, and expand the project.
- **Experimentation**: Explore and test new UI/UX concepts and design patterns for FinTech applications.

For a detailed breakdown of the project goals, see [Project Goals](./docs/project-goals.md).

## Features

- 🏗 **Nx Monorepo**: Modular and scalable workspace for managing multiple projects and libraries.
- 🎨 **Tailwind CSS**: Utility-first CSS framework for rapid and responsive UI development.
- 🖌 **Shadcn UI**: A customizable component library for consistent and reusable design patterns.
- ⚡ **Vite**: Fast and efficient development server and build tool.
- 🚀 **CI/CD Integration**: Preconfigured workflows for automated builds and testing.

## Why This Project Was Built

While tools like Nx, Tailwind CSS, and Shadcn UI are incredibly powerful and offer numerous benefits for modern front-end development, the process of configuring them can still be time-consuming, error-prone, and frustrating, even for experienced developers. This is because setting up such architectures from scratch is an infrequent task, and each setup can have its own unique challenges and nuances.

This project was built to address these challenges by providing a pre-configured, ready-to-use boilerplate that simplifies the initial setup process. By leveraging this boilerplate, developers can quickly start building their applications without worrying about the complexities of configuration, allowing them to focus on writing code and delivering features.

For more details on why a React SPA boilerplate may still have some value in a Next.js world, see [Why a React SPA Boilerplate in a Next.js World?](./docs/why-spa-why.md)

## Technologies Used

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
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
[![Visual Studio Code](https://img.shields.io/badge/Visual_Studio_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://code.visualstudio.com/)
[![GitHub Copilot](https://img.shields.io/badge/GitHub_Copilot-000000?style=for-the-badge&logo=github-copilot&logoColor=white)](https://github.com/features/copilot)

- **React**: [A JavaScript library for building user interfaces.](https://reactjs.org/)
- **TypeScript**: [A typed superset of JavaScript that compiles to plain JavaScript.](https://www.typescriptlang.org/)
- **Node.js**: [A JavaScript runtime built on Chrome's V8 JavaScript engine.](https://nodejs.org/)
- **Nx**: [A set of extensible dev tools for monorepos, which helps in managing and scaling the project.](https://nx.dev/)
- **Markdown**: [A lightweight markup language for creating formatted text using a plain-text editor.](https://www.markdownguide.org/)
- **pnpm**: [A fast, disk space-efficient package manager.](https://pnpm.io/)
- **Vite**: [A build tool that provides a faster and leaner development experience for modern web projects.](https://vitejs.dev/)
- **GitHub**: [A platform for version control and collaboration.](https://github.com/)
- **GitHub Actions**: [A CI/CD service that allows you to automate your build, test, and deployment pipeline.](https://github.com/features/actions)
- **Tailwind CSS**: [A utility-first CSS framework for styling the components.](https://tailwindcss.com/)
- **shadcn/ui**: [A set of reusable UI components for consistent design.](https://ui.shadcn.dev/)
- **React Router**: [A library for routing in React applications.](https://reactrouter.com/)
- **Vitest**: [A Vite-native unit testing framework.](https://vitest.dev/)
- **Playwright**: [An end-to-end testing framework.](https://playwright.dev/)
- **Visual Studio Code**: [A source-code editor made by Microsoft for Windows, Linux, and macOS.](https://code.visualstudio.com/)
- **GitHub Copilot**: [An AI pair programmer that helps you write code faster and with less work.](https://github.com/features/copilot)

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

## Usage

To run the dev server for your app, use:

```sh
npx nx serve client
```

To create a production bundle:

```sh
npx nx build client
```

To see all available targets to run for a project, run:

```sh
npx nx show project client
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Run Tasks

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
- **Shadcn UI**: A customizable component library for consistent and reusable design patterns.
- **Nx Monorepo**: Modular and scalable workspace for managing multiple projects and libraries.

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

## Enabling/Disabling API Mocks

To enable or disable API mocks, follow these steps:

1. Open the `.env` file in the `apps/client` directory.
2. Set the `VITE_REACT_APP_USE_MOCKS` environment variable to `true` to enable mocks or `false` to disable them.

```ini
VITE_REACT_APP_USE_MOCKS=true
```

## Running Tests with MSW

To run tests with MSW, follow these steps:

1. Ensure that the mock server is set up in the `apps/client/src/mocks/server.ts` file.
2. Import and start the mock server in your test setup file (`apps/client/src/test/setup.ts`).

```typescript
import { server } from '../mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

3. Write your tests as usual, and MSW will intercept the API requests and return the mock responses.

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
- [Placebeard](https://placebeard.it/): A fantastic service for placeholder images featuring bearded individuals, inspired by similar services like placekitten.com and placedog.com. We appreciate their free service for adding a touch of fun to our project.
- [unDraw](https://undraw.co/): Open-source illustrations for any idea you can imagine and create. A constantly updated design project with beautiful SVG images that you can use completely free and without attribution. Created by [Katerina Limpitsouni](https://x.com/ninaLimpi).
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
