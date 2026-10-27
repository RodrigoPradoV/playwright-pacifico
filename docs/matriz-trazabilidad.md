# Matriz de trazabilidad de Playwright

Secuencia obligatoria: PDF → tag `baseline-playwright-original` → modificación → prueba → evidencia del mismo commit.

| ID | Origen PDF | Clasificación | Estado inicial ZIP | Modificación | Implementación | Prueba y resultado esperado | Estado | Evidencia | Desviación |
|---|---|---|---|---|---|---|---|---|---|
| P-REQ-01 | SauceDemo como aplicación objetivo | Requisito original | Feature activa de OrangeHRM | Reemplazo total de cobertura activa | Features en `src/features` | URL/inventario de SauceDemo | Implementado; evidencia final pendiente | Reporte Cucumber vigente | OrangeHRM solo en baseline/docs |
| P-REQ-02 | Login exitoso | Requisito original | Login OrangeHRM | Cuenta por alias/env y aserción de inventario | `login-exitoso.feature`, `LoginPage` | Inventario visible | Implementado | JSON/HTML/Allure | Ninguna |
| P-REQ-03 | Login no exitoso | Requisito original | No implementado | Cuenta locked e invalid con Outline | `login-no-exitoso.feature` | Mensaje funcional esperado | Implementado | JSON/HTML/Allure | Ninguna |
| P-REQ-04 | Carrito | Requisito original | No implementado | Productos variables e aislamiento | `carrito.feature`, Page Objects | Badge y producto correcto | Implementado | JSON/HTML/Allure | Ninguna |
| P-REQ-05 | Checkout completo | Requisito original | No implementado | Flujo hasta confirmación | `checkout-completo.feature`, `CheckoutPage` | `Thank you for your order!` | Implementado | JSON/HTML/Allure | Ninguna |
| P-REQ-06 | Checkout negativo | Requisito original | No implementado | Código postal ausente | `checkout-negativo.feature` | Error requerido | Implementado | JSON/HTML/Allure | Ninguna |
| P-REQ-07 | Scenario Outline | Requisito original | No aplicado a SauceDemo | Login negativo y carrito parametrizados | Dos features Outline | Ejemplos ejecutados por separado | Implementado | Cucumber JSON | Ninguna |
| P-REQ-08 | Page Object Model | Requisito original | Pages globales/XPath absoluto | Inyección de Page y locators estables | Login/Inventory/Cart/Checkout pages | Typecheck y suite | Implementado | Log y reportes | Ninguna |
| P-REQ-09 | Allure y Multiple Cucumber HTML | Requisito original | Dependencias sin integración Allure; metadata fija | Formatter y generación real | Config/report scripts | Ambos reportes se generan | Implementado y aprobado localmente | Artifacts | Ajustes de compatibilidad documentados, sin cambiar versiones |
| P-DEC-01 | Plan aprobado: contexto aislado | Decisión técnica | Page creada fuera del contexto | Page desde `context.newPage()` | `hooks.ts`, `ScenarioWorld` | Sesión limpia por escenario | Implementado | Reporte + hooks | Ninguna |
| P-DEC-02 | Plan aprobado: secretos | Decisión técnica | Credenciales en Gherkin | Alias/env y scan bloqueante | env helper, features, script | Sin valores en artifacts | Implementado; scan final pendiente | Resumen de seguridad | Ninguna |
| P-DEC-03 | Plan aprobado: screenshots solo al fallar | Decisión técnica | Screenshot tras cada paso | Captura en After fallido | `hooks.ts` | Éxito sin screenshots; fallo con screenshot | Implementado | Artifact condicional | Ninguna |
| P-RES-01 | Disponibilidad externa | Restricción | No diferenciada | Errores rotulados y visibles | `LoginPage.open` y docs | Navegación fallida mantiene rojo | Aprobado | Log/JSON | SauceDemo fuera de control |
| P-CI-01 | Plan aprobado: CI independiente | Decisión técnica | Sin workflow | Node 22, npm ci, Chromium, artifacts always | `playwright-tests.yml` | Run remoto sobre SHA | Implementado; no ejecutado | URL/artifact pendiente | Requiere repositorio y secretos |
