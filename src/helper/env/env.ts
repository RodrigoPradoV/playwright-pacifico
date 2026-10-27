import * as dotenv from 'dotenv'
import * as fs from 'fs'

export const getEnv = () => {
    const environment = process.env.ENV || 'dev';
    const envPath = `src/helper/env/.env.${environment}`;
    if (fs.existsSync(envPath)) {
        dotenv.config({
            override: false,
            path: envPath
        });
    }
}

export const requireEnv = (name: string): string => {
    const value = process.env[name];
    if (!value) {
        throw new Error(`[ERROR_TECNICO] Falta la variable de entorno ${name}`);
    }
    return value;
}

export const baseUrl = (): string => process.env.BASE_URL || 'https://www.saucedemo.com';

export const credentialsFor = (account: string): { username: string; password: string } => {
    if (account === 'standard') {
        return { username: requireEnv('SAUCE_USERNAME'), password: requireEnv('SAUCE_PASSWORD') };
    }
    if (account === 'locked') {
        return { username: requireEnv('SAUCE_LOCKED_USERNAME'), password: requireEnv('SAUCE_PASSWORD') };
    }
    if (account === 'invalid') {
        const unique = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        return { username: `invalid-${unique}`, password: `invalid-${unique}` };
    }
    throw new Error(`[ERROR_TECNICO] Alias de cuenta no soportado: ${account}`);
}
