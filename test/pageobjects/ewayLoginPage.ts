import BrowserNaviGate from '../pageobjects/navComponents/browserNav';

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
    
    async browserOpen() {
        await browser.url('http://eway-dev.keenminds.in/');
        await browser.pause(1000); // Allowing page to stabilize
    }
    
    get errorLabel() {
        return $('//input[@id="email"]/preceding::div[1]'); // Improved XPath clarity
    }
    
    async ewayLoginAuth(username: string, password: string) {
        await browser.getTitle(); // Fixed incorrect usage of title retrieval
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
