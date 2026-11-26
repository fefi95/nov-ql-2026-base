# AGENTS.md

## Project description

Winner selector: a frontend-only web app where the user adds participants and draws one random winner. Built with Svelte 5 (runes) and Vite. There is no backend, and nothing is persisted between sessions.

- The base UI color is orange. It is chosen by the developer, never by the end user, and is defined as CSS variables at the top of `src/app.css`. Change the theme only there.
- Specs live in `openspec/` (`spec-driven` schema). Write all OpenSpec artifacts in Spanish, keeping the structural headings and `SHALL`/`MUST` keywords in English.
- **Every new change is specified first with OpenSpec**, before writing code: `/openspec-propose` → review → `/openspec-apply-change` → `/openspec-archive-change`. Do not implement a change that has no OpenSpec proposal.

## Commands

Requires Node.js >= 22.20.0.

- `npm install`: install dependencies
- `npm run dev`: start the dev server at http://localhost:5173
- `npm run build`: production build into `dist/`
- `npm run preview`: serve the production build
- `npm test`: run the test suite once (Vitest + Testing Library, jsdom)
- `npm run lint`: run ESLint (with `eslint-plugin-svelte`) and `prettier --check`; fails on any error or unformatted file
- `npm run format`: format all files with Prettier and apply ESLint auto-fixes

CI (`.github/workflows/ci.yml`) runs `npm ci`, `npm run lint`, `npm test` and `npm run build` on every push and pull request to `main`. Run the same commands locally before declaring a task finished.

On every push to `main`, the same workflow deploys the build to GitHub Pages (`https://fefi95.github.io/nov-ql-2026-base/`), and only if verification passed. Pull requests never deploy. The production build uses the base path `/nov-ql-2026-base/` (see `vite.config.js`).

## Code design

- **Functional style.** Prefer pure functions, immutable data and expressions over mutation and loops with side effects. Keep side effects (DOM, randomness, I/O) at the edges.
- **Easy to understand.** Each function does one thing, has a name that says what it does, and is short enough to read without scrolling. Prefer clear code over clever code. Add a comment only to explain why, not what.
- **Components over mixed code.** Never mix business logic with presentation. Logic lives in plain `.js` modules with no Svelte or DOM imports. Svelte components only render state and forward events. Split the UI into small components with a single responsibility (e.g. participant form, participant list, winner card).
- **SOLID.**
  - Single responsibility: one reason to change per module or component.
  - Depend on abstractions: components and logic receive what they need as props or arguments instead of importing concrete implementations.
  - Inject dependencies, e.g. the random number generator is passed into the draw function so tests can replace it.
  - Keep interfaces small and focused.
  - Extend behavior by adding code, not by editing working modules.

## Tests

- Every change in behavior includes automated tests. A task is not done if tests fail or are missing.
- Test the pure logic (adding or removing participants, drawing a winner) with unit tests, injecting a deterministic random generator.
- Test components through what the user sees and does, not through their internals.
- Tests must be deterministic: no real randomness and no real waits.
- `src/theme.test.js` checks that the orange base color lives in `src/app.css` and that components use only `var(--…)` colors.
- Run the full test suite and the linter before declaring a task finished.

## What the AI must not do

- Do not add dependencies without asking.
- Do not put logic inside Svelte components.
- Do not let the end user choose the theme color, and do not hardcode colors outside the CSS variables.
- Do not change the behavior of the app while refactoring.
- Do not commit, push or open PRs unless asked.
