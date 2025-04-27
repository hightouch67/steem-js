import each from 'lodash/each';
const defaultConfig = require('../config.json');

class Config {
    constructor() {
        this._config = {
            websocket: defaultConfig.websocket,
            uri: defaultConfig.uri,
            url: defaultConfig.url,
            retry: defaultConfig.retry,
            agent: defaultConfig.agent,
            chain_id: defaultConfig.chain_id,
            address_prefix: defaultConfig.address_prefix,
            rebranded_api: defaultConfig.rebranded_api || false,
            useAppbaseApi: defaultConfig.useAppbaseApi || false,
        };
    }

    set(key, value) {
        this._config[key] = value;
    }

    get(key) {
        return this._config[key];
    }

    isProduction() {
        return this.get('env') === 'production';
    }
}

// Create a singleton instance
const config = new Config();

export default config;
