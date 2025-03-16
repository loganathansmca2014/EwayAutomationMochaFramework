class CustomerObBoard {



    get customerlabel() {
        return $('(//span[@class="hide-menu"])[2]');
    }

    get addicon() {

        return $('//button[@mattooltip="Add"]')
    }

    get addcustomerPanel() {
        return $('//div[@class="modalTitle"]')
    }

    get isGST() {
        return $('#hasGst')
    }
    get legealName() {
        return $('//input[@formcontrolname="legalName"]')
    }
    get trandeName() {
        return $('//input[@formcontrolname="tradeName"]')
    }

    get gstInput() {
        return $('(//label[contains(.,"GST No.")]/following::input)[1]')
    }
    get panInput() {
        return $('(//label[contains(.,"PAN No.")]/following::input)[1]')
    }
    get nextBtn() {
        return $('//*[text()="Next"]')
    }
    get clickcustomerContact() {
        return $('(//div[@class="mat-step-text-label ng-star-inserted"])[3]')
    }

    
   

    async fillCustomerForm(isGst: boolean, legalName: string, tradeName: string, gstNumber: string, panNumber: string) {
        console.log("📝 Received Inputs:");
        console.log(`➡️ isGst: ${isGst}`);
        console.log(`➡️ legalName: "${legalName}"`);
        console.log(`➡️ tradeName: "${tradeName}"`);
        console.log(`➡️ gstNumber: "${gstNumber}"`);
        console.log(`➡️ panNumber: "${panNumber}"`);

        if (isGst) {
            console.log("✅ GST is applicable (isGst = TRUE)");
            await this.isGST.click();

            if (legalName?.trim()?.length > 0 && tradeName?.trim()?.length > 0
                && gstNumber?.trim()?.length > 0 && panNumber?.trim()?.length > 0) {

                console.log("🔹 Setting Legal Name:", legalName);
                await this.legealName.setValue(legalName);

                console.log("🔹 Setting Trade Name:", tradeName);
                await this.trandeName.setValue(tradeName);

                console.log("🔹 Setting GST Number:", gstNumber);
                await this.gstInput.setValue(gstNumber);

                console.log("🔹 Setting PAN Number:", panNumber);
                await this.panInput.setValue(panNumber);
            } else {
                console.warn("⚠️ Missing required values for GST case.");
            }
        } else {
            console.log("❌ GST is NOT applicable (isGst = FALSE)");

            if (legalName?.trim()?.length > 0 && tradeName?.trim()?.length > 0
                && panNumber?.trim()?.length > 0) {

                console.log("🔹 Setting Legal Name:", legalName);
                await this.legealName.setValue(legalName);

                console.log("🔹 Setting Trade Name:", tradeName);
                await this.trandeName.setValue(tradeName);

                console.log("🔹 Setting PAN Number:", panNumber);
                await this.panInput.setValue(panNumber);
            } else {
                console.warn("⚠️ Missing required values for non-GST case.");
            }
        }

        console.log("🔘 Clicking Next Button...");
        await this.nextBtn.waitForClickable({ timeout: 3000, timeoutMsg: 'Failed to click' })

        await this.nextBtn.click(); // Ensure button click is awaited
        console.log("✅ Next Button Clicked Successfully!");
    }


}
export default new CustomerObBoard()