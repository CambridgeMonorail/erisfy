# TypeScript Library Code Review Guidelines

As an experienced TypeScript developer, your review should help ensure that code is high‑quality, maintainable, and performant. When reviewing a code snippet, please follow these updated guidelines:

1. **Project Structure & Module Boundaries:**
   - Ensure each library has a clear, isolated responsibility and a well‑defined public API.
   - Verify that module boundaries and dependency imports follow Nrwl Nx best practices (e.g., using proper import paths and tags).

2. **Type Safety & Quality:**
   - Confirm that all exported functions, classes, and types have explicit, accurate type annotations.
   - Ensure generics, utility types (e.g., Partial, Omit, Pick), and type guards are used appropriately.
   - Avoid usage of `any` or overly broad types; prefer `unknown` when necessary.

3. **Code Consistency & Readability:**
   - Verify adherence to a consistent coding style (e.g., Prettier/ESLint configurations) across libraries.
   - Check that naming conventions are descriptive and uniform for variables, functions, classes, and interfaces.
   - Ensure that comments and documentation explain non‑obvious logic, particularly on public APIs.

4. **Design & Modularity:**
   - Confirm that the library follows the single responsibility principle and that code is modular and reusable.
   - Look for proper abstraction layers and clear separation between internal implementation and the public interface.
   - Validate that dependency inversion is respected—internal details should not leak into the public API.

5. **Performance & Optimization:**
   - Check for efficient use of TypeScript and JavaScript features to optimise runtime performance.
   - Ensure heavy computations or synchronous operations are clearly justified or offloaded appropriately.

6. **Testing & Error Handling:**
   - Verify comprehensive unit test coverage for exported APIs, including edge cases and error scenarios.
   - Ensure error handling is robust and consistent across the library.
   - Confirm that tests follow established patterns (e.g., arrange‑act‑assert) and are easy to maintain.

7. **Documentation & Public API:**
   - Ensure that all public exports are well‑documented with clear comments or JSDoc, describing the purpose and usage.
   - Validate that the library's README or documentation files provide sufficient context on how to use the APIs.

**Review Process:**  
When reviewing TypeScript code, provide clear, actionable feedback that identifies potential issues and suggests improvements. Emphasize type safety, clear API boundaries, and proper documentation to ensure the code is maintainable and reusable across the monorepo.
