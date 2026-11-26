# Design

## Context

Ya existen Vitest, Testing Library y pruebas unitarias y de componentes (PR #3). Falta cubrir explícitamente "un único ganador de la lista" y el color base, y no hay linter, formatter ni CI. No existe `.github/`.

## Goals / Non-Goals

**Goals:**
- Pruebas ligadas a los escenarios de las especificaciones.
- Un comando para pruebas (`npm test`) y uno para el linter (`npm run lint`).
- CI que falla si el linter o las pruebas fallan.

**Non-Goals:**
- Cobertura de código mínima, despliegue (otro ticket) o pruebas de navegador reales.

## Decisions

- **ESLint + `eslint-plugin-svelte` y Prettier + `prettier-plugin-svelte`**, con `npm run lint` que ejecuta `eslint .` y `prettier --check .`. Se agrega `npm run format` para corregir. Alternativa descartada: solo Prettier, porque no detecta errores de código.
- **Prueba del ganador siempre de la lista**: se prueba con la función de sorteo, inyectando varios valores del generador aleatorio (0, valores intermedios y cercano a 1) sobre listas de distintos tamaños. Así es determinista.
- **Prueba del color base**: jsdom no calcula estilos de Svelte. La prueba lee `src/app.css` y comprueba que define las variables del color base naranja, y comprueba que los archivos `.svelte` no usan colores fijos (solo `var(--…)`). Esto también hace cumplir la regla de `AGENTS.md`.
- **Workflow `.github/workflows/ci.yml`**: eventos `push` y `pull_request` hacia `main`, Node 22 con caché de npm, pasos `npm ci`, `npm run lint`, `npm test` y `npm run build`.
- **Comprobación de las pruebas**: se rompe código a propósito en tres puntos (ganador fuera de la lista, sorteo sin participantes, color base) y se verifica que las pruebas fallan; luego se revierte.

## Risks / Trade-offs

- Nuevas dependencias de desarrollo y reglas de linter pueden marcar código existente; se corrige sin cambiar el comportamiento.
- La prueba de colores lee archivos de texto: es menos fiel que una prueba en navegador, pero es determinista y barata.
