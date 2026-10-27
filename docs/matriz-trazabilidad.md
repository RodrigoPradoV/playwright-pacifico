# Matriz de trazabilidad de Playwright

Secuencia obligatoria: PDF → tag `baseline-playwright-original` → modificación → prueba → evidencia del mismo commit.

| ID | Origen PDF | Clasificación | Estado inicial ZIP | Modificación | Implementación | Prueba y resultado esperado | Estado | Evidencia | Desviación |
|---|---|---|---|---|---|---|---|---|---|
| P-REQ-01 | SauceDemo como aplicación objetivo | Requisito original | Feature activa de OrangeHRM | Reemplazo total de cobertura activa | Features en `src/features` | URL e inventario de SauceDemo | Implementado y aprobado | Cucumber JSON/HTML del SHA; nota `qa-validation` | OrangeHRM solo en baseline/docs |
| P-REQ-02 | Login exitoso | Requisito original | Login OrangeHRM | Cuenta por alias/env y aserción de inventario | `login-exitoso.feature`, `LoginPage` | Inventario visible | Implementado y aprobado | JSON/HTML/Allure | Ninguna |
| P-REQ-03 | Login no exitoso | Requisito original | No implementado | Cuenta locked e invalid con Outline | `login-no-exitoso.feature` | Mensaje funcional esperado en dos ejemplos | Implementado y aprobado | JSON/HTML/Allure | Ninguna |
| P-REQ-04 | Carrito | Requisito original | No implementado | Productos variables e aislamiento | `carrito.feature`, Page Objects | Badge y producto correcto en dos ejemplos | Implementado y aprobado | JSON/HTML/Allure | Ninguna |
| P-REQ-05 | Checkout completo | Requisito original | No implementado | Flujo hasta confirmación | `checkout-completo.feature`, `CheckoutPage` | `Thank you for your order!` | Implementado y aprobado | JSON/HTML/Allure | Ninguna |
| P-DEC-04 | Checkout negativo | Decisión técnica: cobertura adicional aprobada | No implementado | Código postal ausente | `checkout-negativo.feature` | Error requerido | Implementado y aprobado | JSON/HTML/Allure | No se presenta como requisito del PDF |
| P-REQ-06 | Scenario Outline | Requisito original | No aplicado a SauceDemo | Login negativo y carrito parametrizados | Dos features Outline | Cuatro ejemplos ejecutados de forma independiente | Implementado y aprobado | Cucumber JSON y Allure consistente | Ninguna |
| P-REQ-07 | Page Object Model | Requisito original | Pages globales/XPath absoluto | Inyección de Page y locators estables | Login/Inventory/Cart/Checkout pages | Typecheck y suite | Implementado y aprobado | Log y reportes | Ninguna |
| P-REQ-08 | Allure y Multiple Cucumber HTML | Requisito original | Dependencias sin integración Allure; metadata fija | Formatter, normalización y generación real | Config y scripts de reportes | Ambos reportes; Allure=Cucumber | Implementado; control bloqueante | Artifacts y `report-consistency.txt` | Compatibilidad registrada sin cambiar versiones |
| P-DEC-01 | Plan aprobado: contexto aislado | Decisión técnica | Page creada fuera del contexto | Page desde `context.newPage()` | `hooks.ts`, `ScenarioWorld` | Sesión limpia por escenario | Implementado y aprobado | Reporte y hooks | Ninguna |
| P-DEC-02 | Plan aprobado: secretos | Decisión técnica | Credenciales en Gherkin | Alias/env y scan bloqueante | env helper, features, script | Sin valores en artifacts | Implementado y aprobado | Resumen de seguridad | Logs Actions muestran secretos como `***` |
| P-DEC-03 | Plan aprobado: screenshots solo al fallar | Decisión técnica | Screenshot tras cada paso | Captura en After fallido | `hooks.ts` | Éxito sin screenshots; fallo con screenshot | Implementado y aprobado | Artifact condicional | Ninguna |
| P-RES-01 | Disponibilidad externa | Restricción | No diferenciada | Separación entre navegación y contrato DOM | `LoginPage.open` y docs | Navegación fallida mantiene rojo; DOM accesible es fallo funcional | Implementado | Log/JSON | SauceDemo fuera de control |
| P-CI-01 | Plan aprobado: CI independiente | Decisión técnica | Sin workflow | Node 22, npm ci, Chromium, artifacts always | `playwright-tests.yml` | Run remoto sobre SHA exacto | Implementado y ejecutado | Run 40447364535; para el SHA vigente, artifact y nota `qa-validation` | Actions v4 emitieron advertencia de runtime documentada |

## Identidad de la evidencia vigente

El run [40447364535](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40447364535) validó el SHA `6ab2aa8b25ebc0a720d0617280e6789e89e8afe5`: 5 features, 7 escenarios y 44 pasos aprobados. Cada nuevo SHA entregado debe incluir su propia identidad en `test-results/evidence/execution-summary.txt` y en la nota Git `refs/notes/qa-validation`; un resultado anterior no se hereda.
