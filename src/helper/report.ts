const report = require("multiple-cucumber-html-reporter");
const os = require("os");

report.generate({
    jsonDir: "test-results/reports",
    reportPath: "test-results/multiple-cucumber-html-report",
    reportName: "SauceDemo - Playwright y Cucumber",
    pageTitle: "Evidencia SauceDemo",
    displayDuration: false,
    metadata: {
        browser: {
            name: process.env.BROWSER || "chromium",
            version: "administrada por Playwright",
        },
        device: os.hostname(),
        platform: {
            name: os.platform(),
            version: os.release(),
        },
    },
    customData: {
        title: "Identidad de ejecución",
        data: [
            { label: "Proyecto", value: "playwright-pacifico / SauceDemo" },
            { label: "Commit", value: process.env.GITHUB_SHA || "local" },
            { label: "Fecha UTC", value: new Date().toISOString() }
        ],
    },
});
