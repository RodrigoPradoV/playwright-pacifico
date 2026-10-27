export {};

declare global {
    namespace NODEJS {
        interface ENV {
            BROWSER: "chrome" | "firefox" | "webkit",
            ENV: "dev" | "uat",
            BASEURL: string
        }
    }
}