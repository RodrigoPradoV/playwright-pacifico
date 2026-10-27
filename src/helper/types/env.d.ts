declare namespace NodeJS {
    interface ProcessEnv {
        ENV?: 'dev' | 'uat' | 'ci';
        BROWSER?: 'chromium' | 'chrome' | 'firefox' | 'webkit';
        HEADLESS?: 'true' | 'false';
        BASE_URL?: string;
        SAUCE_USERNAME?: string;
        SAUCE_LOCKED_USERNAME?: string;
        SAUCE_PASSWORD?: string;
        BROWSER_VERSION?: string;
        EXECUTION_COMMAND?: string;
    }
}
