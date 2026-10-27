import { setWorldConstructor, World } from "@cucumber/cucumber";
import { BrowserContext, Page } from "@playwright/test";

export class ScenarioWorld extends World {
    context?: BrowserContext;
    page?: Page;

    requirePage(): Page {
        if (!this.page) {
            throw new Error('[ERROR_TECNICO] La página del escenario no fue creada');
        }
        return this.page;
    }
}

setWorldConstructor(ScenarioWorld);
