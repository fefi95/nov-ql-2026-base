# Selector de ganadores — Coding Dojo

Proyecto base para el Coding Dojo de desarrollo asistido por IA.

Viene casi vacío a propósito: la aplicación la generas tú, con ayuda de la IA.

## Requisitos

- Node.js **22.20.0** o superior
- Un asistente de código: OpenCode, Claude Code, Codex o GitHub Copilot
- GitHub CLI (`gh`) y una cuenta de GitHub

## Instrucciones

Los tickets de cada reto están en [`instrucciones/`](instrucciones/):

| Reto | Carpeta                                                | Tema                                          |
| ---- | ------------------------------------------------------ | --------------------------------------------- |
| #1   | [`tarea-1/`](instrucciones/tarea-1/)                   | Vibe coding: generar el selector de ganadores |
| #2   | [`tarea-2/`](instrucciones/tarea-2/)                   | Guard rails y Spec Driven Development         |
| #3   | [`tarea-3-optional/`](instrucciones/tarea-3-optional/) | Backend e historial _(opcional)_              |

## Aplicación publicada

https://fefi95.github.io/nov-ql-2026-base/

Se despliega sola en GitHub Pages con cada `push` a `main`, solo si el linter y las pruebas pasan. Los pull requests únicamente ejecutan las verificaciones. Para habilitarlo en un repositorio nuevo: _Settings → Pages → Source: GitHub Actions_.

## Primeros pasos

```sh
npm install
npx openspec --version
```

## Pruebas y linter

```sh
npm test         # ejecuta todas las pruebas (Vitest + Testing Library)
npm run lint     # ESLint + Prettier en modo comprobación
npm run format   # formatea el código y aplica correcciones automáticas de ESLint
npm run build    # compilación de producción
```

Las pruebas son deterministas: el sorteo recibe el generador aleatorio como argumento, así que las pruebas lo reemplazan por uno fijo.

GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) ejecuta `npm ci`, `npm run lint`, `npm test` y `npm run build` en cada `push` y en cada pull request hacia `main`. Si algo falla, el workflow termina en rojo.

## ¿Qué incluye?

| Archivo / carpeta                    | Para qué sirve                                                                        |
| ------------------------------------ | ------------------------------------------------------------------------------------- |
| `AGENTS.md`                          | Las reglas del proyecto para la IA. **Está vacío: lo llenas tú.**                     |
| `CLAUDE.md`                          | Hace que Claude Code lea `AGENTS.md`.                                                 |
| `openspec/`                          | Especificaciones del proyecto con [OpenSpec](https://github.com/Fission-AI/OpenSpec). |
| `.agents/skills/`, `.claude/skills/` | Comandos de OpenSpec para OpenCode, Claude Code, Codex y GitHub Copilot.              |
| `instrucciones/`                     | Los tickets de cada reto.                                                             |

## Flujo con OpenSpec

Desde tu agente de IA:

1. `/openspec-propose <cambio>` — crea la propuesta, las specs y las tareas
   (en Codex: `$openspec-propose`)
2. Revisa la propuesta
3. `/openspec-apply-change` — implementa el cambio
4. `/openspec-archive-change` — actualiza `openspec/specs/`

Las especificaciones se escriben en español (ver `openspec/config.yaml`).
