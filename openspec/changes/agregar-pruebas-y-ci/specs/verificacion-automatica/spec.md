## ADDED Requirements

### Requirement: Pruebas con un solo comando
El proyecto SHALL ejecutar todas las pruebas automáticas con un solo comando (`npm test`). Las pruebas MUST ser deterministas: no pueden depender del azar real ni de esperas reales. Las pruebas MUST verificar lo que dicen las especificaciones de `openspec/specs/`.

#### Scenario: Ejecutar las pruebas
- **WHEN** un desarrollador ejecuta `npm test`
- **THEN** se ejecutan las pruebas de agregar participantes, sorteo de un único ganador de la lista, sorteo bloqueado sin participantes y aplicación del color base

#### Scenario: Una prueba detecta un error
- **WHEN** se rompe a propósito el comportamiento de un requisito (por ejemplo, el sorteo devuelve a alguien que no está en la lista)
- **THEN** al menos una prueba falla

### Requirement: Linter y formatter con un solo comando
El proyecto SHALL tener un linter y un formatter configurados, y MUST poder ejecutarlos con un solo comando (`npm run lint`).

#### Scenario: Código con errores de estilo
- **WHEN** un archivo no cumple las reglas del linter o del formatter
- **THEN** `npm run lint` termina con error e indica el archivo

### Requirement: Verificación en GitHub Actions
El repositorio SHALL tener un workflow de GitHub Actions que ejecute el linter y las pruebas en cada `push` y en cada pull request hacia `main`. Si el linter o una prueba fallan, el workflow MUST fallar.

#### Scenario: Pull request con todo en orden
- **WHEN** se abre un pull request hacia `main` y el linter y las pruebas pasan
- **THEN** el workflow termina en verde

#### Scenario: Pull request que rompe una prueba
- **WHEN** se abre un pull request hacia `main` y una prueba falla
- **THEN** el workflow termina en rojo y muestra qué prueba falló

### Requirement: Instrucciones de verificación local
El `README.md` SHALL explicar cómo ejecutar las pruebas y el linter localmente.

#### Scenario: Consultar el README
- **WHEN** una persona lee el `README.md`
- **THEN** encuentra los comandos para ejecutar las pruebas y el linter
