# despliegue-continuo Specification

## Purpose

TBD - created by archiving change agregar-despliegue-pages. Update Purpose after archive.

## Requirements

### Requirement: Despliegue automático en GitHub Pages
El sistema SHALL construir y publicar la aplicación en GitHub Pages automáticamente con cada `push` a la rama `main`, sin pasos manuales.

#### Scenario: Cambio fusionado en main
- **WHEN** se fusiona un pull request en `main`
- **THEN** el workflow construye la aplicación y la publica en GitHub Pages

### Requirement: Despliegue solo tras verificaciones exitosas
El despliegue MUST ejecutarse únicamente si el linter y las pruebas pasan. Si el linter, las pruebas o la construcción fallan, el workflow MUST fallar y MUST NOT publicar ninguna versión nueva.

#### Scenario: Verificaciones exitosas
- **WHEN** el linter y las pruebas pasan en un `push` a `main`
- **THEN** se ejecuta el despliegue

#### Scenario: Una prueba falla
- **WHEN** una prueba falla en un `push` a `main`
- **THEN** el workflow termina en rojo, no se despliega y la versión publicada anterior se mantiene

### Requirement: Los pull requests no despliegan
Los pull requests hacia `main` SHALL ejecutar solo las verificaciones (linter, pruebas y construcción) y MUST NOT desplegar.

#### Scenario: Pull request abierto
- **WHEN** se abre o actualiza un pull request hacia `main`
- **THEN** se ejecutan las verificaciones y no se ejecuta el despliegue

### Requirement: La aplicación publicada funciona como en local
La aplicación publicada SHALL cargar sus recursos desde la ruta del repositorio en GitHub Pages y MUST funcionar igual que en local: participantes, color base, podio y cuenta regresiva.

#### Scenario: Abrir la aplicación publicada
- **WHEN** una persona abre `https://fefi95.github.io/nov-ql-2026-base/`
- **THEN** la aplicación carga con sus estilos y permite agregar participantes y sortear

### Requirement: Enlace a la aplicación publicada
El `README.md` SHALL incluir el enlace a la aplicación publicada.

#### Scenario: Consultar el README
- **WHEN** una persona lee el `README.md`
- **THEN** encuentra el enlace a la aplicación publicada
