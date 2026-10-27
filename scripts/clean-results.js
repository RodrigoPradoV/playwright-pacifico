const fs = require('fs');
const path = require('path');

for (const directory of ['test-results', 'allure-results', 'allure-report']) {
    fs.rmSync(path.resolve(directory), { recursive: true, force: true });
}

console.log('Resultados anteriores eliminados.');
