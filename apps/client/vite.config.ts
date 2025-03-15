/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/client',
  base: '/erisfy/',
  server: {
    port: 4200,
    host: 'localhost'
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [
    react({
      // Proper source map support for React components
      jsxRuntime: 'automatic',
      babel: {
        plugins: [],
        babelrc: false,
        configFile: false,
      }
    }),
    nxViteTsPaths(),
    nxCopyAssetsPlugin([
      '*.md',
      'mockServiceWorker.js'
    ])
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "../../../libs/common-tailwind/src/preflight.css"; @import "../../../libs/common-tailwind/src/shadcn-theme.css";`,
      },
    },
  },
  define: {
    'process.env': {},
    global: {},
  },
  build: {
    outDir: '../../dist/apps/client',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    sourcemap: true,
    rollupOptions: {
      output: {
        sourcemapExcludeSources: false
      }
    }
  },
  test: {
    watch: false,
    globals: true,
    environment: 'jsdom',
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters: ['default'],
    coverage: {
      reportsDirectory: '../../coverage/apps/client',
      provider: 'v8',
    },
  },
  // Ensure proper optimization settings for debugging
  optimizeDeps: {
    exclude: []
  }
});
