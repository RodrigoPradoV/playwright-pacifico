import { Given, Then, When } from "@cucumber/cucumber";
import { ScenarioWorld } from "../helper/world";
import CartPage from "../pages/cartPage";
import InventoryPage from "../pages/inventoryPage";

When('agrega {string} al carrito', async function (this: ScenarioWorld, product: string) {
    const inventory = new InventoryPage(this.requirePage());
    await inventory.addProduct(product);
    await inventory.expectCartCount(1);
});

When('abre el carrito', async function (this: ScenarioWorld) {
    await new InventoryPage(this.requirePage()).openCart();
});

Then('el carrito contiene {string}', async function (this: ScenarioWorld, product: string) {
    await new CartPage(this.requirePage()).expectProduct(product);
});

Given('que tiene {string} en el carrito', async function (this: ScenarioWorld, product: string) {
    const inventory = new InventoryPage(this.requirePage());
    await inventory.addProduct(product);
    await inventory.expectCartCount(1);
    await inventory.openCart();
    await new CartPage(this.requirePage()).expectProduct(product);
});
