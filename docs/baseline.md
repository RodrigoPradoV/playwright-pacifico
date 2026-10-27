# Baseline original de Playwright

## Alcance

Este documento acompaña al tag `baseline-playwright-original`. El código fuente del ZIP se conserva sin cambios en ese tag. Solo se añadieron la referencia PDF, su hash, este inventario y exclusiones Git para impedir que dependencias, reportes, cachés, archivos del sistema o secretos entren al baseline.

## Referencia principal

- PDF: `docs/reference/Informe_Automatizacion_Playwright.pdf`
- SHA-256: `CF6851B190B777F8A165EA4F8A4C210E91EEAB66241DDA4B51A6FAA3A687B6A0`
- Páginas: 1
- La copia fue verificada contra el PDF ubicado en la raíz del material recibido.

## Estado inicial del código

- Proyecto Node/TypeScript con Playwright y Cucumber.
- La única feature activa automatiza un login positivo de OrangeHRM, aunque su nombre alude a creación de empleado.
- Los hooks crean un `BrowserContext`, pero abren la página directamente desde `browser`; por ello la página no pertenece al contexto aislado del escenario.
- Se capturan screenshots después de cada paso.
- Hay páginas adicionales heredadas, pero no constituyen cobertura activa de SauceDemo.
- El lockfile resuelve Playwright 1.45.3, Cucumber 10.8.0 y paquetes Allure 2.15.1.

## Inventario excluido

- `node_modules/`: 8.338 archivos encontrados; no se versionan ni se reutilizan para la validación final.
- `test-results/`: 40 archivos históricos, cuya última marca temporal observada corresponde a 2024-07-25.
- `.DS_Store` y cachés/reportes generados.
- Los reportes heredados no se versionan ni se aceptan como evidencia de esta implementación.

## Entorno observado al crear el baseline

- Sistema: Windows.
- Node local: 22.15.0.
- npm local: 11.7.0.
- Las dependencias deberán reinstalarse exclusivamente con `npm ci` antes de ejecutar la nueva suite.

## Recuperación

El estado se recupera con `git switch --detach baseline-playwright-original`. No deben copiarse `node_modules` ni resultados históricos al trabajar desde el tag.
