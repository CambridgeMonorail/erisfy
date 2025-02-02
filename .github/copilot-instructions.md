# Project Context

We are building a React Single Page Application in TypeScript, using client-side routing within a Nrwl Nx Monorepo. We install packages exclusively via pnpm.

## Code Style and Structure

We prioritize clean, modern, type-safe React functional components emphasizing security, robustness, maintainability, readability, separation of concerns, and DRY principles. Follow Nx monorepo structure for organizing code.

- Use React hooks (useState, useEffect) for state management and side effects.
- Prefer named (explicit) exports.
- Adhere to TypeScript strict typing.
- Prefer 'type' over 'interface' unless extending.
- Place code in relevant Nx library/app folders.

## Tech Stack

Core technologies and libraries used in the project.

- React (SPA)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Nrwl Nx
- Vitest and Playwright for testing

## Naming Conventions

Ensure clarity and consistency in how files and components are named.

- Prefer descriptive exports and meaningful file names.
- Use direct named imports and relative paths within the same project.

## TypeScript Usage

Enforce strict type safety and best practices.

- Use interfaces only when merging or extending object definitions.
- Keep components as stateless as possible, delegating state or context to higher levels.

## UI and Styling

Follow Tailwind CSS and shadcn/ui guidelines for consistent design.

- Apply Tailwind classes for styling.
- Import shadcn components from '@erisfy/shadcnui'.
- Utilize shadcn theme variables (bg-background, text-foreground, etc.).

## State Management

Handle state and effects efficiently within React hooks.

- Keep logic in functional components.
- Delegate complex state to parent components or React Context.

## Storybook Usage

Ensure stories are modern and annotated correctly.

- Use latest syntax, StoryObj, and tags: ['autodocs'].
- Cover possible use cases with JSDoc comments explaining each story.

## Icons

Maintain consistent icon usage in the UI.

- Use lucide-react for icons.

## Testing

Verify code functionality using unit and E2E tests.

- Implement Vitest for unit tests.
- Implement Playwright for end-to-end tests.

## Accessibility and Responsiveness

Ensure inclusive UX on various devices.

- Make all components accessible and responsive.
- Follow best practices for screen readers and dynamic layouts.
