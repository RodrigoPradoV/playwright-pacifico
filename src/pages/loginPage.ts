import { expect, Page } from "@playwright/test";
import { baseUrl } from "../helper/env/env";

export default class LoginPage {
    constructor(private readonly page: Page) {}

    private readonly usernameInput = this.page.locator('[data-test="username"]');
    private readonly passwordInput = this.page.locator('[data-test="password"]');
    private readonly loginButton = this.page.locator('[data-test="login-button"]');
    private readonly errorMessage = this.page.locator('[data-test="error"]');

    async open(): Promise<void> {
        try {
            await this.page.goto(baseUrl(), { waitUntil: 'domcontentloaded', timeout: 30_000 });
            await expect(this.usernameInput).toBeVisible();
        } catch (error) {
            const detail = error instanceof Error ? error.message : String(error);
            throw new Error(`[DEPENDENCIA_EXTERNA] SauceDemo no estuvo accesible: ${detail}`);
        }
    }

    async login(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async expectError(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }
}
