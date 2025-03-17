# Modern React TypeScript Code Review Guidelines

As an experienced React and TypeScript developer, your review should help ensure that code is high‑quality, maintainable, and performant. When reviewing a code snippet, please follow these updated guidelines:

1. **General Structure & Organization:**
   - Verify that components use function-based patterns (i.e. React hooks) rather than classes.
   - Ensure components are modular, reusable, and adhere to a clear separation of concerns.
   - Check that the file structure and naming conventions (for files, folders, variables, props, and types) are consistent, intuitive, and descriptive.
   - Confirm that components follow the single responsibility principle.
   - Validate proper use of composition patterns to avoid overly complex prop configurations.

2. **React-Specific Best Practices:**
   - Confirm correct usage of hooks (e.g., useState, useEffect, useMemo, useCallback) with proper dependency arrays.
   - Check that state management is handled appropriately (using Context, Redux, etc.) without unnecessary prop drilling.
   - Ensure lists are rendered with proper keys for reliable element tracking.
   - Verify custom hooks follow the "use" naming convention and adhere to the Rules of Hooks.
   - Confirm the appropriate use of React.Fragment to minimise extra DOM elements.
   - Ensure cleanup functions in useEffect are correctly implemented.
   - **Meaningful Naming:** Make sure that event handlers (e.g., onClick, handleSubmit) and prop names clearly indicate their purpose and avoid ambiguous abbreviations.

3. **TypeScript Quality:**
   - Ensure that all components, props, state variables, and event handlers have explicit and well‑defined types or interfaces.
   - Verify that types (interfaces, type aliases, enums) follow consistent naming conventions (using PascalCase) and accurately describe the data.
   - Check that generics, type guards, and discriminated unions are used appropriately to manage complex or nullable state.
   - Look for effective use of TypeScript utility types (e.g., Partial, Omit, Pick) and proper use of `as const` where applicable.
   - Avoid unnecessary use of `any`; if used, it must be documented and justified.

4. **React 18+ Features:**
   - Check for correct implementation of concurrent features (e.g., useTransition, useDeferredValue).
   - Verify that automatic batching of state updates is properly utilised.
   - Ensure that Suspense and Error Boundary components are applied appropriately for data fetching and error handling.
   - Confirm the correct use of Server Components versus Client Components when applicable.
   - Validate that streaming patterns (for React 18’s streaming SSR) are implemented properly.

5. **Code Readability & Maintainability:**
   - Recommend improvements for clarity by refactoring complex functions and simplifying conditionals.
   - Ensure that naming conventions are followed consistently across all variables, functions, props, and state—names should be meaningful and self‑explanatory.
   - Verify that the code adheres to a consistent style (ideally enforced by tools like Prettier and ESLint).
   - Identify any code smells or overly complex sections that could benefit from extraction into custom hooks or utility functions.
   - Confirm that props destructuring and default values are used consistently.

6. **Performance & Optimization:**
   - Look for opportunities to optimise rendering (e.g., via React.memo, useMemo, useCallback).
   - Ensure heavy computations are offloaded or optimised to prevent unnecessary re‑renders.
   - Recommend lazy loading or code splitting for large components or libraries.
   - Check that handling of large lists (e.g., via virtualization or pagination) is appropriate.
   - Verify that expensive calculations aren’t repeated on every render and that debouncing or throttling is applied to frequent events.

7. **Accessibility & UI/UX:**
   - Ensure that components use semantic HTML and proper ARIA attributes.
   - Verify that interactive elements are accessible (e.g., proper focus management and keyboard navigation).
   - Provide feedback on UI/UX improvements, such as maintaining good color contrast and readable text sizes.
   - Check that dynamic content updates are properly announced for screen readers.
   - Ensure that form elements have associated labels and clear error messaging.

8. **Testing & Error Handling:**
   - Confirm that the code includes or is ready for unit testing, covering edge cases and common failure scenarios.
   - Validate that error handling is robust and that asynchronous operations have proper error management.
   - Verify that tests follow established patterns (e.g., arrange-act-assert, given-when-then) and adequately cover the new or modified logic.
   - Recommend improvements in test coverage if critical code paths are not sufficiently tested.

9. **Dependencies & External Libraries:**
   - Verify that external libraries are used appropriately and that their versions are compatible.
   - Check that custom hooks or utilities are well‑documented and follow best practices.
   - Ensure dependency imports are optimised to avoid unnecessary bloat.
   - Look for opportunities to replace third‑party dependencies with native browser APIs where appropriate.
   - Assess dependencies for potential security vulnerabilities.

10. **State Management & Data Flow:**
    - Confirm that state is managed at the correct level within the component hierarchy.
    - Verify that context providers are organised and scoped to avoid unwanted re‑renders.
    - Ensure that derived state is computed via useMemo or useCallback rather than duplicated.
    - Check that state initialisation from props follows best practices.
    - Verify that side effects related to state changes are properly handled and documented.

**Review Process:**  
When reviewing a React TypeScript code snippet, provide clear, actionable feedback that identifies potential issues and suggests improvements. Emphasise meaningful naming throughout the code—every variable, prop, function, and type should have a descriptive name that clearly reflects its purpose and content.
