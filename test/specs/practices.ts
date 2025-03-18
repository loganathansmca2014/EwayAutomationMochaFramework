import BrowserNaviGate from '../pageobjects/navComponents/browserNav';
import logger from '../utils/logger'; // Import logger
import fs from 'fs'; // Import fs module
import path from 'path'; // Import path module
import dotenv from 'dotenv';

// Load .env file
dotenv.config();
class Eway {
    private config: any;

    constructor() {
        this.loadConfig();
    }
    private loadConfig() {
        const configFile = fs.readFileSync('./config.json', 'utf-8');  // Read JSON file
        this.config = JSON.parse(configFile);
    }
    public getEnvironmentConfig() {
        const envName = process.env.TEST_ENV || "Apollo";  // Default to Apollo if not set
        if (this.config.env[envName]) {
            return this.config.env[envName].automationUser;
        } else {
            throw new Error(`Environment ${envName} not found in config.json`);
        }
    }
    
    async ewayLoginAuth(envName: string) {
        const envFilePath = path.resolve(__dirname, '../specs/data/env.json');
        const envData = JSON.parse(fs.readFileSync(envFilePath, 'utf-8'));
        const userConfig = envData.env[envName].automationUser;
       const email=userConfig.email;
        const pass=userConfig.password;
    }
    
}

export default new Eway();