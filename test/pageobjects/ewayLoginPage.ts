import BrowserNaviGate from '../pageobjects/navComponents/browserNav';
import logger from '../utils/logger'; // Import logger
import { browser } from '@wdio/globals'; // Import browser

class EwayLoginPage {
    
    get ewayTitle() {
        return $('title');
    }
    
    get ewayUserNameInput() {
        return $('#email');
    }
    
    get ewayPasswordInput() {
        return $('#password');
    }
    
    get ewayLoginBtn() {
        return $('button[type="submit"]');
    }
    
    // public async browserOpen() {
    //     await browser.url('http://eway-dev.keenminds.in/');
    //     await browser.pause(1000); // Allowing page to stabilize
    // }

    async launchApplication(url: string) {
        logger.info("🚀 Launching browser efficiently...");
    
        await browser.setTimeout({
            pageLoad: 6000,  // Reduce page load timeout (default ~30s)
            implicit: 2000,  // Optimize implicit waits
            script: 5000      // Optimize script execution time
        });
    
        const currentUrl = await browser.getUrl();
        if (currentUrl !== url) {
            logger.info(`🌍 Navigating to URL: ${url}`);
            await browser.url(url);
        } else {
            logger.info("✔ Already on the correct page, skipping navigation.");
        }
    }
    
    get errorLabel() {
        return $('//input[@id="email"]/preceding::div[1]'); // Improved XPath clarity
    }
    
    async ewayLoginAuth(username: string, password: string) {
        const title = await browser.getTitle(); // Fixed incorrect usage of title retrieval
        await this.ewayUserNameInput.setValue(username);
        await this.ewayPasswordInput.setValue(password);
        await this.ewayLoginBtn.click();
    }
    
    async getErrorLabelText() {
        return await this.errorLabel.getText(); // Ensure it returns the error text
    }
    
    get BrowserNaviGate() {
        return BrowserNaviGate;
    }
}

export default new EwayLoginPage();
