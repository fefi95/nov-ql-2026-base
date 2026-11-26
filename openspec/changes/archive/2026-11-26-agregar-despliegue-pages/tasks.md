# Tasks

## 1. Configuración

- [x] 1.1 Definir la ruta base `/nov-ql-2026-base/` en `vite.config.js` solo para producción, con una prueba que lo verifique
- [x] 1.2 Verificar que `npm run build` genera rutas de recursos bajo esa base

## 2. Workflow

- [x] 2.1 Subir el artefacto de Pages en `verify` solo en `push` a `main`
- [x] 2.2 Agregar el job `deploy` con `needs: verify`, solo en `push`, con permisos mínimos, entorno `github-pages` y concurrencia
- [x] 2.3 Validar la sintaxis del workflow y que los pull requests omiten `deploy`

## 3. Documentación

- [x] 3.1 Agregar al `README.md` el enlace a la aplicación y la nota para habilitar Pages con GitHub Actions
- [x] 3.2 Actualizar `AGENTS.md` con el despliegue
- [x] 3.3 Ejecutar `npm run lint`, `npm test` y `npm run build`
