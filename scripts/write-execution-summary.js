const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

function output(command, args) {
    return execFileSync(command, args, { encoding: 'utf8' }).trim().split(/\r?\n/)[0];
}

const result = process.argv[2] || 'unknown';
const directory = path.join('test-results', 'evidence');
fs.mkdirSync(directory, { recursive: true });
const npmVersion = process.platform === 'win32'
    ? output(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', 'npm --version'])
    : output('npm', ['--version']);
const runUrl = process.env.GITHUB_SERVER_URL && process.env.GITHUB_REPOSITORY && process.env.GITHUB_RUN_ID
    ? `${process.env.GITHUB_SERVER_URL}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : 'local';
const lines = [
    'Repositorio: playwright-pacifico',
    `Commit SHA: ${output('git', ['rev-parse', 'HEAD'])}`,
    `Fecha UTC: ${new Date().toISOString()}`,
    `Run: ${runUrl}`,
    `Run attempt: ${process.env.GITHUB_RUN_ATTEMPT || 'local'}`,
    `Node: ${process.version}`,
    `npm: ${npmVersion}`,
    `Navegador: ${process.env.BROWSER || 'chromium'}`,
    'Comando: npm run test:ci',
    `Resultado real: ${result}`,
    '',
];
fs.writeFileSync(path.join(directory, 'execution-summary.txt'), lines.join('\n'));
