import { Browser, chromium, firefox, webkit } from "@playwright/test";

const options = {
    headless: process.env.HEADLESS !== "false"
}

export const invokeBrowser = (): Promise<Browser> => {
    const browserType = process.env.BROWSER || "chromium";
    switch (browserType) {
        case "chromium":
        case "chrome":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error(`[ERROR_TECNICO] Navegador no soportado: ${browserType}`);
    }
}
