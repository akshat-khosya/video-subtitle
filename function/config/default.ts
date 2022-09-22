import env from 'dotenv';

class Config {
    _config: Record<string, any>;
    constructor() {
        env.config();
        this._config = {
            port: process.env.P_PORT,
        };


    }

    get(key: string): any {
        const val: any = this._config[key] ?? null;

        if (!val) {
            throw new Error(`Config for key [${key}] not found`);
        }

        return val;
    }
    set(key: string, val: any): void {
        this._config[key] = val;
    }
}


const config = new Config();

export default config;