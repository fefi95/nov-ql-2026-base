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

### Requirement: Cantidad de ganadores
El sistema SHALL permitir elegir cuántos ganadores se sortean: 1, 2 o 3. El valor por defecto MUST ser 1. La cantidad de ganadores MUST ser menor que el número de participantes.

#### Scenario: Valor por defecto
- **WHEN** se carga la aplicación
- **THEN** la cantidad de ganadores seleccionada es 1

#### Scenario: Elegir otra cantidad
- **WHEN** el usuario elige 3 ganadores
- **THEN** la cantidad seleccionada es 3

### Requirement: Participantes insuficientes
El sistema MUST NOT realizar el sorteo si la cantidad de ganadores no es menor que el número de participantes, y SHALL mostrar el mensaje `Se necesitan al menos {N + 1} participantes para sortear {N} ganador(es).`, donde N es la cantidad de ganadores elegida. El botón "Sortear ganador" SHALL estar habilitado para que el usuario reciba el mensaje al pulsarlo, incluso sin participantes.

#### Scenario: Pocos participantes para la cantidad elegida
- **WHEN** hay 3 participantes, se eligen 3 ganadores y el usuario pulsa "Sortear ganador"
- **THEN** se muestra "Se necesitan al menos 4 participantes para sortear 3 ganador(es)." y no se muestra ningún ganador

#### Scenario: Un solo participante
- **WHEN** hay 1 participante, se elige 1 ganador y el usuario pulsa "Sortear ganador"
- **THEN** se muestra "Se necesitan al menos 2 participantes para sortear 1 ganador(es)."

#### Scenario: Sin participantes
- **WHEN** no hay participantes y el usuario pulsa "Sortear ganador"
- **THEN** se muestra "Se necesitan al menos 2 participantes para sortear 1 ganador(es)."

### Requirement: Sortear ganadores distintos
El sistema SHALL sortear exactamente la cantidad de ganadores elegida entre los participantes con el botón "Sortear ganador". Todos los ganadores MUST ser distintas entradas de la lista, sin repetir ninguna entrada. Todos los ganadores MUST pertenecer a la lista. Todos los participantes MUST tener la misma probabilidad de ganar cualquier lugar. Los nombres repetidos se tratan como entradas distintas.

#### Scenario: Cantidad exacta de ganadores
- **WHEN** hay 5 participantes, se eligen 3 ganadores y el usuario pulsa "Sortear ganador"
- **THEN** se muestran exactamente 3 ganadores

#### Scenario: Ganadores distintos y de la lista
- **WHEN** el usuario sortea con cualquier lista válida, sin importar el resultado del azar
- **THEN** ningún participante aparece dos veces y todos los ganadores pertenecen a la lista

#### Scenario: Nombres repetidos
- **WHEN** la lista contiene dos entradas con el nombre "Ana" y se sortean dos ganadores
- **THEN** cada entrada puede ganar como máximo una vez

### Requirement: Resultado con un ganador
Con 1 ganador, el sistema SHALL mostrar «¡Tenemos un ganador!» y el nombre del ganador.

#### Scenario: Sortear un ganador
- **WHEN** hay al menos 2 participantes, se elige 1 ganador y el usuario pulsa "Sortear ganador"
- **THEN** se muestra "¡Tenemos un ganador!" con el nombre de un solo participante de la lista

### Requirement: Resultado en podio
Con 2 o 3 ganadores, el sistema SHALL mostrar «¡Tenemos un podio!» y los ganadores en forma de podio: el 1.er lugar (🥇) en el centro y más alto, el 2.º lugar (🥈) a la izquierda y el 3.er lugar (🥉) a la derecha. Con 2 ganadores, el lugar del 3.º MUST quedar vacío. El podio MUST usar el color base de la aplicación.

#### Scenario: Podio de tres ganadores
- **WHEN** se sortean 3 ganadores
- **THEN** se muestra "¡Tenemos un podio!" con el 1.er lugar en el centro, el 2.º a la izquierda y el 3.º a la derecha

#### Scenario: Podio de dos ganadores
- **WHEN** se sortean 2 ganadores
- **THEN** se muestra "¡Tenemos un podio!" con el 1.er lugar en el centro, el 2.º a la izquierda y sin 3.er lugar

### Requirement: Resultados vigentes
El sistema SHALL dejar de mostrar el resultado anterior (ganadores o mensaje de error) cuando cambia la lista de participantes o la cantidad de ganadores. La cantidad de ganadores elegida MUST conservarse aunque deje de ser válida.

#### Scenario: Cambiar la lista
- **WHEN** hay un resultado visible y el usuario agrega o quita un participante
- **THEN** el resultado deja de mostrarse

#### Scenario: Cambiar la cantidad de ganadores
- **WHEN** hay un resultado visible y el usuario elige otra cantidad de ganadores
- **THEN** el resultado deja de mostrarse

#### Scenario: Cantidad que deja de ser válida
- **WHEN** hay 3 ganadores elegidos y el usuario quita participantes hasta que la cantidad deja de ser válida
- **THEN** la cantidad elegida sigue siendo 3 y el resultado anterior deja de mostrarse
