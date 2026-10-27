import { Then, When } from "@cucumber/cucumber";
import { ScenarioWorld } from "../helper/world";
import CartPage from "../pages/cartPage";
import CheckoutPage from "../pages/checkoutPage";

When('inicia el checkout', async function (this: ScenarioWorld) {
    await new CartPage(this.requirePage()).checkout();
});

When(
    'completa la información con nombre {string}, apellido {string} y código postal {string}',
    async function (this: ScenarioWorld, firstName: string, lastName: string, postalCode: string) {
        await new CheckoutPage(this.requirePage()).fillInformation(firstName, lastName, postalCode);
    }
);

When('continúa al resumen', async function (this: ScenarioWorld) {
    await new CheckoutPage(this.requirePage()).continue();
});

When('finaliza la compra', async function (this: ScenarioWorld) {
    await new CheckoutPage(this.requirePage()).finish();
});

Then('la compra se confirma', async function (this: ScenarioWorld) {
    await new CheckoutPage(this.requirePage()).expectCompleted();
});

Then('visualiza el error de checkout {string}', async function (this: ScenarioWorld, message: string) {
    await new CheckoutPage(this.requirePage()).expectError(message);
});
