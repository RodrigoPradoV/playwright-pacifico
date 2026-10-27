# Registro de ejecuciones de Playwright

Solo se aceptan resultados generados después de `npm ci` y la limpieza de resultados. Los reportes heredados de OrangeHRM no son evidencia.

## Caracterización inicial

| Fecha UTC | Commit SHA | Entorno | Comando | Resultado real | Evidencia |
|---|---|---|---|---|---|
| 2026-10-27T02:59Z | cambio aún no confirmado | Node 22.15.0 / npm 11.7.0 | `npm ci` | Aprobado; 247 paquetes; 17 vulnerabilidades informadas | Salida local temporal |
| 2026-10-27T03:03Z | cambio aún no confirmado | Node 22.15.0 | Dry-run Cucumber | Fallido: opción Allure requerida y target TypeScript legado | Salida local temporal; hallazgo conservado |
| 2026-10-27T03:04Z | cambio aún no confirmado | Node 22.15.0 | `tsc --noEmit` y dry-run Cucumber | Aprobado: 7 escenarios descubiertos | Reportes temporales |
| 2026-10-27T03:06Z | cambio aún no confirmado | Node 22.15.0 / Chromium 127 | `npm run test:ci` | Aprobado: 7/7 escenarios, 44 pasos | Reportes temporales |

Estas filas son caracterización y no se presentan como evidencia final porque preceden al commit entregado.

## Ejecuciones independientes sobre el SHA 6ab2aa8

| Fecha UTC | Commit SHA | Entorno | Comando | Resultado real | Evidencia |
|---|---|---|---|---|---|
| 2026-10-27T03:18:37Z | `6ab2aa8b25ebc0a720d0617280e6789e89e8afe5` | Node 22.15.0 / Chromium | Suite limpia local 1 | 7/7 escenarios, 44 pasos; reporters y scan aprobados | Nota Git `qa-validation` |
| 2026-10-27T03:19:51Z | `6ab2aa8b25ebc0a720d0617280e6789e89e8afe5` | Node 22.15.0 / Chromium | Suite limpia local 2 | 7/7 escenarios, 44 pasos; reporters y scan aprobados | Nota Git `qa-validation` |
| 2026-10-27T04:01:57Z | `6ab2aa8b25ebc0a720d0617280e6789e89e8afe5` | Node 22.23.3 / npm 10.9.9 / Chromium | `npm run test:ci` | Exit 0; 5 features, 7 escenarios y 44 pasos | [Run 40447364535](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40447364535), artifacts 12709150895 y 12709360148 |

El run de CI revisó 63 archivos de texto y no detectó credenciales. Los hashes SHA-256 de los dos ZIP descargados coincidieron con los registrados por GitHub Actions. No hubo screenshots porque ningún escenario falló.

## Registro del SHA entregado

La evidencia final de cada nuevo commit se registra sin modificar ese commit:

1. `scripts/write-execution-summary.js` guarda SHA, UTC, URL del run, intento, Node, npm, navegador y exit code dentro del artifact.
2. Las dos ejecuciones locales se conservan como ZIP independientes fuera del repositorio.
3. `refs/notes/qa-validation` relaciona el SHA con los dos ZIP locales y con el run de GitHub Actions.
4. `report-consistency.txt` acredita que Cucumber y Allure contienen el mismo total.

Este mecanismo evita crear un commit documental posterior que deje las pruebas asociadas a un SHA diferente del entregado.

## Matriz multientorno y cross-browser

La comprobación solicitada se ejecuta sobre un único SHA con las siguientes combinaciones:

| Perfil | Navegador | Script |
|---|---|---|
| dev | Google Chrome | `npm run test:dev:chrome` |
| dev | Firefox | `npm run test:dev:firefox` |
| dev | WebKit | `npm run test:dev:webkit` |
| uat | Google Chrome | `npm run test:uat:chrome` |
| uat | Firefox | `npm run test:uat:firefox` |
| uat | WebKit | `npm run test:uat:webkit` |

Cada combinación limpia resultados, ejecuta la misma suite, genera Cucumber/Multiple Cucumber HTML/Allure, verifica que Cucumber y Allure informen 7 casos y ejecuta el scan de secretos. Los timestamps, resultados, versiones y hashes de los ZIP del SHA entregado se conservan en `refs/notes/qa-validation` para no modificar el commit después de probarlo.

`dev` y `uat` apuntan al mismo `BASE_URL` público durante esta validación. Por ello la evidencia acredita el cambio de perfil y la compatibilidad de ejecución, pero no dos despliegues independientes.

## Cierre final sobre el SHA f52fe9e

Las seis ejecuciones siguientes se realizaron sin reintentos sobre `f52fe9edd0e4fc9b12b10ba870bffb06189b733d`. Cada una aprobó 5 features, 7/7 escenarios, 44 pasos, 7/7 casos Allure, generación de reportes y escaneo de secretos sobre 63 archivos.

| Perfil | Navegador | Versión | Resultado | Evidencia externa |
|---|---|---:|---|---|
| dev | Google Chrome | 156.0.8078.48 | Aprobado | `playwright-matrix-f52fe9edd0e4fc9b12b10ba870bffb06189b733d-dev-chrome.zip` |
| dev | Firefox | 127.0 | Aprobado | `playwright-matrix-f52fe9edd0e4fc9b12b10ba870bffb06189b733d-dev-firefox.zip` |
| dev | WebKit | 17.4 | Aprobado | `playwright-matrix-f52fe9edd0e4fc9b12b10ba870bffb06189b733d-dev-webkit.zip` |
| uat | Google Chrome | 156.0.8078.48 | Aprobado | `playwright-matrix-f52fe9edd0e4fc9b12b10ba870bffb06189b733d-uat-chrome.zip` |
| uat | Firefox | 127.0 | Aprobado | `playwright-matrix-f52fe9edd0e4fc9b12b10ba870bffb06189b733d-uat-firefox.zip` |
| uat | WebKit | 17.4 | Aprobado | `playwright-matrix-f52fe9edd0e4fc9b12b10ba870bffb06189b733d-uat-webkit.zip` |

El cierre remoto corresponde al [run `40462024280`](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40462024280), ejecutado con Node 22.23.3, npm 10.9.9 y Chromium. Terminó con exit code 0, 5 features, 7/7 escenarios, 44 pasos, 7/7 casos Allure, cero screenshots y escaneo de 64 archivos sin secretos expuestos.

- Artifact de evidencia: ID `12715280879`, SHA-256 `785842608760385DD2F48767AC9499486CEDE08195D38CD44CFFBF8DDBA26227`.
- Artifact de seguridad: ID `12715290928`, SHA-256 `F3E163CD9A94F4C812C080C8B39237A768637833A3E56D8DABA826C6128B3625`.
- Logs exportados: SHA-256 `9FD9749EF6D06A6B739E8131E7FCCB048BB3BFC1FF8CBD4F0CDAE71F68F6C80C`.
- Copias descargadas: `Ejecucion-Playwright/`.

Las ejecuciones anteriores se conservan como historial de caracterización y corrección; no representan tareas abiertas. El estado de cierre lo determina esta evidencia final y la nota Git `refs/notes/qa-validation` asociada al SHA probado.

## Regresión de endurecimiento

El 2026-10-27 se actualizó de manera explícita el stack de automatización y se retiró `allure-playwright`, que no participaba en la integración Cucumber. Antes de confirmar el cambio se obtuvieron los siguientes resultados locales:

- `npm run typecheck`: aprobado con TypeScript 5.9.3.
- `npm audit`: 0 vulnerabilidades; el baseline anterior informaba 17.
- Chrome 156.0.8078.48, Firefox 157.0 y WebKit 27.2: `dev` y `uat` aprobaron 7/7 escenarios en las seis combinaciones, sin reintentos.
- Multiple Cucumber HTML 4.5.0 y Allure 3.14.0: generación aprobada.
- Control de consistencia: 7 escenarios Cucumber = 7 casos Allure.
- Escaneo de artifacts: aprobado sin valores configurados expuestos.

La validación remota se ejecuta en el mismo SHA mediante un job de calidad y seis jobs de navegador/entorno. Cada artifact conserva entorno, navegador y SHA en el nombre y tiene retención de 90 días. Su run, IDs y hashes se agregan a la nota Git `qa-validation` sin modificar el commit probado.
