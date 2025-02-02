- Project Structure: This is a React Single Page Application (SPA) written in TypeScript, utilizing client-side routing within a Nrwl Nx Monorepo.
- Use React as a Single Page Application (SPA).
- Use TypeScript.
- Use client-side routing.
- Organize within a Nrwl Nx Monorepo structure.

- Package Management: Use pnpm exclusively for installing packages.
- Use pnpm exclusively when installing packages.

- Code Quality: Write clean, modern, type-safe React functional components that adhere to best practices, emphasizing security, robustness, maintainability, readability, separation of concerns, and the DRY principle.
- Write clean React functional components.
- Write modern React functional components.
- Ensure components are type-safe.
- Adhere to best practices in code.
- Emphasize security.
- Emphasize robustness.
- Emphasize maintainability.
- Emphasize readability.
- Follow separation of concerns.
- Follow the DRY principle.

- State Management: Utilize React hooks such as useState and useEffect for state management and handling side effects.
- Use React hooks (e.g., useState) for state management.
- Use React hooks (e.g., useEffect) for handling side effects.

- Styling: Apply Tailwind CSS classes for component styling and prefer shadcn/ui components for consistent UI elements. Import shadcn components from '@erisfy/shadcnui'.
- Apply Tailwind CSS classes for styling.
- Prefer shadcn/ui components for a consistent UI.
- Import shadcn components from '@erisfy/shadcnui'.

- Monorepo Organization: Follow the Nx monorepo structure for organizing applications and libraries.
- Follow Nx monorepo structure for organizing applications and libraries.

- TypeScript Practices: Adhere to TypeScript best practices, including strict typing and the use of interfaces.
- Adhere to TypeScript best practices (strict typing).
- Use interfaces only when extending or merging object definitions.

- Testing: Implement Vitest for unit testing and Playwright for end-to-end testing.
- Implement Vitest for unit testing.
- Implement Playwright for end-to-end testing.

- Accessibility and Responsiveness: Ensure all components are accessible and responsive.
- Ensure all components are accessible.
- Ensure all components are responsive.

- Component Exports: Prefer named (explicit) exports over default exports for clarity and better tooling support.
- Use named (explicit) exports for clarity.

- Type Definitions: Prefer types for defining object shapes, unions, intersections, and lightweight aliases. Use interfaces only when absolutely necessary, such as when extending or merging object definitions.
- Prefer 'type' for object shapes, unions, intersections, and lightweight aliases.
- Use 'interface' only when absolutely necessary.

- Imports: Prefer direct named imports, such as importing FC from React, instead of using React.FC. Use relative imports for files within the same project.
- Prefer direct named imports (e.g., import { FC } from 'react').
- Use relative imports for files within the same project.

- Styling Consistency: Utilize shadcn theme variables for styling to ensure consistency and ease of customization. Common theme variables include bg-background, text-foreground, primary, primary-foreground, secondary, muted, and accent.
- Utilize shadcn theme variables for consistent styling.
- Use theme variables like bg-background, text-foreground, primary, primary-foreground, secondary, muted, and accent.

- Component Design: Prioritize flexibility and maintainability by extending native HTML element props. Use composition to break down complex components into smaller, reusable parts, allowing customization through props, slots, or the children prop. Keep components as stateless as possible, delegating state management to parent components or using React Context when necessary. Follow accessibility best practices and ensure styles are modular and reusable. Write concise, modular, and DRY components, using named exports to promote clarity and reusability.
- Extend native HTML element props for flexibility.
- Use composition to break down complex components.
- Allow customization through props, slots, or children.
- Keep components as stateless as possible.
- Delegate state management to parent components or React Context.
- Follow accessibility best practices.
- Ensure styles are modular and reusable.
- Write concise, modular, and DRY components.
- Use named exports to promote clarity and reusability.

- When creating Storybook stories be sure to use the latest syntax, use StoryObj, tags: ['autodocs'], cover the possible component use caseses and make sure the stories have JSDoc comments that explain what they are, the user does not to be told they are stories but what they demonstrate.
- Use the latest syntax in Storybook stories.
- Use StoryObj in Storybook stories.
- Add tags: ['autodocs'] to stories.
- Cover various component use cases in stories.
- Include JSDoc comments to explain what the stories demonstrate.

- Icons: Use lucide-react for icons.
- Use lucide-react for icons.
