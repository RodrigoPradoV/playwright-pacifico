module.exports = {
    default: {
        tags: process.env.npm_config_tags || "",
        formatOptions: {
            snippetInterface: "async-await",
            colorsEnabled: true
        },
        paths: [
            "src/features/**/*.feature"
        ],
        dryRun: false,
        require: [
            "src/step-definitions/**/*.ts",
            "src/hooks/**/*.ts",
            "src/helper/world.ts"
        ],
        requireModule: [
            "ts-node/register"
        ],
        format: [
            "progress-bar",
            "html:./test-results/reports/cucumber-report.html",
            "json:./test-results/reports/cucumber-report.json",
            "./config/allure-reporter.js"
        ],
        parallel: 1
    }
}
