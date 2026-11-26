# Proposal

## Why

Para que cualquiera pueda usar el selector de ganadores desde el navegador sin instalar nada, la aplicación debe publicarse sola en GitHub Pages. Solo debe publicarse una versión que haya pasado el linter y las pruebas.

## What Changes

- El workflow de GitHub Actions construye y despliega la aplicación en GitHub Pages en cada `push` a `main`.
- El despliegue solo se ejecuta si el linter y las pruebas pasan; si fallan, no se publica nada.
- Los pull requests solo ejecutan las verificaciones y no despliegan.
- Se configura la ruta base de Vite para que la aplicación funcione en el subdirectorio del repositorio.
- El `README.md` incluye el enlace a la aplicación publicada.

### Decisiones

- **Un solo workflow:** el despliegue vive en `ci.yml` como un job con `needs` sobre la verificación, para que sea imposible desplegar sin pasar las pruebas.
- **Acciones oficiales de Pages:** `actions/upload-pages-artifact` y `actions/deploy-pages`, con permisos mínimos y sin secretos ni tokens.
- **Un despliegue a la vez:** un grupo de concurrencia evita que dos despliegues se pisen, sin cancelar uno en curso.
- **Configuración manual única:** GitHub Pages se habilita una sola vez en el repositorio con GitHub Actions como origen; no se automatiza desde el código.
- **URL publicada:** `https://fefi95.github.io/nov-ql-2026-base/`.

## Capabilities

### New Capabilities
- `despliegue-continuo`: publicación automática en GitHub Pages solo tras pasar las verificaciones.

### Modified Capabilities

## Impact

- `.github/workflows/ci.yml`, `vite.config.js` (ruta base) y `README.md`.
- Configuración externa: habilitar GitHub Pages con GitHub Actions como origen.
- Sin dependencias nuevas.
