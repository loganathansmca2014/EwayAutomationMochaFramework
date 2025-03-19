import { expect } from "chai";
import MakeMyTripPage from "../pageobjects/MakeMyTripPage";
import { getConfig, EnvironmentConfig } from "../config/config";

/**
 * Get Environment dynamically from command line argument
 */
const getEnvironment = (): string => {
    return process.env.TEST_ENV || "PROD"; // Default to PROD if not provided
};

describe("MakeMyTrip Flight Search - Page Object Model", function () {
    this.timeout(30000); // Increase timeout for async operations

    let testData: EnvironmentConfig;
    let environment: string = getEnvironment().toUpperCase();
    let baseUrl: string;

    before(async function () {
        testData = await getConfig();
        // environment is already assigned
        baseUrl = testData.environments[environment];

        if (!baseUrl) {
            throw new Error(`Invalid environment: ${environment}. Choose from QA, UAT, PROD.`);
        }

        console.log(`🚀 Running tests on: ${environment} (${baseUrl})`);

        // Display all environment URLs
        console.log("\n🌍 Environment URLs:");
        Object.entries(testData.environments).forEach(([key, value]) => {
            console.log(`   🔹 ${key}: ${value}`);
        });

        // Display Search Data
        console.log("\n🔍 Search Data:");
        console.log(`   🔹 From: ${testData.searchData.from}`);
        console.log(`   🔹 To: ${testData.searchData.to}`);
        console.log(`   🔹 Departure Date: ${testData.searchData.departureDate}`);
    });

    it(`Should search for flights on ${environment}`, async function () {
        const { from, to, departureDate } = testData.searchData;

        // Open MakeMyTrip based on environment
        await MakeMyTripPage.open(baseUrl);
        await browser.pause(5000);

        // Close popup if it appears
        await MakeMyTripPage.closePopup();

        // Search for flights
        await MakeMyTripPage.searchFlight(from, to, departureDate);

        // Wait for results and validate
        await browser.pause(5000);
        const results = await $$("div.flightList");
        expect(results.length).to.be.greaterThan(0);
    });
});