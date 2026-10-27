import { expect, Page } from "@playwright/test";

export default class InventoryPage {
    constructor(private readonly page: Page) {}

    private readonly inventory = this.page.locator('[data-test="inventory-container"]');
    private readonly cartLink = this.page.locator('[data-test="shopping-cart-link"]');
    private readonly cartBadge = this.page.locator('[data-test="shopping-cart-badge"]');

    async expectLoaded(): Promise<void> {
        await expect(this.page).toHaveURL(/inventory\.html/);
        await expect(this.inventory).toBeVisible();
    }

    async addProduct(productName: string): Promise<void> {
        const product = this.page.locator('[data-test="inventory-item"]', { hasText: productName });
        await expect(product.locator('[data-test="inventory-item-name"]')).toHaveText(productName);
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async expectCartCount(count: number): Promise<void> {
        await expect(this.cartBadge).toHaveText(String(count));
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}
