# Tasks

## 1. Linter y formatter

- [ ] 1.1 Instalar ESLint, Prettier y sus plugins para Svelte
- [ ] 1.2 Crear la configuración y los scripts `npm run lint` y `npm run format`
- [ ] 1.3 Corregir los avisos del código existente sin cambiar el comportamiento

## 2. Pruebas según la especificación

- [ ] 2.1 Probar que el sorteo elige un único ganador y que siempre pertenece a la lista, con varios valores del generador aleatorio
- [ ] 2.2 Probar que no se puede sortear sin participantes
- [ ] 2.3 Probar que el color base está definido en `src/app.css` y que los componentes solo usan variables CSS
- [ ] 2.4 Romper código a propósito en tres puntos, verificar que las pruebas fallan y revertir

## 3. CI y documentación

- [ ] 3.1 Crear `.github/workflows/ci.yml` (push y pull request hacia `main`)
- [ ] 3.2 Documentar pruebas y linter en `README.md` y `AGENTS.md`
- [ ] 3.3 Ejecutar `npm run lint`, `npm test` y `npm run build`
