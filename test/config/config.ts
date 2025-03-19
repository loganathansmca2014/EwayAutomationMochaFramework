import * as path from 'path';
import * as fs from 'fs/promises';

// Define an interface for the JSON structure
export interface EnvironmentConfig {
    environments: {
        QA: string;
        UAT: string;
        PROD: string;
    };
    searchData: {
        from: string;
        to: string;
        departureDate: string;
    };
}

// Function to load and parse the JSON file asynchronously
export const getConfig = async (): Promise<EnvironmentConfig> => {
    const filePath = path.resolve(__dirname, '../specs/data/testData.json');
    const rawData = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(rawData) as EnvironmentConfig;
};
