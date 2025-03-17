# Overview of Reusable Review Prompt Files

This document explains the reusable review prompt files for TypeScript, NestJS, and React that are used with the [VS Code Copilot Customization](https://code.visualstudio.com/docs/copilot/copilot-customization#_reusable-prompt-files-experimental) feature. These files are designed to guide code reviews by standardizing best practices across your monorepo, ensuring consistency and quality in your codebase.

## What Are Reusable Prompt Files?

Reusable prompt files are text or markdown files that contain pre‑defined prompts. They instruct VS Code Copilot to generate review feedback or suggestions based on specific guidelines. By using these prompts, you can:

- **Standardize** your review process across different libraries and applications.
- **Guide** reviewers to focus on critical aspects of code quality.
- **Increase Efficiency** by reducing ad‑hoc evaluations during code reviews.
- **Customize** feedback to align with internal best practices and project standards.

## Purpose of the Review Prompt Files

The main goals of these prompt files are to:

- **Enforce Consistency:** Ensure that reviews for TypeScript libraries, NestJS modules, and React applications follow a unified set of best practices.
- **Improve Code Quality:** Provide clear guidelines on type safety, module boundaries, naming conventions, modularity, performance, error handling, and testing.
- **Streamline the Review Process:** Help reviewers quickly identify potential issues and suggest improvements using a pre‑defined checklist.
- **Facilitate Automation:** Integrate with VS Code Copilot to generate tailored feedback, making the review process more efficient and less reliant on manual checks.

## Overview of the Prompt Files

- **TypeScript Review Prompts:**  
  Focus on best practices for library code in your monorepo. They cover explicit type annotations, proper use of generics and utility types, avoidance of `any`, and adherence to consistent naming conventions.
  - [TypeScript Review Guidelines](./typescript-review.prompt.md)

- **NestJS Review Prompts:**  
  Designed specifically for NestJS code, these prompts ensure correct use of decorators, dependency injection, modular design, and maintain a clear separation between public APIs and internal logic.
  - [NestJS Review Guidelines](./nestjs-review.prompt.md)

- **React Review Prompts:**  
  Targeted at modern React applications, these guidelines emphasize proper use of hooks, component composition, state management, performance optimizations (such as memoization and lazy loading), and accessibility.
  - [React Review Guidelines](./react-review.prompt.md)

## How to Use These Files

1. **Integration with VS Code Copilot:**  
   Follow the [Copilot Customization Guide](https://code.visualstudio.com/docs/copilot/copilot-customization#_reusable-prompt-files-experimental) to add these prompt files to your workspace. Once configured, Copilot will use these prompts to help generate review suggestions.

2. **Customization:**  
   Feel free to update the prompts as your internal guidelines evolve. This ensures that the review process stays current with your best practices.

3. **During Code Reviews:**  
   Use the prompts as a checklist for manual reviews or allow Copilot to generate feedback that aligns with these guidelines. This approach helps maintain high code quality across all libraries and applications in your Nrwl Nx monorepo.
