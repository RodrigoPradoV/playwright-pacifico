const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const resultsDirectory = path.resolve('allure-results');

function md5(value) {
    return crypto.createHash('md5').update(value, 'utf8').digest('hex');
}

if (!fs.existsSync(resultsDirectory)) {
    console.log('No hay resultados Allure para normalizar.');
    process.exit(0);
}

const results = fs.readdirSync(resultsDirectory)
    .filter((name) => name.endsWith('-result.json'))
    .map((name) => {
        const filePath = path.join(resultsDirectory, name);
        return {
            filePath,
            result: JSON.parse(fs.readFileSync(filePath, 'utf8')),
        };
    });

const groups = new Map();
for (const entry of results) {
    const key = entry.result.fullName || entry.result.name;
    const group = groups.get(key) || [];
    group.push(entry);
    groups.set(key, group);
}

let normalized = 0;
for (const group of groups.values()) {
    if (group.length < 2) continue;

    const ordered = group
        .map((entry) => ({
            ...entry,
            stepSignature: (entry.result.steps || []).map((step) => step.name).join('\n'),
        }))
        .sort((left, right) => left.stepSignature.localeCompare(right.stepSignature));

    const signatureOccurrences = new Map();
    ordered.forEach((entry, index) => {
        const occurrence = (signatureOccurrences.get(entry.stepSignature) || 0) + 1;
        signatureOccurrences.set(entry.stepSignature, occurrence);

        const identitySource = `${entry.stepSignature}\noccurrence=${occurrence}`;
        const exampleIdentity = md5(identitySource);
        const originalFullName = entry.result.fullName || entry.result.name;
        const uniqueFullName = `${originalFullName}#example-${exampleIdentity}`;
        const testCaseId = md5(uniqueFullName);

        entry.result.name = `${entry.result.name} [ejemplo ${index + 1}]`;
        entry.result.fullName = uniqueFullName;
        entry.result.testCaseId = testCaseId;
        entry.result.historyId = `${testCaseId}:${exampleIdentity}`;
        entry.result.parameters = [
            ...(entry.result.parameters || []).filter((parameter) => parameter.name !== 'Ejemplo'),
            { name: 'Ejemplo', value: String(index + 1) },
        ];

        fs.writeFileSync(entry.filePath, `${JSON.stringify(entry.result)}\n`, 'utf8');
        normalized += 1;
    });
}

console.log(`Identidad Allure normalizada para ${normalized} resultados de Scenario Outline.`);
