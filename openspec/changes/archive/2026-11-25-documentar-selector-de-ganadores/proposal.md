# Proposal

## Why

La aplicación ya existe pero su comportamiento no está especificado. A partir de ahora todo cambio se especifica primero con OpenSpec, por lo que necesitamos una especificación base del comportamiento **actual**. Además, el código actual mezcla lógica y presentación en un solo componente y no tiene pruebas, lo que incumple las reglas de `AGENTS.md`.

## What Changes

- Documentar en `openspec/specs/` el comportamiento actual: agregar participantes, color base de la interfaz y sorteo de un único ganador.
- Refactorizar el código sin cambiar el comportamiento: la lógica pasa a módulos `.js` puros y la interfaz se divide en componentes pequeños.
- Agregar pruebas automatizadas (unitarias y de componentes) y el script `npm test`.
- Mover los colores que estaban fijos en `App.svelte` a variables CSS en `src/app.css`.
- Actualizar `AGENTS.md`: todo cambio nuevo se especifica primero con OpenSpec y se documenta el comando de pruebas.

## Capabilities

### New Capabilities
- `selector-de-ganadores`: agregar y quitar participantes, aplicar el color base definido por el desarrollador y sortear un único ganador.

### Modified Capabilities

## Impact

- Código: `src/App.svelte` se divide en componentes; nueva lógica en `src/lib/`.
- Estilos: nuevas variables CSS en `src/app.css`.
- Dependencias de desarrollo (aprobadas): `vitest`, `jsdom`, `@testing-library/svelte`, `@testing-library/user-event`, `@testing-library/jest-dom`.
- Documentación: `AGENTS.md`.
