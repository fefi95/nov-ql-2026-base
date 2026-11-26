# selector-de-ganadores Specification

## Purpose

TBD - created by archiving change documentar-selector-de-ganadores. Update Purpose after archive.

## Requirements

### Requirement: Agregar participantes
El sistema SHALL permitir agregar participantes escribiendo su nombre y confirmando con el botón "Agregar" o con la tecla Enter. El sistema MUST ignorar los nombres vacíos o formados solo por espacios, y MUST quitar los espacios al inicio y al final del nombre.

#### Scenario: Agregar un participante
- **WHEN** el usuario escribe "Ana" y confirma
- **THEN** "Ana" aparece en la lista de participantes y el campo de texto queda vacío

#### Scenario: Nombre vacío
- **WHEN** el usuario confirma un nombre vacío o solo con espacios
- **THEN** la lista de participantes no cambia

#### Scenario: Sin participantes
- **WHEN** la lista de participantes está vacía
- **THEN** el sistema muestra el mensaje "Aún no hay participantes. ¡Agrega el primero!"

### Requirement: Quitar participantes
El sistema SHALL permitir quitar a cualquier participante de la lista con su botón "Quitar".

#### Scenario: Quitar un participante
- **WHEN** el usuario quita a "Ana" de una lista con "Ana" y "Luis"
- **THEN** la lista solo contiene a "Luis"

### Requirement: Color base de la interfaz
El sistema SHALL usar el color naranja como color base de la interfaz. El color MUST definirse únicamente mediante variables CSS al inicio de `src/app.css`, y el usuario final MUST NOT poder cambiarlo.

#### Scenario: Color definido por el desarrollador
- **WHEN** se carga la aplicación
- **THEN** los botones, el título y la tarjeta del ganador usan las variables CSS del color base

### Requirement: Sortear un único ganador
El sistema SHALL sortear exactamente un ganador entre los participantes con el botón "Sortear ganador" y mostrarlo en pantalla. El botón MUST estar deshabilitado mientras no haya participantes. Cada participante MUST tener la misma probabilidad de ganar.

#### Scenario: Sortear con participantes
- **WHEN** hay participantes y el usuario pulsa "Sortear ganador"
- **THEN** se muestra "¡Tenemos un ganador!" con el nombre de un solo participante de la lista

#### Scenario: Sortear sin participantes
- **WHEN** no hay participantes
- **THEN** el botón "Sortear ganador" está deshabilitado

#### Scenario: Cambiar la lista descarta al ganador
- **WHEN** hay un ganador visible y el usuario agrega o quita un participante
- **THEN** el ganador deja de mostrarse
