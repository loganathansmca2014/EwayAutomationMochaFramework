import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export async function getEnvironmentDetails() {
    const url = await browser.getUrl(); // Get the test URL dynamically
    const hostname = new URL(url).hostname;
    const envMatch = hostname.match(/-(dev|qa|prod|staging)\./);

    const environment = envMatch ? envMatch[1].toUpperCase() : process.env.ENVIRONMENT;

    return {
        environment,
        environmentURL: process.env.ENV_URL || url,
        systemName: process.env.SYSTEM_NAME || "Unknown System",
        osName: process.env.OS_NAME || require("os").type(),
        startTime: new Date().toISOString(),
    };
}
