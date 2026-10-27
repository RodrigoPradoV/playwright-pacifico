# Automatización web con Playwright y Cucumber

La referencia funcional principal se conserva en `docs/reference/Informe_Automatizacion_Playwright.pdf`. El proyecto automatiza SauceDemo y el estado original de OrangeHRM es recuperable mediante `baseline-playwright-original`.

## Requisitos

- Node 22 y npm.
- Dependencias instaladas exclusivamente con `npm ci`.
- Chromium instalado con `npx playwright install chromium`.
- Variables `SAUCE_USERNAME`, `SAUCE_LOCKED_USERNAME` y `SAUCE_PASSWORD`; consultar `.env.example` sin versionar valores reales.

## Ejecución

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run test:ci
npm run report:cucumber
npm run report:allure
npm run verify:secrets
```

`report:allure` normaliza la identidad de cada fila de `Scenario Outline` y falla si el total de casos Allure difiere del total de escenarios Cucumber. Las suites para Firefox y WebKit se mantienen configuradas como `npm run test:firefox` y `npm run test:webkit`; Chromium es el navegador obligatorio inicial. Los resultados bajo `test-results/` y `allure-results/` no se versionan.
