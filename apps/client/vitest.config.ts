/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: ['./src/setup-tests.ts'],
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    typecheck: {
      enabled: true,
      tsconfig: './tsconfig.json'
    }
  },
  resolve: {
    alias: {
      '@erisfy/landing': resolve(__dirname, 'src/app/pages/landing/__tests__/__mocks__/landing.tsx'),
      '@erisfy/shadcnui-blocks': resolve(__dirname, 'src/app/pages/landing/__tests__/__mocks__/shadcnui-blocks.tsx'),
      '@erisfy/shadcnui': resolve(__dirname, 'src/app/pages/landing/__tests__/__mocks__/shadcnui.tsx'),
    },
  },
});
