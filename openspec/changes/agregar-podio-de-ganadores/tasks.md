# Tasks

## 1. Lógica pura

- [ ] 1.1 Crear `drawWinners(participants, count, random)` sin repetir entradas, con pruebas unitarias (cantidad exacta, distintos, de la lista, nombres repetidos, generador determinista)
- [ ] 1.2 Crear `validateDraw(participantCount, winnerCount)` con el mensaje de la especificación y sus pruebas (casos límite: 0, 1 y N participantes)
- [ ] 1.3 Retirar o reemplazar `drawWinner` actualizando sus pruebas

## 2. Componentes

- [ ] 2.1 Crear `WinnerCountSelector` (1, 2, 3; por defecto 1) con pruebas de componente
- [ ] 2.2 Crear `Podium` con el 1.er lugar al centro, 2.º a la izquierda y 3.º a la derecha, y con pruebas (2 y 3 ganadores)
- [ ] 2.3 Crear `DrawError` para el mensaje de participantes insuficientes, con pruebas
- [ ] 2.4 Mostrar «¡Tenemos un ganador!» con 1 ganador y «¡Tenemos un podio!» con 2 o 3
- [ ] 2.5 Estilos del podio con variables CSS del color base

## 3. Integración

- [ ] 3.1 Conectar el estado de resultado en `App.svelte` y habilitar siempre el botón de sorteo
- [ ] 3.2 Limpiar el resultado al cambiar la lista o la cantidad, conservando la cantidad elegida
- [ ] 3.3 Pruebas de integración de las reglas R1, R2 y R3 y de lo que ya funcionaba
- [ ] 3.4 Ejecutar `npm run lint`, `npm test` y `npm run build`
