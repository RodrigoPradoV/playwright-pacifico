import { After, AfterAll, Before, BeforeAll, Status } from "@cucumber/cucumber";
import { Browser } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";
import { ScenarioWorld } from "../helper/world";

let browser: Browser | undefined;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function (this: ScenarioWorld) {
    if (!browser) {
        throw new Error('[ERROR_TECNICO] El navegador no fue inicializado');
    }
    this.context = await browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: ScenarioWorld, scenario) {
    const hookErrors: string[] = [];

    if (scenario.result?.status === Status.FAILED && this.page) {
        try {
            const directory = path.join('test-results', 'screenshots');
            fs.mkdirSync(directory, { recursive: true });
            const safeName = scenario.pickle.name.replace(/[^a-zA-Z0-9-_]+/g, '-').slice(0, 80);
            const screenshotPath = path.join(directory, `${safeName}-${Date.now()}.png`);
            const image = await this.page.screenshot({ path: screenshotPath, type: 'png', fullPage: true });
            await this.attach(image, 'image/png');
        } catch (error) {
            hookErrors.push(`screenshot: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    try {
        if (this.page && !this.page.isClosed()) {
            await this.page.close();
        }
    } catch (error) {
        hookErrors.push(`page.close: ${error instanceof Error ? error.message : String(error)}`);
    }

    try {
        if (this.context) {
            await this.context.close();
        }
    } catch (error) {
        hookErrors.push(`context.close: ${error instanceof Error ? error.message : String(error)}`);
    }

    this.page = undefined;
    this.context = undefined;

    if (hookErrors.length > 0) {
        throw new Error(`[ERROR_TECNICO] Falló el cierre del escenario: ${hookErrors.join(' | ')}`);
    }
});

AfterAll(async function () {
    if (browser) {
        await browser.close();
        browser = undefined;
    }
});
