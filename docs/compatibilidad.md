# Compatibilidad de Playwright

## Versiones declaradas y resueltas

La actualización se realizó de forma explícita y regeneró `package-lock.json`; no se usó `--force`. Las versiones con `^` de `package.json` expresan rangos y las versiones efectivamente ejecutadas son las resueltas por el lockfile:

| Componente | Rango declarado | Versión resuelta |
|---|---:|---:|
| Node de CI | 22 | 22.x |
| `@cucumber/cucumber` | `^13.3.0` | 13.3.0 |
| `@playwright/test` | `^1.64.1` | 1.64.1 |
| `allure-cucumberjs` | `^3.14.0` | 3.14.0 |
| `allure-commandline` | `^2.46.1` | 2.46.1 |
| `multiple-cucumber-html-reporter` | `^4.5.0` | 4.5.0 |
| `typescript` | `^5.9.3` | 5.9.3 |

`npm ci` reinstala exclusivamente esas resoluciones. Antes de la actualización, `npm audit` informaba 17 vulnerabilidades en el árbol, incluyendo dependencias directas afectadas. La migración explícita y un ajuste transitivo no forzado redujeron el resultado a 0 vulnerabilidades. `npm run audit:dependencies` bloquea CI cuando aparece una vulnerabilidad alta o crítica.

## Allure y Cucumber

La implementación inicial combinaba `allure-cucumberjs` 2.15.1 con Cucumber 10.8.0. Durante aquella caracterización:

1. El primer dry-run falló porque el constructor del formatter requería un tercer objeto de opciones.
2. El segundo falló porque el target TypeScript implícito intentó invocar la clase `World` sin `new`.
3. Se añadieron el objeto de opciones y `target: ES2020`, sin cambiar versiones.

La primera ejecución CI generó 7 resultados Allure crudos, pero el HTML agrupó las filas de los dos `Scenario Outline` y mostró 5 casos. La causa fue una identidad histórica idéntica para las filas de cada Outline. Se incorporó `scripts/normalize-allure-results.js`, que deriva una identidad estable de los pasos ya parametrizados y no contiene credenciales. `scripts/verify-report-counts.js` compara el total de Cucumber y Allure y falla si difieren.

La actualización actual usa el formatter público `allure-cucumberjs/reporter` de Allure 3.14.0. Multiple Cucumber HTML 4.5.0 es ESM y se genera mediante `scripts/generate-cucumber-report.mjs`. La regresión confirmó nuevamente 7 resultados independientes en ambos reportes.

## GitHub Actions

En el run final 40462024280, GitHub advirtió que `actions/checkout@v4`, `actions/setup-node@v4` y `actions/upload-artifact@v4` declaraban runtime Node 20 y que el runner las ejecutaría con Node 24. Es una advertencia del runtime interno de las Actions; la suite permaneció en Node 22.23.3. No se ocultó la advertencia ni se cambiaron las Actions sin una evaluación separada.

## Navegadores

La configuración diferencia cuatro valores:

- `chromium`: binario administrado por Playwright para ejecuciones focalizadas.
- `chrome`: canal de Google Chrome instalado en el sistema; no es un alias de Chromium.
- `firefox`: binario Firefox administrado por Playwright.
- `webkit`: binario WebKit administrado por Playwright.

Los navegadores administrados se instalan con Playwright 1.64.1 bloqueado en `package-lock.json`. El workflow instala cada navegador dentro de su job y no reutiliza resultados entre combinaciones.

En la regresión local posterior a la actualización se comprobaron Google Chrome 156.0.8078.48, Firefox 157.0 y WebKit 27.2. Las seis combinaciones `dev`/`uat` aprobaron 7/7 escenarios sin reintentos.

## Perfiles dev y uat

El PDF menciona ejecución en `dev` y `uat`, pero el material recibido solo identifica la URL pública de SauceDemo. Por ello, ambos perfiles se validan de forma independiente usando el mismo servicio público y variables cargadas por separado. Esto prueba que la suite selecciona y registra el perfil solicitado; no prueba que existan dos despliegues distintos de SauceDemo. Una URL UAT diferente deberá suministrarse mediante `BASE_URL` si llega a existir.

## Validación histórica y regresión actual

El SHA `f52fe9edd0e4fc9b12b10ba870bffb06189b733d` aprobó las seis combinaciones locales `dev`/`uat` con Google Chrome 156.0.8078.48, Firefox 127.0 y WebKit 17.4. Cada ejecución informó 5 features, 7/7 escenarios, 44 pasos, 7/7 casos Allure, reportes aprobados y cero hallazgos de secretos.

El [run `40462024280`](https://github.com/RodrigoPradoV/playwright-pacifico/actions/runs/40462024280) validó ese mismo SHA con Chromium, Node 22.23.3 y npm 10.9.9. El job terminó con exit code 0, igualdad Allure=Cucumber de 7 casos y escaneo aprobado de 64 archivos. Los artifacts de evidencia y seguridad tienen los ID `12715280879` y `12715290928`, respectivamente.

La regresión local de la actualización aprobó typecheck, auditoría con 0 vulnerabilidades, 6/6 combinaciones cross-browser, generación Multiple Cucumber HTML 4.5.0, Allure 3.14.0 y consistencia 7 Cucumber = 7 Allure. La evidencia remota del nuevo SHA se adjunta por cada celda de la matriz del workflow y se relaciona mediante `refs/notes/qa-validation` sin crear un commit documental posterior.
