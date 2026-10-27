import { After, AfterAll, AfterStep, Before, BeforeAll } from "@cucumber/cucumber";
import { invokeBrowser } from "../helper/browsers/browserManager";
import { getEnv } from "../helper/env/env";

BeforeAll(async function () {
    getEnv();
    global.browser = await invokeBrowser();
});

Before(async function () {
    global.context = await global.browser.newContext();
    global.page = await global.browser.newPage();
});

After(async function () {
    await global.page.close();
    await global.context.close();
});

AfterAll(async function () {
    await global.browser.close();
});

AfterStep(async function () {
    const img = await global.page.screenshot({ type: "png" });
    await this.attach(img, "image/png");
})

