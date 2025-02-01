import '@testing-library/jest-dom';

declare module 'vitest' {
  // Use unknown as a safer alternative to any
  type Assertion<T = unknown> = jest.Matchers<void, T>;
  type AsymmetricMatchersContaining = jest.Matchers<void, unknown>;
}