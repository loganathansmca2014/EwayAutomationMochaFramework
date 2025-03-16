
import logger from '../utils/logger'; // Import logger

import CustomerObBoard from '../pageobjects/ewayCustomerPage';
import EwayCustomerAddress from '../pageobjects/ewayCustomerAddress';
import EwayCustomerAddressflow from '../businessflow/customerAddressFlow';
import EwayCustomerContactFlow from '../businessflow/customerContactFlow';
import CustomerBasicFlow from '../businessflow/customerBasicFlow';
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

        await CustomerBasicFlow.customerBasicInfo();
        await EwayCustomerAddressflow.ewaycutomerAddressInfo()
        //await EwayCustomerAddress.selectDropdownValue(dropdown, faker.location.country());
        const mobileNumber = faker.string.numeric(10);
        console.log(mobileNumber);
        const faxNumber = `+1-${faker.string.numeric(3)}-${faker.string.numeric(3)}-${faker.string.numeric(4)}`;
        console.log(`Fax: ${faxNumber}`);
        await EwayCustomerContactFlow.addCustomerContactdata(faker.person.fullName(), faker.person.jobTitle(), mobileNumber, 'test@test.com', mobileNumber, faxNumber)








    })



})


