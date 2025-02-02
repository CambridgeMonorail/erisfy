import { defineConfig } from 'vite';

export default defineConfig({
  // ...existing code...
  test: {
    // ...existing test config...
    setupFiles: ['./libs/landing/test-setup.ts'],
    globals: true,
    environment: 'jsdom',
  },
});
