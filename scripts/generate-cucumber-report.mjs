import os from 'node:os';
import { generate } from 'multiple-cucumber-html-reporter';

await generate({
    jsonDir: 'test-results/reports',
    reportPath: 'test-results/multiple-cucumber-html-report',
    reportName: 'SauceDemo - Playwright y Cucumber',
    pageTitle: 'Evidencia SauceDemo',
    displayDuration: false,
    metadata: {
        browser: {
            name: process.env.BROWSER || 'chromium',
            version: process.env.BROWSER_VERSION || 'administrada por Playwright',
        },
        device: os.hostname(),
        platform: {
            name: os.platform(),
            version: os.release(),
        },
    },
    customData: {
        projectName: 'playwright-pacifico / SauceDemo',
        release: process.env.GITHUB_SHA || 'local',
        testCycle: 'Regresión BDD',
        buildNumber: process.env.GITHUB_RUN_ID || 'local',
        environment: process.env.ENV || 'dev',
        ciPipeline: process.env.GITHUB_ACTIONS ? 'GitHub Actions' : 'local',
    },
});
