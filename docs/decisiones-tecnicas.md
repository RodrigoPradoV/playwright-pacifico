# Decisiones técnicas de Playwright

## Clasificación

- **Requisito original:** afirmación comprobable del PDF.
- **Decisión técnica:** forma elegida para satisfacer un requisito.
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
| P-D07 | Decisión técnica | Una navegación fallida se etiqueta `[DEPENDENCIA_EXTERNA]`; una aserción accesible que no coincide es fallo funcional; lifecycle/configuración se etiqueta `[ERROR_TECNICO]`. Todos mantienen resultado fallido. |
| P-D08 | Restricción | SauceDemo es una aplicación pública compartida. DNS, timeout, navegación o indisponibilidad no se convierten en aprobados ni se reintentan silenciosamente. |
| P-D09 | Decisión técnica | Cucumber JSON/HTML, Multiple Cucumber HTML y Allure se generan desde la ejecución real; la limpieza previa impide mezclar resultados anteriores. |
| P-D10 | Decisión técnica | Chromium es obligatorio en el primer CI. Firefox y WebKit quedan configurados, pero su habilitación CI se difiere hasta estabilizar Chromium. |

## Mejoras fuera de alcance

No se incorporan pruebas de carga, seguridad, Docker ni integraciones corporativas antes del cierre de los dos casos principales.
