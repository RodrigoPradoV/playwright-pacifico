# Matriz de trazabilidad de Playwright

Secuencia obligatoria: PDF → tag `baseline-playwright-original` → modificación → prueba → evidencia del mismo commit.

## Evidencia final vigente

- Commit funcional validado: `f52fe9edd0e4fc9b12b10ba870bffb06189b733d`.
- Matriz local: 6/6 combinaciones aprobadas (`dev`/`uat` × Google Chrome/Firefox/WebKit), sin reintentos.
- Resultado por combinación: 5 features, 7/7 escenarios, 44 pasos, 7/7 casos Allure, reportes y escaneo de secretos aprobados.
- GitHub Actions: [run `40462024280`](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40462024280), aprobado con Chromium, Node 22.23.3 y npm 10.9.9.
- Artifacts finales: evidencia ID `12715280879` y seguridad ID `12715290928`; hashes registrados en `refs/notes/qa-validation` y copias descargadas en `Ejecucion-Playwright/`.

La actualización de endurecimiento conserva los 7 escenarios y aprobó localmente 6/6 combinaciones con Playwright 1.64.1, Cucumber 13.3.0, Allure 3.14.0, Multiple Cucumber HTML 4.5.0 y `npm audit` con 0 vulnerabilidades. El workflow actual exige typecheck/auditoría y ejecuta esas seis combinaciones como jobs independientes; la identidad remota del SHA entregado se registra en su nota `qa-validation`.

| ID | Origen PDF | Clasificación | Estado inicial ZIP | Modificación | Implementación | Prueba y resultado esperado | Estado | Evidencia | Desviación |
|---|---|---|---|---|---|---|---|---|---|
| P-REQ-01 | SauceDemo como aplicación objetivo | Requisito original | Feature activa de OrangeHRM | Reemplazo total de cobertura activa | Features en `src/features` | URL e inventario de SauceDemo | Implementado y aprobado en el SHA final | Cucumber JSON/HTML y Allure del artifact final | OrangeHRM solo en baseline/docs |
| P-REQ-02 | Login exitoso | Requisito original | Login OrangeHRM | Cuenta por alias/env y aserción de inventario | `login-exitoso.feature`, `LoginPage` | Inventario visible | Implementado y aprobado en CI y matriz | Reportes finales | Ninguna |
| P-REQ-03 | Login no exitoso | Requisito original | No implementado | Cuenta locked e invalid con Outline | `login-no-exitoso.feature` | Mensaje funcional esperado en dos ejemplos | Implementado y aprobado en CI y matriz | Reportes finales | Ninguna |
| P-REQ-04 | Carrito | Requisito original | No implementado | Productos variables e aislamiento | `carrito.feature`, Page Objects | Badge y producto correcto en dos ejemplos | Implementado y aprobado en CI y matriz | Reportes finales | Ninguna |
| P-REQ-05 | Checkout completo | Requisito original | No implementado | Flujo hasta confirmación | `checkout-completo.feature`, `CheckoutPage` | `Thank you for your order!` | Implementado y aprobado en CI y matriz | Reportes finales | Ninguna |
| P-DEC-04 | Checkout negativo | Decisión técnica: cobertura adicional aprobada | No implementado | Código postal ausente | `checkout-negativo.feature` | Error requerido | Implementado y aprobado en CI y matriz | Reportes finales | No se presenta como requisito del PDF |
| P-REQ-06 | Scenario Outline | Requisito original | No aplicado a SauceDemo | Login negativo y carrito parametrizados | Dos features Outline | Cuatro ejemplos ejecutados de forma independiente | Implementado y aprobado en CI y matriz | Cucumber y Allure informan 7 casos | Ninguna |
| P-REQ-07 | Page Object Model | Requisito original | Pages globales/XPath absoluto | Inyección de Page y locators estables | Login/Inventory/Cart/Checkout pages | Typecheck y suite | Implementado y aprobado en CI y matriz | Log y reportes finales | Ninguna |
| P-REQ-08 | Allure y Multiple Cucumber HTML | Requisito original | Dependencias sin integración Allure; metadata fija | Formatter oficial Allure 3, reporter ESM, normalización y generación real | Config y scripts de reportes | Ambos reportes; Allure=Cucumber | Implementado y aprobado con control bloqueante | `report-consistency.txt`: 7 Cucumber = 7 Allure | Adaptadores actualizados sin cambiar la cobertura funcional |
| P-REQ-09 | Scripts para dev, uat, chrome, firefox y webkit | Requisito original | Scripts parciales; `chrome` era alias de Chromium; sin evidencia completa | Perfiles y matriz explícita de seis combinaciones | `package.json`, `browserManager.ts`, env helper y workflow | 7/7 escenarios por combinación | Implementado; matriz 6/6 aprobada localmente y automatizada en CI | Artifacts independientes por entorno/navegador/SHA | dev y uat usan la misma URL pública; no representan despliegues distintos |
| P-DEC-01 | Plan aprobado: contexto aislado | Decisión técnica | Page creada fuera del contexto | Page desde `context.newPage()` | `hooks.ts`, `ScenarioWorld` | Sesión limpia por escenario | Implementado y aprobado en CI y matriz | Reportes y hooks | Ninguna |
| P-DEC-02 | Plan aprobado: secretos | Decisión técnica | Credenciales en Gherkin | Alias/env y scan bloqueante | env helper, features, script | Sin valores en artifacts | Implementado y aprobado en CI y matriz | 64 archivos CI y 63 por combinación sin hallazgos | Logs Actions muestran secretos como `***` |
| P-DEC-03 | Plan aprobado: screenshots solo al fallar | Decisión técnica | Screenshot tras cada paso | Captura en After fallido | `hooks.ts` | Éxito sin screenshots; fallo con screenshot | Implementado y aprobado en CI y matriz | Cero screenshots en ejecuciones exitosas | Ninguna |
| P-RES-01 | Disponibilidad externa | Restricción | No diferenciada | Separación entre navegación y contrato DOM | `LoginPage.open` y docs | Navegación fallida mantiene rojo; DOM accesible es fallo funcional | Implementado | Log/JSON | SauceDemo fuera de control |
| P-CI-01 | Plan aprobado: CI independiente | Decisión técnica | Sin workflow | Gate de typecheck/audit y matriz `dev`/`uat` × Chrome/Firefox/WebKit | `playwright-tests.yml` | Seis jobs, reportes y artifacts independientes sobre SHA exacto | Implementado; el workflow conserva `fail-fast: false` | Evidencia por celda con retención de 90 días | Actions v4 pueden emitir la advertencia de runtime ya documentada |
| P-SEC-01 | Endurecimiento de dependencias | Mejora técnica | 17 vulnerabilidades en el árbol recibido | Actualización explícita y retiro de `allure-playwright` no utilizado | `package.json`, `package-lock.json`, workflow | `npm audit --audit-level=high` | Implementado; auditoría local con 0 vulnerabilidades | Salida de quality gate | Nuevos avisos futuros vuelven a evaluarse, no se corrigen con `--force` |

## Identidad de la evidencia vigente

El run [40462024280](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40462024280) validó el SHA `f52fe9edd0e4fc9b12b10ba870bffb06189b733d`: 5 features, 7 escenarios, 44 pasos, 7 casos Allure y escaneo de 64 archivos aprobados. La matriz local del mismo SHA aprobó además las seis combinaciones de perfil y navegador. Cada nuevo SHA entregado debe incluir su propia identidad en `test-results/evidence/execution-summary.txt` y en la nota Git `refs/notes/qa-validation`; un resultado anterior no se hereda.
