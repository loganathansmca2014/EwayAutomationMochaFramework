import logger from '../utils/logger'; // Import logger
import Globalfunction from '../utils/globalFunction';
import ewayLandingPage from '../pageobjects/ewayLandingPage';
import EwayLoginPage from '../pageobjects/ewayLoginPage';
import { expect } from '@wdio/globals';

describe("Feature: Login Module for Eway", () => {
    beforeEach('Before each Test', async () => {
        logger.info("Opening browser...");
        await EwayLoginPage.browserOpen();
    });

    describe("Valid User Login:", () => {
        it("User logs in with valid credentials", async () => {
            logger.info("Attempting login with valid credentials...");
            await EwayLoginPage.ewayLoginAuth('admin@lorax.com', 'admin');

            logger.info("Login successful.");
            await ewayLandingPage.ewaylandingLogo.waitForDisplayed({ timeout: 3000, timeoutMsg: 'Logo not found' });

            const isLogoDisplayed = await ewayLandingPage.isLogoDisplayed();
            expect(isLogoDisplayed).toBeDisplayed();

            logger.info("Logo displayed. Highlighting element...");
            await Globalfunction.highlightElement(await ewayLandingPage.ewaylandingLogo);
            await Globalfunction.takeScreenshot();
        });
    });

    describe("Invalid User Login:", () => {
        it("User fails to log in with incorrect credentials", async () => {
            logger.warn("Attempting login with incorrect credentials...");
            await EwayLoginPage.ewayLoginAuth('loganathan@gmail.com', 'wrongpassword');

            await EwayLoginPage.erroLabel.waitForDisplayed({ timeout: 3000, timeoutMsg: 'Error message not displayed' });

            const error = await EwayLoginPage.erroLabel.getText();
            logger.error(`Login failed with error message: ${error}`);
            await Globalfunction.highlightElement( EwayLoginPage.erroLabel);

            expect(error).toContain("Username or password is incorrect");
            logger.info("Error message verified.");

            await Globalfunction.takeScreenshot();
        });
    });
});
