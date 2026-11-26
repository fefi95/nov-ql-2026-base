// @vitest-environment node
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import config from '../vite.config.js';

const readRoot = (path) =>
  readFileSync(fileURLToPath(new URL(`../${path}`, import.meta.url)), 'utf8');
const workflow = readRoot('.github/workflows/ci.yml');
const deployJob = workflow.slice(workflow.indexOf('\n  deploy:'));

describe('GitHub Pages base path', () => {
  it('serves the production build from the repository subdirectory', () => {
    expect(config({ command: 'build' }).base).toBe('/nov-ql-2026-base/');
  });

  it('keeps the root path in development and tests', () => {
    expect(config({ command: 'serve' }).base).toBe('/');
  });
});

describe('deploy workflow', () => {
  it('runs verification on pull requests and pushes to main', () => {
    expect(workflow).toMatch(/pull_request:\s*\n\s*branches: \[main\]/);
    expect(workflow).toMatch(/push:\s*\n\s*branches: \[main\]/);
  });

  it('deploys only after verification passes', () => {
    expect(deployJob).toMatch(/needs: verify/);
  });

  it('deploys only on push, never on pull requests', () => {
    expect(deployJob).toMatch(/if: github\.event_name == 'push'/);
  });

  it('publishes with the official Pages actions and no secrets', () => {
    expect(workflow).toContain('actions/upload-pages-artifact');
    expect(workflow).toContain('actions/deploy-pages');
    expect(workflow).not.toMatch(/secrets\./);
  });
});

describe('README', () => {
  it('links to the published app', () => {
    expect(readRoot('README.md')).toContain('https://fefi95.github.io/nov-ql-2026-base/');
  });
});
