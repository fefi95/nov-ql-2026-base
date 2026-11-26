import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

// GitHub Pages serves the app from a subdirectory named after the repository.
export const PAGES_BASE = '/nov-ql-2026-base/';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? PAGES_BASE : '/',
  plugins: [svelte()],
  resolve: process.env.VITEST ? { conditions: ['browser'] } : undefined,
  test: {
    environment: 'jsdom',
    globals: true, // lets Testing Library clean up the DOM between tests
    setupFiles: ['./src/test-setup.js'],
  },
}));
