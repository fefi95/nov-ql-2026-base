import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import svelteConfig from './svelte.config.js';

export default [
  { ignores: ['dist/', 'node_modules/', '.agents/', '.claude/', 'openspec/'] },
  js.configs.recommended,
  ...svelte.configs.recommended,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    files: ['**/*.svelte', '**/*.svelte.js'],
    languageOptions: {
      parserOptions: { svelteConfig },
    },
  },
  {
    files: ['**/*.test.js', 'src/test-setup.js'],
    languageOptions: {
      globals: globals.vitest,
    },
  },
];
