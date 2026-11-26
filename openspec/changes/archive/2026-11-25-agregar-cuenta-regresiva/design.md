# Design

## Context

Después de `agregar-podio-de-ganadores`, `App.svelte` guarda un estado de resultado (`null`, error o ganadores) y el sorteo se resuelve al instante. Este cambio agrega una fase intermedia de cuenta regresiva. `AGENTS.md` exige lógica pura en `src/lib/` y efectos (temporizador, azar) en los bordes, inyectados.

## Goals / Non-Goals

**Goals:**
- Mostrar 3, 2, 1 con un segundo entre números y luego el resultado.
- Bloquear los controles durante la cuenta.
- Pruebas deterministas sin esperas reales.

**Non-Goals:**
- Sonido y animaciones extra (se pueden agregar después sin cambiar las reglas).
- Cancelar o pausar la cuenta.

## Decisions

- **Estado de fase:** el estado pasa a ser `idle`, `counting` (con el número actual y los ganadores ya elegidos) o `done` (resultado o error). Una sola variable evita combinaciones imposibles.
- **Lógica pura:** `nextCountdown(current)` devuelve el siguiente número o `null` al terminar, y una constante define el inicio en 3. El paso de tiempo no está en la lógica.
- **Ganadores elegidos al pulsar:** se valida y se sortea al pulsar; si es inválido se pasa directo a `done` con el error. Si es válido se pasa a `counting` y los ganadores se guardan sin mostrarse. Así el azar se consume una vez y el resultado no cambia durante la cuenta.
- **Temporizador inyectado:** `App` recibe `scheduler` (por defecto `setInterval`/`clearInterval`, con la misma forma que el generador aleatorio inyectado) y lo usa en un solo efecto que depende de la fase `counting`. El efecto devuelve una función de limpieza que cancela el temporizador si el componente se destruye o la fase cambia.
- **Bloqueo:** `App` calcula un valor `locked` y lo pasa por props a `ParticipantForm`, `ParticipantList`, `WinnerCountSelector` y `DrawButton`, que solo deshabilitan sus controles.
- **Componente `Countdown`:** muestra el número en grande con el color base mediante variables CSS y una región `aria-live`.
- **Pruebas:** Vitest con temporizadores falsos (`vi.useFakeTimers`) avanzando 1000 ms por paso; pruebas unitarias para la secuencia.

## Risks / Trade-offs

- Un estado de fase más rico complica `App.svelte`; se compensa con funciones puras para las transiciones y pruebas.
- El botón siempre habilitado fuera de la cuenta depende de las decisiones de `agregar-podio-de-ganadores`; por eso se aplica después.
- Los temporizadores del navegador pueden retrasarse en pestañas en segundo plano; el requisito se cumple "al menos" ese tiempo y no se compensa.
