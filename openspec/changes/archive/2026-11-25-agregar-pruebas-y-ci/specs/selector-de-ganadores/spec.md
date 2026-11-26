## MODIFIED Requirements

### Requirement: Sortear un único ganador
El sistema SHALL sortear exactamente un ganador entre los participantes con el botón "Sortear ganador" y mostrarlo en pantalla. El ganador MUST ser siempre uno de los participantes de la lista. El botón MUST estar deshabilitado mientras no haya participantes. Cada participante MUST tener la misma probabilidad de ganar.

#### Scenario: Sortear con participantes
- **WHEN** hay participantes y el usuario pulsa "Sortear ganador"
- **THEN** se muestra "¡Tenemos un ganador!" con el nombre de un solo participante de la lista

#### Scenario: Un único ganador
- **WHEN** hay varios participantes y el usuario pulsa "Sortear ganador"
- **THEN** se muestra exactamente un nombre como ganador

#### Scenario: El ganador pertenece a la lista
- **WHEN** el usuario sortea con cualquier lista de participantes, sin importar el resultado del azar
- **THEN** el ganador mostrado es uno de los participantes de esa lista

#### Scenario: Sortear sin participantes
- **WHEN** no hay participantes
- **THEN** el botón "Sortear ganador" está deshabilitado

#### Scenario: Cambiar la lista descarta al ganador
- **WHEN** hay un ganador visible y el usuario agrega o quita un participante
- **THEN** el ganador deja de mostrarse
