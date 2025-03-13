declare global {
  interface Window {
    __env?: Record<string, string>;
  }
}

/**
 * Gets an environment variable with a fallback value
 */
export const getEnvVar = (key: string, fallback: string): string => {
  // Check process.env first (for Node.js environments)
  if (typeof process !== 'undefined' && process.env && process.env[key]) {
    return process.env[key] as string;
  }

  // Check window.__env for browser environments
  if (typeof window !== 'undefined' && window.__env && key in window.__env) {
    return window.__env[key];
  }

  // Check Vite-specific environment variables (for browser environments)
  // @ts-expect-error Vite environment typing
  if (typeof window !== 'undefined' && window.VITE_ENV && key in window.VITE_ENV) {
    // @ts-expect-error Vite environment typing
    return window.VITE_ENV[key] ?? fallback;
  }

  return fallback;
};

/**
 * Gets the base API URL from environment variables
 */
export const getApiBaseUrl = (): string => {
  return getEnvVar('VITE_API_BASE_URL', 'http://localhost:3001/api');
};
