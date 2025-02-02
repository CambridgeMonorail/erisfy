import { defineConfig } from 'vitest/config';
import * as path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
    watch: false,
    deps: {
      inline: [/@erisfy\/.*/],
    },
    coverage: {
      enabled: process.env.CI === 'true',
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'coverage/**',
        'dist/**',
        '**/index.ts',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.stories.tsx',
      ],
    },
    reporters: ['default', 'junit'],
    outputFile: {
      junit: './coverage/junit.xml',
    },
  },
  resolve: {
    alias: {
      '@erisfy/shadcnui': path.resolve(__dirname, '../shadcnui/src'),
      '@erisfy': path.resolve(__dirname, '../'),
    },
  },
});
