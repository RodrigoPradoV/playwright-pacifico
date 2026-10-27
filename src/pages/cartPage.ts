import { expect, Page } from "@playwright/test";

export default class CartPage {
    constructor(private readonly page: Page) {}

    private readonly checkoutButton = this.page.locator('[data-test="checkout"]');

    async expectProduct(productName: string): Promise<void> {
        const product = this.page.locator('[data-test="inventory-item"]', { hasText: productName });
        await expect(product.locator('[data-test="inventory-item-name"]')).toHaveText(productName);
    }

    async checkout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
