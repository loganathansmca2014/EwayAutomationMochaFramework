import * as fs from 'fs';

// Function to read JSON asynchronously
export const readJsonFile = async (filePath: string): Promise<any> => {
    const rawData = await fs.promises.readFile(filePath, 'utf-8');
    return JSON.parse(rawData);
};
