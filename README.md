# Automatización web con Playwright y Cucumber

La referencia funcional principal se conserva en `docs/reference/Informe_Automatizacion_Playwright.pdf`. El proyecto automatiza SauceDemo y el estado original de OrangeHRM es recuperable mediante `baseline-playwright-original`.

## Requisitos

- Node 22 y npm.
- Dependencias instaladas exclusivamente con `npm ci`.
- Chromium, Firefox y WebKit instalados con Playwright; Google Chrome instalado para el canal `chrome`.
- Variables `SAUCE_USERNAME`, `SAUCE_LOCKED_USERNAME` y `SAUCE_PASSWORD`; consultar `.env.example` sin versionar valores reales.

## Ejecución

```bash
npm ci
npx playwright install chromium
npm run typecheck
npm run audit:dependencies
npm run test:ci
npm run report:cucumber
npm run report:allure
npm run verify:secrets
```

La matriz multientorno y cross-browser se ejecuta con scripts explícitos:

```bash
npm run test:dev:chrome
npm run test:dev:firefox
npm run test:dev:webkit
npm run test:uat:chrome
npm run test:uat:firefox
npm run test:uat:webkit
```

Los perfiles `dev` y `uat` leen variables del proceso o de `.env.dev` y `.env.uat`, respectivamente. Como SauceDemo solo publica una URL en el alcance recibido, ambos perfiles pueden apuntar al mismo `BASE_URL`; esto valida la selección de configuración, no dos despliegues independientes.

`chrome` usa Google Chrome mediante el canal Playwright correspondiente; `chromium` conserva el binario administrado por Playwright para ejecuciones focalizadas. `report:allure` normaliza la identidad de cada fila de `Scenario Outline` y falla si el total de casos Allure difiere del total de escenarios Cucumber. Los resultados bajo `test-results/` y `allure-results/` no se versionan.

GitHub Actions ejecuta primero `typecheck` y la auditoría bloqueante de dependencias. Si ambos gates aprueban, lanza la matriz completa `dev`/`uat` × Chrome/Firefox/WebKit. Cada combinación genera y verifica sus propios reportes, escanea secretos y publica un artifact identificado por entorno, navegador y SHA con retención de 90 días.

## Evidencia de cierre

La cobertura funcional quedó validada sobre el SHA `f52fe9edd0e4fc9b12b10ba870bffb06189b733d`: la matriz local aprobó las seis combinaciones `dev`/`uat` con Google Chrome, Firefox y WebKit, siempre con 5 features, 7/7 escenarios, 44 pasos y 7/7 casos Allure. GitHub Actions aprobó el mismo SHA en el [run `40462024280`](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40462024280) con Chromium, generación de ambos reportes y escaneo de 64 archivos sin secretos expuestos. Los hashes de las evidencias descargadas se conservan en `refs/notes/qa-validation`.
