import { expect, Page } from "@playwright/test";

export default class CheckoutPage {
    constructor(private readonly page: Page) {}

    private readonly firstName = this.page.locator('[data-test="firstName"]');
    private readonly lastName = this.page.locator('[data-test="lastName"]');
    private readonly postalCode = this.page.locator('[data-test="postalCode"]');
    private readonly continueButton = this.page.locator('[data-test="continue"]');
    private readonly finishButton = this.page.locator('[data-test="finish"]');
    private readonly confirmation = this.page.locator('[data-test="complete-header"]');
    private readonly errorMessage = this.page.locator('[data-test="error"]');

    async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    async continue(): Promise<void> {
        await this.continueButton.click();
    }

    async finish(): Promise<void> {
        await this.finishButton.click();
    }

    async expectCompleted(): Promise<void> {
        await expect(this.confirmation).toHaveText('Thank you for your order!');
    }

    async expectError(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}
