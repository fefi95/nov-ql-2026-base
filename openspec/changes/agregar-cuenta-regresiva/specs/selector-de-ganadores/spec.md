## ADDED Requirements

### Requirement: Cuenta regresiva antes del resultado
Al pulsar "Sortear ganador" con un sorteo válido, el sistema SHALL mostrar una cuenta regresiva de 3 a 1, con un segundo entre cada número, antes de mostrar el resultado. El 3 MUST aparecer al pulsar, el 2 un segundo después y el 1 dos segundos después. El resultado MUST mostrarse tres segundos después de pulsar y no antes. La cuenta regresiva MUST mostrarse de forma grande y visible, con el color base de la aplicación.

#### Scenario: Secuencia de la cuenta
- **WHEN** el usuario pulsa "Sortear ganador" con un sorteo válido
- **THEN** se muestra 3, un segundo después 2, y otro segundo después 1

#### Scenario: Resultado al terminar la cuenta
- **WHEN** pasan tres segundos desde que el usuario pulsó "Sortear ganador"
- **THEN** la cuenta regresiva desaparece y se muestra el resultado (un ganador o un podio)

#### Scenario: Sin resultado durante la cuenta
- **WHEN** la cuenta regresiva está en curso
- **THEN** no se muestra ningún ganador ni podio

### Requirement: Bloqueo durante la cuenta regresiva
Mientras la cuenta regresiva está en curso, el sistema MUST deshabilitar el botón "Sortear ganador" y MUST impedir modificar la lista de participantes (agregar y quitar) y la cantidad de ganadores. El resultado anterior MUST dejar de mostrarse al iniciar la cuenta.

#### Scenario: No se puede sortear de nuevo
- **WHEN** la cuenta regresiva está en curso
- **THEN** el botón "Sortear ganador" está deshabilitado

#### Scenario: No se puede modificar la lista
- **WHEN** la cuenta regresiva está en curso
- **THEN** no se pueden agregar ni quitar participantes

#### Scenario: No se puede cambiar la cantidad de ganadores
- **WHEN** la cuenta regresiva está en curso
- **THEN** no se puede cambiar la cantidad de ganadores

#### Scenario: El resultado anterior se oculta
- **WHEN** hay un resultado visible y el usuario inicia un nuevo sorteo válido
- **THEN** el resultado anterior deja de mostrarse y comienza la cuenta regresiva

#### Scenario: Controles disponibles al terminar
- **WHEN** termina la cuenta regresiva y se muestra el resultado
- **THEN** el botón "Sortear ganador", la lista de participantes y la cantidad de ganadores vuelven a estar disponibles

### Requirement: Sorteo inválido sin cuenta regresiva
Si el sorteo no se puede realizar (por ejemplo, por participantes insuficientes), el sistema MUST NOT mostrar la cuenta regresiva y SHALL mostrar directamente el mensaje de error.

#### Scenario: Participantes insuficientes
- **WHEN** hay 1 participante, se elige 1 ganador y el usuario pulsa "Sortear ganador"
- **THEN** se muestra de inmediato "Se necesitan al menos 2 participantes para sortear 1 ganador(es)." sin cuenta regresiva
