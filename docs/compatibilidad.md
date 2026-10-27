# Compatibilidad de Playwright

## Versiones declaradas y resueltas

No se modificó `package-lock.json` ni se actualizó ninguna dependencia para forzar un resultado exitoso. Las versiones con `^` de `package.json` expresan rangos; las versiones efectivamente ejecutadas son las resueltas por el lockfile:

| Componente | Rango declarado | Versión resuelta |
|---|---:|---:|
| Node de CI | 22 | 22.23.3 en el run 40447364535 |
| `@cucumber/cucumber` | `^10.0.1` | 10.8.0 |
| `@playwright/test` | `^1.41.2` | 1.45.3 |
| `allure-cucumberjs` | `^2.12.0` | 2.15.1 |
| `allure-commandline` | `^2.27.0` | 2.29.0 |
| `multiple-cucumber-html-reporter` | `^3.5.0` | 3.7.0 |

`npm ci` reinstala exclusivamente esas resoluciones. El run 40447364535 informó 17 vulnerabilidades transitivas (1 baja, 8 moderadas y 8 altas) y paquetes deprecados. No se ejecutó `npm audit fix` porque alteraría el lockfile fuera del alcance aprobado.

## Allure y Cucumber

La documentación incluida en `allure-cucumberjs` 2.15.1 corresponde a una generación anterior de Cucumber, mientras el lockfile resuelve Cucumber 10.8.0. Durante la caracterización:

1. El primer dry-run falló porque el constructor del formatter requería un tercer objeto de opciones.
2. El segundo falló porque el target TypeScript implícito intentó invocar la clase `World` sin `new`.
3. Se añadieron el objeto de opciones y `target: ES2020`, sin cambiar versiones.

La primera ejecución CI generó 7 resultados Allure crudos, pero el HTML agrupó las filas de los dos `Scenario Outline` y mostró 5 casos. La causa fue una identidad histórica idéntica para las filas de cada Outline. Se incorporó `scripts/normalize-allure-results.js`, que deriva una identidad estable de los pasos ya parametrizados y no contiene credenciales. `scripts/verify-report-counts.js` compara el total de Cucumber y Allure y falla si difieren. Esta corrección mantiene las dependencias recibidas.

## GitHub Actions

En el run 40447364535, GitHub advirtió que `actions/checkout@v4`, `actions/setup-node@v4` y `actions/upload-artifact@v4` declaraban runtime Node 20 y que el runner las ejecutaría con Node 24. Es una advertencia del runtime interno de las Actions; la suite permaneció en Node 22.23.3. No se ocultó la advertencia ni se cambiaron las Actions sin una evaluación separada.

## Navegadores

La configuración diferencia cuatro valores:

- `chromium`: binario administrado por Playwright y obligatorio en CI.
- `chrome`: canal de Google Chrome instalado en el sistema; no es un alias de Chromium.
- `firefox`: binario Firefox administrado por Playwright.
- `webkit`: binario WebKit administrado por Playwright.

Los binarios Firefox y WebKit se instalan con la versión Playwright 1.45.3 bloqueada en `package-lock.json`. La evidencia cross-browser del SHA entregado se registra en los ZIP externos y en `refs/notes/qa-validation`.

En la instalación local del 2026-10-27, el CDN primario devolvió HTTP 400 para Firefox y WebKit. Playwright utilizó automáticamente su URL de respaldo y completó la instalación sin cambiar versiones. Se comprobaron Google Chrome 156.0.8078.48, Firefox 127.0 y WebKit 17.4.

## Perfiles dev y uat

El PDF menciona ejecución en `dev` y `uat`, pero el material recibido solo identifica la URL pública de SauceDemo. Por ello, ambos perfiles se validan de forma independiente usando el mismo servicio público y variables cargadas por separado. Esto prueba que la suite selecciona y registra el perfil solicitado; no prueba que existan dos despliegues distintos de SauceDemo. Una URL UAT diferente deberá suministrarse mediante `BASE_URL` si llega a existir.
