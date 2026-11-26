// @vitest-environment node
import { readFileSync, readdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// jsdom does not compute Svelte styles, so the theme is checked from the source files.
const srcDir = fileURLToPath(new URL('.', import.meta.url));

const readSource = (path) => readFileSync(join(srcDir, path), 'utf8');

const svelteFiles = readdirSync(srcDir, { recursive: true })
  .filter((path) => path.endsWith('.svelte'))
  .sort();

const rootBlock = (css) => css.match(/:root\s*\{([^}]*)\}/)?.[1] ?? '';

const withoutRootBlock = (css) => css.replace(/:root\s*\{[^}]*\}/, '');

const cssVariable = (css, name) =>
  rootBlock(css)
    .match(new RegExp(`--${name}\\s*:\\s*([^;]+);`))?.[1]
    .trim();

const styleBlocks = (svelte) =>
  [...svelte.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(([, css]) => css).join('\n');

const withoutComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, '');

const namedColors = [
  'black',
  'white',
  'red',
  'green',
  'blue',
  'yellow',
  'orange',
  'purple',
  'pink',
  'gray',
  'grey',
  'brown',
  'navy',
  'teal',
];

const hardcodedColorPattern = new RegExp(
  [
    '#[0-9a-f]{3,8}\\b',
    '\\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch|color)\\(',
    `:[^;{}]*\\b(?:${namedColors.join('|')})\\b`,
  ].join('|'),
  'gi',
);

const hardcodedColors = (css) => withoutComments(css).match(hardcodedColorPattern) ?? [];

const hexToHue = (hex) => {
  const full = hex.length === 4 ? [...hex.slice(1)].map((c) => c + c).join('') : hex.slice(1, 7);
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const max = Math.max(r, g, b);
  const delta = max - Math.min(r, g, b);
  if (delta === 0) return null;
  const hue =
    max === r ? ((g - b) / delta) % 6 : max === g ? (b - r) / delta + 2 : (r - g) / delta + 4;
  return (hue * 60 + 360) % 360;
};

describe('base color theme', () => {
  const appCss = readSource('app.css');

  it('defines an orange base color as a CSS variable in src/app.css', () => {
    const base = cssVariable(appCss, 'color-base');

    expect(base).toMatch(/^#[0-9a-f]{3,8}$/i);
    const hue = hexToHue(base);
    expect(hue).toBeGreaterThanOrEqual(15);
    expect(hue).toBeLessThanOrEqual(45);
  });

  it('uses only CSS variables for colors outside the :root block of src/app.css', () => {
    expect(hardcodedColors(withoutRootBlock(appCss))).toEqual([]);
  });

  it('finds the Svelte components to check', () => {
    expect(svelteFiles.length).toBeGreaterThan(0);
  });

  it.each(svelteFiles)('%s uses only CSS variables for colors', (path) => {
    expect(hardcodedColors(styleBlocks(readSource(path)))).toEqual([]);
  });
});
