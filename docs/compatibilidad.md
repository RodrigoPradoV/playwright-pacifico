# Compatibilidad de Playwright

## Lockfile recibido

El proyecto conserva las versiones resueltas en `package-lock.json`; no se actualizó ninguna dependencia para forzar un resultado exitoso. Entre las versiones observadas están:

- Node objetivo de CI: 22.
- `@cucumber/cucumber`: 10.8.0.
- `@playwright/test`: 1.45.3.
- `allure-cucumberjs`: 2.15.1.
- `allure-commandline`: 2.27.0.
- `multiple-cucumber-html-reporter`: 3.5.0.

`npm ci` se ejecutó el 2026-10-27 y reinstaló 247 paquetes. npm informó 17 vulnerabilidades (1 baja, 8 moderadas y 8 altas) y deprecaciones transitivas. No se ejecutó `npm audit fix` ni se modificó el lockfile porque eso cambiaría versiones fuera de la validación aprobada.

## Allure y Cucumber

La documentación incluida en `allure-cucumberjs` 2.15.1 declara compatibilidad con una generación anterior de Cucumber, mientras el lockfile resuelve Cucumber 10.8.0. El primer dry-run falló porque el constructor del formatter requiere un tercer objeto de opciones; el segundo falló porque el `target` TypeScript implícito intentó invocar la clase `World` sin `new`. Se añadieron el objeto de opciones vacío y `target: ES2020`, sin cambiar versiones. Después de esas correcciones, el dry-run, la suite real de 7 escenarios y `allure generate` finalizaron correctamente.

## Navegadores

La configuración admite Chromium, Firefox y WebKit. Solo Chromium forma parte del criterio inicial de CI. La instalación del binario se realiza con el Playwright bloqueado en el lockfile.
