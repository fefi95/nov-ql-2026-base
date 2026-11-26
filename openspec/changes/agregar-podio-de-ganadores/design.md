# Design

## Context

El sorteo actual elige un solo ganador con `drawWinner(participants, random)` y `App.svelte` guarda un único `winner`. El botón se deshabilita sin participantes. Siguen aplicando las reglas de `AGENTS.md`: lógica pura en `src/lib/`, componentes que solo renderizan y generador aleatorio inyectado. La propuesta `agregar-pruebas-y-ci` debe aplicarse antes, para que el CI proteja este cambio.

## Goals / Non-Goals

**Goals:**
- Sortear 1 a 3 ganadores distintos con igual probabilidad.
- Mostrar el resultado como ganador único o como podio.
- Validar la cantidad con un mensaje claro.

**Non-Goals:**
- Más de 3 ganadores, premios por lugar, animaciones y la cuenta regresiva (Ticket #4).

## Decisions

- **Sorteo sin reemplazo sobre índices:** `drawWinners(participants, count, random)` devuelve una lista nueva con `count` entradas, eligiendo en cada paso un índice entre las entradas restantes. Trabajar con entradas (no con nombres) permite nombres repetidos sin que una entrada gane dos veces. Cada lugar es igual de probable para todos. Es pura e inyecta `random`. Alternativa descartada: mezclar toda la lista (Fisher-Yates), porque exige más trabajo del necesario para 3 elementos.
- **Validación pura:** `validateDraw(participantCount, winnerCount)` devuelve `{ valid: true }` o `{ valid: false, message }` con el texto de la especificación. Los mensajes viven en la lógica, no en los componentes.
- **Resultado como un valor:** el estado de resultado es `null`, `{ type: 'error', message }` o `{ type: 'winners', winners }`. Un solo estado evita combinaciones imposibles y se limpia al cambiar lista o cantidad.
- **Componentes nuevos:** `WinnerCountSelector` (grupo de opciones 1, 2, 3), `Podium` (3 lugares con 🥇🥈🥉, el lugar vacío se omite) y `DrawError`. `WinnerCard` se reutiliza para 1 ganador.
- **Podio con CSS:** disposición de 3 columnas, con el 1.er lugar en el centro y alturas distintas, usando solo las variables del color base.
- **Cantidad inválida tras cambiar la lista:** se conserva el valor elegido y solo se limpia el resultado.

## Risks / Trade-offs

- Cambia el comportamiento actual (1 participante ya no sortea; el botón ya no se deshabilita). Está documentado como BREAKING y las pruebas existentes se actualizan.
- Con nombres repetidos, dos entradas iguales pueden ganar a la vez; se documenta como decisión.
- El botón siempre habilitado confía en el mensaje para guiar al usuario; es coherente con el Ticket #4.
