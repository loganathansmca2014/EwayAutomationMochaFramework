import BrowserNaviGate from '../pageobjects/navComponents/browserNav'
class EwayLoginPage {

    get ewaytitle() {
        return $('title')
    }
    get ewayuserNameIput() {
        return $('#email')
    }
    get ewayPasswordInput() {
        return $('#password')
    }
    get ewayLoginBtn() {
        return $('button[type="submit"]')
    }
    async browserOpen() {
        await browser.url('http://eway-dev.keenminds.in/');
        //await browser.setTimeouts( 60000 )

    }
    get erroLabel() {
        return $('//*[@id="email"]//preceding::div[1]')
    }

    async ewayLoginAuth(username: string, password: string) {
        await this.ewaytitle.getTitle();

        await this.ewayuserNameIput.setValue(username)
        await this.ewayPasswordInput.setValue(password)
        await this.ewayLoginBtn.click()
    }

    async isErrorLabel() {
        await this.erroLabel.getText();
    }
    get BrowserNaviGate() {
        return BrowserNaviGate;
    }


}
export default new EwayLoginPage();