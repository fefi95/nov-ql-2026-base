# Tasks

## 1. Lógica pura

- [ ] 1.1 Crear la secuencia de la cuenta (inicio en 3, `nextCountdown`) con pruebas unitarias

## 2. Componentes

- [ ] 2.1 Crear `Countdown` grande, con color base por variables CSS y `aria-live`, con pruebas de componente
- [ ] 2.2 Agregar la propiedad `locked` a `ParticipantForm`, `ParticipantList`, `WinnerCountSelector` y `DrawButton` con pruebas

## 3. Integración

- [ ] 3.1 Agregar el estado de fase (`idle`, `counting`, `done`) en `App.svelte`
- [ ] 3.2 Sortear al pulsar, mostrar el error de inmediato si es inválido y ocultar el resultado anterior al iniciar
- [ ] 3.3 Inyectar el temporizador, avanzar un número por segundo, mostrar el resultado tras el 1 y cancelar el temporizador al destruir el componente
- [ ] 3.4 Pruebas con temporizadores falsos: secuencia 3-2-1, resultado solo al terminar, bloqueo de controles, sorteo inválido sin cuenta y lo que ya funcionaba
- [ ] 3.5 Ejecutar `npm run lint`, `npm test` y `npm run build`
