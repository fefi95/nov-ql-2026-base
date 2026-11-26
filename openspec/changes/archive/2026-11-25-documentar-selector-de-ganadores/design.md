# Design

## Context

Toda la lógica y la interfaz viven en `src/App.svelte`, mezcladas, sin pruebas y con colores fijos en los estilos. `AGENTS.md` exige estilo funcional, lógica en módulos `.js` sin dependencias de Svelte, componentes pequeños, inyección del generador aleatorio y pruebas automatizadas.

## Goals / Non-Goals

**Goals:**
- Separar lógica y presentación sin cambiar el comportamiento visible.
- Poder probar la lógica con un generador aleatorio determinista.
- Dejar todos los colores en variables CSS.

**Non-Goals:**
- Nuevas funciones, cambios visuales o persistencia de datos.

## Decisions

- **Lógica pura en `src/lib/`**: `participants.js` (`addParticipant`, `removeParticipant`) y `draw.js` (`drawWinner(participants, random)`). Son funciones puras e inmutables que devuelven datos nuevos. Alternativa descartada: un store de Svelte, porque mezcla lógica con el framework.
- **Estado en `App.svelte`**: solo guarda el estado, llama a las funciones puras y pasa datos y eventos a los componentes. Inyecta `Math.random` en el borde.
- **Componentes**: `ParticipantForm`, `ParticipantList`, `DrawButton` y `WinnerCard`, cada uno con una sola responsabilidad y comunicación por props.
- **Pruebas con Vitest + Testing Library** (aprobadas por el equipo), con jsdom. Las pruebas de componentes verifican lo que ve y hace el usuario.
- **Colores**: se agregan variables (`--color-base-hover`, `--color-surface`, `--color-shadow`, etc.) en `src/app.css` con los mismos valores actuales.

## Risks / Trade-offs

- Más archivos para una app pequeña, a cambio de claridad y pruebas.
- Mover colores a variables podría alterar la apariencia si se cambia un valor; se conservan los valores exactos.
