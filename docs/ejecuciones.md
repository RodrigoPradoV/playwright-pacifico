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
