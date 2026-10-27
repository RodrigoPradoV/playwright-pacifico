const fs = require('fs');
const path = require('path');

const roots = ['test-results', 'allure-results'];
const textExtensions = new Set(['.html', '.json', '.xml', '.txt', '.log', '.csv', '.properties']);
const findings = [];
let reviewed = 0;

function visit(target) {
    if (!fs.existsSync(target)) return;
    for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
        const fullPath = path.join(target, entry.name);
        if (entry.isDirectory()) {
            visit(fullPath);
        } else if (textExtensions.has(path.extname(entry.name).toLowerCase())) {
            reviewed += 1;
            const content = fs.readFileSync(fullPath, 'utf8');
            const configuredSecrets = [
                process.env.SAUCE_USERNAME,
                process.env.SAUCE_LOCKED_USERNAME,
                process.env.SAUCE_PASSWORD,
            ].filter(Boolean);
            if (configuredSecrets.some((value) => content.includes(value))) {
                findings.push(`Valor configurado detectado en ${fullPath}`);
            }
            const rawSecretPatterns = [
                /"password"\s*:\s*"(?!\*{3,})[^"]+"/i,
                /"token"\s*:\s*"(?!\*{3,})[^"]+"/i,
                /(?:Authorization|Cookie|Set-Cookie):\s*(?!\*{3,})\S+/i,
            ];
            if (rawSecretPatterns.some((pattern) => pattern.test(content))) {
                findings.push(`Patrón sensible sin enmascarar detectado en ${fullPath}`);
            }
        }
    }
}

for (const root of roots) visit(root);

const securityDirectory = path.join('test-results', 'security');
fs.mkdirSync(securityDirectory, { recursive: true });
const summaryPath = path.join(securityDirectory, 'secret-scan-summary.txt');

if (findings.length > 0) {
    fs.writeFileSync(summaryPath, [
        'Resultado: FALLIDO',
        `Fecha UTC: ${new Date().toISOString()}`,
        `Archivos inseguros: ${findings.length}`,
        'Los archivos afectados no deben publicarse como artifacts.',
        ...findings,
        '',
    ].join('\n'));
    console.error(`Se detectaron ${findings.length} posibles exposiciones. Consulte el resumen sanitizado.`);
    process.exit(1);
}

fs.writeFileSync(summaryPath, [
    'Resultado: APROBADO',
    `Fecha UTC: ${new Date().toISOString()}`,
    `Archivos de texto revisados: ${reviewed}`,
    'No se detectaron contraseñas, tokens ni headers de autenticación sin enmascarar.',
    '',
].join('\n'));
console.log(`Comprobación de secretos aprobada: ${reviewed} archivos revisados.`);
