
import logger from '../utils/logger'; // Import logger

import CustomerObBoard from '../pageobjects/ewayCustomerPage';
import EwayCustomerAddress from '../pageobjects/ewayCustomerAddress';
import EwayCustomerContactFlow from '../businessflow/customerContactFlow';
import EwayLoginPage from '../pageobjects/ewayLoginPage';
import Globalfunction from '../utils/globalFunction';
import ewayLandingPage from '../pageobjects/ewayLandingPage';
import { expect } from '@wdio/globals';
import { fa, faker } from "@faker-js/faker";

describe("Feature :Customer OnBoard Page", () => {

    beforeEach('Before each Test', async () => {
        logger.info("Opening browser...");
        await EwayLoginPage.launchApplication('./');
    });

    it("TC01_Customer can give the Basic details", async () => {
        logger.info("Attempting login with valid credentials...");
        await EwayLoginPage.ewayLoginAuth('admin@lorax.com', 'admin');

        logger.info("Login successful.");
        await ewayLandingPage.ewaylandingLogo.waitForDisplayed({ timeout: 3000, timeoutMsg: 'Logo not found' });

        const isLogoDisplayed = await ewayLandingPage.isLogoDisplayed();
        expect(isLogoDisplayed).toBeDisplayed();

        logger.info("Logo displayed. Highlighting element...");
        await Globalfunction.highlightElement(await ewayLandingPage.ewaylandingLogo);
        await Globalfunction.takeScreenshot();
        if (await CustomerObBoard.customerlabel.isDisplayed) {
            let gstNumber = `GST${faker.string.alphanumeric(12).toUpperCase()}`;
            let panNumber = `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`;

            // Call the Method with the Faker Data
            await CustomerObBoard.customerlabel.click();
            await CustomerObBoard.addicon.waitForClickable({ timeout: 3000, timeoutMsg: 'Failed to click' })
            await CustomerObBoard.addicon.click();
            await expect(CustomerObBoard.addcustomerPanel).toHaveText('Add Customer');
            await CustomerObBoard.fillCustomerForm(faker.datatype.boolean(), faker.person.firstName(), faker.person.lastName(), gstNumber, panNumber);
            //await EwayCustomerAddress.customerCountry.click(); // Replace with your actual dropdown selector
            await EwayCustomerAddress.customerAddressInputForm(faker.person.firstName(), faker.location.streetAddress(), faker.location.secondaryAddress(), faker.location.zipCode())
            //await EwayCustomerAddress.selectDropdownValue(dropdown, faker.location.country());
            const mobileNumber = faker.string.numeric(10);

            console.log(mobileNumber);
            const faxNumber = `+1-${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`;
            console.log(`Fax: ${faxNumber}`);

            await EwayCustomerContactFlow.addCustomerContactdata(faker.person.fullName(), faker.person.jobTitle(), mobileNumber, 'test@test.com', mobileNumber, faxNumber)



        }




    })



})


