# Registro de ejecuciones de Playwright

Solo se aceptan resultados generados después de `npm ci` y la limpieza de resultados. Los reportes heredados de OrangeHRM no son evidencia.

| Fecha UTC | Commit SHA | Entorno | Comando | Resultado real | Evidencia |
|---|---|---|---|---|---|
| 2026-10-27T02:59Z | cambio aún no confirmado | Node 22.15.0 / npm 11.7.0 | `npm ci` | Aprobado; 247 paquetes; 17 vulnerabilidades informadas | Salida local, no artifact final |
| 2026-10-27T03:03Z | cambio aún no confirmado | Node 22.15.0 | Dry-run Cucumber | Fallido: opción Allure requerida y target TypeScript legado | Salida local temporal |
| 2026-10-27T03:04Z | cambio aún no confirmado | Node 22.15.0 | `tsc --noEmit` y dry-run Cucumber | Aprobado: 7 escenarios descubiertos | JSON/HTML/Allure temporales |
| 2026-10-27T03:06Z | cambio aún no confirmado | Node 22.15.0 / Chromium 127 | `npm run test:ci` | Aprobado: 7/7 escenarios, 44 pasos, 0 fallos | Reportes locales temporales |
| 2026-10-27T03:07Z | cambio aún no confirmado | Node 22.15.0 / Java 21 para Allure CLI | Reporters y scan | Aprobado: JSON/HTML, Multiple HTML, Allure; 61 archivos sin secretos | Resultados locales temporales |

Las dos ejecuciones locales limpias sobre el commit final se registran además en el resumen generado y en una nota Git sin alterar el SHA probado. El run de GitHub Actions se añadirá cuando exista un remoto. El resumen generado por `scripts/write-execution-summary.js` contiene SHA completo, UTC, Node, npm, navegador y exit code real.
