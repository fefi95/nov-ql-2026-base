# Design

## Context

`.github/workflows/ci.yml` ya ejecuta `npm ci`, lint, pruebas y construcción en cada `push` y pull request hacia `main`, en un job `verify`. No hay despliegue. `vite.config.js` no define `base`, por lo que los recursos fallarían bajo `/nov-ql-2026-base/`.

## Goals / Non-Goals

**Goals:**
- Publicar en GitHub Pages solo versiones verificadas, sin pasos manuales.
- Que los pull requests nunca desplieguen.

**Non-Goals:**
- Entornos de prueba (preview) por pull request, dominio propio y automatizar la activación de Pages.

## Decisions

- **Mismo workflow, job `deploy` con `needs: verify`:** garantiza el orden y que un fallo del linter o de las pruebas detenga el despliegue. Alternativa descartada: un workflow separado disparado por `workflow_run`, porque duplica configuración y es más difícil de seguir.
- **Condición `github.event_name == 'push'`** en `deploy`: los pull requests ejecutan `verify` y omiten `deploy`.
- **`verify` sube el artefacto de Pages** (`actions/upload-pages-artifact` sobre `dist/`) solo en `push`, y `deploy` lo publica con `actions/deploy-pages`. Permisos: `contents: read` por defecto y `pages: write` e `id-token: write` solo en `deploy`, con el entorno `github-pages`.
- **Concurrencia:** grupo `pages` con `cancel-in-progress: false`.
- **Ruta base:** `base: '/nov-ql-2026-base/'` en `vite.config.js`, solo para la construcción de producción (en desarrollo y pruebas sigue `/`).
- **Sin secretos:** no se usan tokens propios, solo el token integrado del workflow.

## Risks / Trade-offs

- Si Pages no está habilitado con GitHub Actions como origen, el despliegue falla; es un paso manual único que se documenta en el README.
- Una ruta base fija ata la configuración al nombre del repositorio; si cambia, hay que actualizarla.
- La primera publicación solo se puede comprobar tras fusionar en `main`.
