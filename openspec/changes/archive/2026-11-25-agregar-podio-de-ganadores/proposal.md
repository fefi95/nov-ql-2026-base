# Proposal

## Why

En los eventos de la comunidad se entrega más de un premio. El sorteo debe poder elegir hasta tres ganadores y mostrarlos como un podio (1.er, 2.º y 3.er lugar). Las reglas, los casos límite y las decisiones se acuerdan aquí antes de escribir código.

## What Changes

- El usuario elige cuántos ganadores quiere: 1, 2 o 3 (por defecto 1).
- La cantidad de ganadores debe ser menor que el número de participantes. Si no lo es, no se sortea y se muestra el motivo.
- Los ganadores son todos distintos y todos los participantes tienen la misma probabilidad de ganar cualquier lugar.
- Con 1 ganador el resultado se muestra como hoy; con 2 o 3 se muestra «¡Tenemos un podio!» con forma de podio y el color base.
- Al cambiar la lista o la cantidad de ganadores, el resultado anterior deja de mostrarse.
- **BREAKING (comportamiento actual):** con un solo participante ya no se puede sortear, porque 1 ganador requiere al menos 2 participantes.
- **BREAKING (comportamiento actual):** el botón "Sortear ganador" ya no se deshabilita sin participantes; al pulsarlo se muestra el motivo.

### Decisiones sobre casos que las reglas no cubren

- **Dónde se muestra el error:** al pulsar "Sortear ganador" con participantes insuficientes (incluso con 0 participantes). Así es coherente con el Ticket #4, donde un sorteo inválido muestra el mensaje sin cuenta regresiva.
- **Nombres repetidos:** la aplicación sigue permitiendo agregar el mismo nombre dos veces. «Distintos» significa distintas entradas de la lista, por lo que dos entradas con el mismo nombre pueden ganar a la vez.
- **Podio con 2 ganadores:** el 1.er lugar va al centro y el 2.º a la izquierda; el lugar del 3.º queda vacío.
- **Cantidad elegida y cambios en la lista:** la cantidad seleccionada se conserva aunque deje de ser válida; solo se descarta el resultado.
- **Mensaje de error:** `Se necesitan al menos {N + 1} participantes para sortear {N} ganador(es).`, con N igual a la cantidad elegida.

## Capabilities

### New Capabilities

### Modified Capabilities
- `selector-de-ganadores`: sorteo de 1 a 3 ganadores distintos, resultado en podio, mensaje por participantes insuficientes y resultados vigentes. Se reemplaza el requisito "Sortear un único ganador".

## Impact

- Código: nueva lógica pura de sorteo de varios ganadores y de validación en `src/lib/`; nuevos componentes para el selector de cantidad, el podio y el mensaje de error; cambios en `App.svelte`.
- Estilos: el podio usa solo variables CSS del color base.
- Pruebas: unitarias (sorteo sin repetición, validación) y de componentes (selector, podio, mensaje).
- Sin dependencias nuevas.
