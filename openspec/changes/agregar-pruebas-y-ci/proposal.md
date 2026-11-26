# Proposal

## Why

Hoy nada avisa si un cambio rompe la aplicación. Antes de agregar el podio y la cuenta regresiva necesitamos *guard rails*: pruebas que verifiquen lo que dicen las especificaciones, un linter/formatter y un workflow de CI que los ejecute en cada cambio.

## What Changes

- Completar las pruebas para que cubran la especificación: un único ganador, que el ganador siempre sea de la lista, que no se pueda sortear sin participantes y que se aplique el color base.
- Agregar ESLint y Prettier (con sus plugins para Svelte) y un comando único para ejecutarlos.
- Agregar un workflow de GitHub Actions que ejecuta linter y pruebas en cada `push` y en cada pull request hacia `main`.
- Documentar en `README.md` y `AGENTS.md` cómo ejecutar pruebas y linter.
- Comprobar que las pruebas detectan errores rompiendo código a propósito.
- No cambia el comportamiento visible de la aplicación.

## Capabilities

### New Capabilities
- `verificacion-automatica`: pruebas, linter y CI que protegen cada cambio.

### Modified Capabilities
- `selector-de-ganadores`: el sorteo debe elegir un único ganador que siempre pertenece a la lista (escenarios nuevos, verificables con pruebas).

## Impact

- Dependencias de desarrollo nuevas (a confirmar con el equipo, ya aprobadas en la conversación): `eslint`, `eslint-plugin-svelte`, `prettier`, `prettier-plugin-svelte` y sus dependencias directas (por ejemplo `@eslint/js`, `globals`).
- Archivos nuevos: configuración de ESLint y Prettier, `.github/workflows/ci.yml`.
- Documentación: `README.md`, `AGENTS.md`.
- Pruebas: nuevas pruebas en `src/`.
