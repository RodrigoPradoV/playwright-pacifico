# Decisiones técnicas de Playwright

## Clasificación

- **Requisito original:** afirmación comprobable del PDF.
- **Decisión técnica:** forma elegida para satisfacer un requisito o ampliar la cobertura aprobada.
- **Restricción:** condición de versiones, entorno o servicio externo.
- **Mejora opcional:** elemento no necesario para aprobar el caso.

## Decisiones vigentes

| ID | Clasificación | Decisión y justificación |
|---|---|---|
| P-D01 | Decisión técnica | La suite activa usa únicamente SauceDemo. OrangeHRM queda documentado en el baseline y recuperable mediante el tag. |
| P-D02 | Decisión técnica | Cada escenario crea un `BrowserContext` y abre su `Page` desde ese contexto. El hook de cierre se ejecuta aun cuando falle el escenario. |
| P-D03 | Decisión técnica | El navegador se comparte solo como proceso; cookies, storage, carrito y sesión viven en contextos separados. El paralelismo inicial es 1. |
| P-D04 | Decisión técnica | Los Page Objects reciben la página por constructor y usan atributos `data-test`, roles o texto estable. No se conservan XPath absolutos. |
| P-D05 | Decisión técnica | Los features usan alias de cuenta (`standard`, `locked`, `invalid`); nunca incluyen usuario real o contraseña. |
| P-D06 | Decisión técnica | Los screenshots se toman únicamente en el hook `After` cuando Cucumber informa `FAILED`, y se adjuntan al escenario además de guardarse como artifact. |
| P-D07 | Decisión técnica | Solo un fallo de navegación se etiqueta `[DEPENDENCIA_EXTERNA]`; una aplicación accesible que incumple el DOM o una aserción es fallo funcional; lifecycle/configuración se etiqueta `[ERROR_TECNICO]`. Todos mantienen resultado fallido. |
| P-D08 | Restricción | SauceDemo es una aplicación pública compartida. DNS, timeout, navegación o indisponibilidad no se convierten en aprobados ni se reintentan silenciosamente. |
| P-D09 | Decisión técnica | Cucumber JSON/HTML, Multiple Cucumber HTML y Allure se generan desde la ejecución real; la limpieza previa impide mezclar resultados anteriores. |
| P-D10 | Decisión técnica | CI ejecuta la matriz completa `dev`/`uat` × Chrome/Firefox/WebKit después de aprobar los gates de TypeScript y dependencias. `fail-fast: false` conserva el resultado independiente de las seis combinaciones. |
| P-D11 | Decisión técnica | El checkout negativo amplía la cobertura aprobada, pero no se atribuye al PDF como requisito original. |
| P-D12 | Decisión técnica | Las filas de `Scenario Outline` reciben una identidad Allure estable derivada de sus pasos parametrizados. Un control bloqueante exige que Allure y Cucumber informen el mismo total. No se cambiaron dependencias para conseguirlo. |
| P-D13 | Decisión técnica | La evidencia inmutable del SHA entregado se registra en el artifact `execution-summary.txt` y en `refs/notes/qa-validation`; así no se crea un commit posterior que deje la evidencia asociada a un SHA anterior. |
| P-D14 | Restricción | SauceDemo no proporciona URLs diferenciadas para `dev` y `uat` en el material recibido. Ambos perfiles apuntan al mismo servicio durante la validación y no se presentan como despliegues distintos. |
| P-D15 | Decisión técnica | `chrome` lanza el canal de Google Chrome instalado; `chromium` queda reservado para el binario administrado por Playwright. |
| P-D16 | Decisión técnica | Se ejecutan seis combinaciones explícitas (`dev`/`uat` × Chrome/Firefox/WebKit), localmente y en GitHub Actions, cada una con limpieza, reportes, comprobación Allure=Cucumber y scan de secretos independientes. |
| P-D17 | Decisión técnica | Las dependencias de automatización se actualizaron de forma explícita y regresiva; `allure-playwright` se retiró porque la integración activa es `allure-cucumberjs`. `npm audit --audit-level=high` es gate bloqueante. |
| P-D18 | Decisión técnica | Allure 3 utiliza su formatter oficial `allure-cucumberjs/reporter`; Multiple Cucumber HTML 4 se invoca desde un módulo ESM. Se mantiene el control bloqueante de 7 casos Cucumber = 7 casos Allure. |
| P-D19 | Decisión técnica | Los artifacts de cada combinación se nombran con entorno, navegador y SHA y se conservan durante 90 días. |

## Mejoras fuera de alcance

No se incorporan pruebas de carga, seguridad, Docker ni integraciones corporativas antes del cierre de los dos casos principales.
