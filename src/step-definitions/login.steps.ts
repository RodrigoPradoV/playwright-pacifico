import { Given, Then, When } from "@cucumber/cucumber";
import { credentialsFor } from "../helper/env/env";
import { ScenarioWorld } from "../helper/world";
import InventoryPage from "../pages/inventoryPage";
import LoginPage from "../pages/loginPage";

Given('que el usuario abre SauceDemo', async function (this: ScenarioWorld) {
    await new LoginPage(this.requirePage()).open();
});

When('inicia sesión con la cuenta {string}', async function (this: ScenarioWorld, account: string) {
    const credentials = credentialsFor(account);
    await new LoginPage(this.requirePage()).login(credentials.username, credentials.password);
});

Then('visualiza el inventario', async function (this: ScenarioWorld) {
    await new InventoryPage(this.requirePage()).expectLoaded();
});

Then('visualiza el mensaje de acceso {string}', async function (this: ScenarioWorld, message: string) {
    await new LoginPage(this.requirePage()).expectError(message);
});

Given('que el usuario estándar inició sesión', async function (this: ScenarioWorld) {
    const loginPage = new LoginPage(this.requirePage());
    const credentials = credentialsFor('standard');
    await loginPage.open();
    await loginPage.login(credentials.username, credentials.password);
    await new InventoryPage(this.requirePage()).expectLoaded();
});
