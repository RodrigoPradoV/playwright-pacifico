const fs = require('fs');
const path = require('path');

const cucumberPath = path.resolve('test-results', 'reports', 'cucumber-report.json');
const allureSummaryPath = path.resolve('test-results', 'allure-report', 'widgets', 'summary.json');
const evidenceDirectory = path.resolve('test-results', 'evidence');
const summaryPath = path.join(evidenceDirectory, 'report-consistency.txt');

fs.mkdirSync(evidenceDirectory, { recursive: true });

function fail(message) {
    fs.writeFileSync(summaryPath, `Resultado: FALLIDO\nDetalle: ${message}\n`, 'utf8');
    console.error(message);
    process.exit(1);
}

if (!fs.existsSync(cucumberPath)) {
    fail('No existe el reporte JSON de Cucumber.');
}
if (!fs.existsSync(allureSummaryPath)) {
    fail('No existe el resumen del reporte Allure.');
}

const features = JSON.parse(fs.readFileSync(cucumberPath, 'utf8'));
const cucumberScenarios = features.reduce(
    (total, feature) => total + (feature.elements || []).filter((element) => element.type === 'scenario').length,
    0,
);
const allureSummary = JSON.parse(fs.readFileSync(allureSummaryPath, 'utf8'));
const allureScenarios = allureSummary.statistic?.total;

if (!Number.isInteger(allureScenarios)) {
    fail('El resumen Allure no contiene un total de casos válido.');
}
if (cucumberScenarios !== allureScenarios) {
    fail(`Conteo inconsistente: Cucumber=${cucumberScenarios}, Allure=${allureScenarios}.`);
}

const lines = [
    'Resultado: APROBADO',
    `Escenarios Cucumber: ${cucumberScenarios}`,
    `Casos Allure: ${allureScenarios}`,
    'Los Scenario Outline conservan una identidad independiente por fila.',
    '',
];
fs.writeFileSync(summaryPath, lines.join('\n'), 'utf8');
console.log(`Consistencia de reportes aprobada: ${cucumberScenarios} escenarios.`);
