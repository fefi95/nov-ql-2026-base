# Proposal

## Why

El sorteo es más emocionante con un poco de suspenso. Antes de mostrar a los ganadores la aplicación debe mostrar una cuenta regresiva de 3 a 1. Las reglas y decisiones se acuerdan aquí antes de implementar.

## What Changes

- Al pulsar "Sortear ganador" con un sorteo válido, se muestra una cuenta regresiva grande, con el color base: 3, 2, 1, con un segundo entre cada número.
- Después del 1 se muestra el resultado (un ganador o un podio, según `agregar-podio-de-ganadores`).
- Durante la cuenta regresiva el botón de sorteo, la lista de participantes y la cantidad de ganadores no se pueden modificar, y el resultado anterior deja de mostrarse.
- Si el sorteo no es válido (por ejemplo, participantes insuficientes) no se muestra la cuenta regresiva y se muestra directamente el mensaje de error.

### Decisiones sobre casos que las reglas no cubren

- **Tiempos:** el 3 aparece al pulsar, el 2 al segundo, el 1 a los 2 segundos y el resultado a los 3 segundos. Cada número, incluido el 1, permanece un segundo completo.
- **Cuándo se eligen los ganadores:** al pulsar el botón, pero permanecen ocultos hasta que termina la cuenta. Así un sorteo inválido se detecta de inmediato y el resultado no cambia durante la cuenta.
- **Qué se bloquea:** el botón de sorteo, el campo y el botón de agregar participantes, los botones para quitar participantes y el selector de cantidad de ganadores.
- **Accesibilidad:** el número de la cuenta se anuncia con una región `aria-live`.
- **Si el componente se destruye durante la cuenta:** el temporizador se cancela y no queda ningún efecto pendiente.

## Capabilities

### New Capabilities

### Modified Capabilities
- `selector-de-ganadores`: cuenta regresiva antes del resultado, bloqueo de controles durante la cuenta y sorteo inválido sin cuenta. Se agregan requisitos nuevos; no se modifican los existentes.

## Impact

- Código: lógica pura de la cuenta regresiva (secuencia de números) en `src/lib/`, un componente `Countdown` y cambios en `App.svelte` y en los componentes que se bloquean.
- Temporizador inyectado, igual que el generador aleatorio, para poder reemplazarlo en las pruebas.
- Pruebas con temporizadores falsos: no esperan 3 segundos reales.
- Depende de `agregar-pruebas-y-ci` (CI) y de `agregar-podio-de-ganadores` (resultado y mensaje de error). Debe aplicarse después de ambos.
- Sin dependencias nuevas.
