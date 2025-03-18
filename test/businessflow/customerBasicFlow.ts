import CustomerObBoard from '../pageobjects/ewayCustomerPage'
import { fa, faker } from "@faker-js/faker";
import { expect as chaiExpect } from 'chai';

class CustomerBasicFlow {

    async customerBasicInfo() {
        try {
            if (await CustomerObBoard.customerlabel.isDisplayed()) {
                // Click the Customer Label
                await CustomerObBoard.customerlabel.click();
    
                // Wait and Click the Add Icon
                await CustomerObBoard.addicon.waitForClickable({ timeout: 3000, timeoutMsg: 'Failed to click' });
                await CustomerObBoard.addicon.click();
    
                // Validate the Add Customer Panel
                await expect(CustomerObBoard.addcustomerPanel).toHaveText('Add Customer');
    
                // Generate GST and extract PAN
                const gstNumber = await generateGST();
                const panNumber = await extractPAN(gstNumber);
    
                // Call the Method with the Faker Data
                await this.fillCustomerForm(
                    faker.datatype.boolean(),
                    faker.person.firstName(),
                    faker.person.lastName(),
                    gstNumber,
                    panNumber
                );
    
            } else {
                console.log("Customer label is not displayed.");
            }
        } catch (error) {
            console.error("Error in customerBasicInfo:", error);
        }
    }
    

    async fillCustomerForm(isGst: boolean, legalName: string, tradeName: string, gstNumber: string, panNumber: string) {
        console.log("📝 Received Inputs:");
        console.log(`➡️ isGst: ${isGst}`);
        console.log(`➡️ legalName: "${legalName}"`);
        console.log(`➡️ tradeName: "${tradeName}"`);
        console.log(`➡️ gstNumber: "${gstNumber}"`);
        console.log(`➡️ panNumber: "${panNumber}"`);
        try {
            console.log(`✅ GST is ${isGst ? "applicable (TRUE)" : "NOT applicable (FALSE)"}`);
        
            // Click GST checkbox if applicable and not already selected
            if (isGst && !(await CustomerObBoard.isGST.isSelected())) {
                await CustomerObBoard.isGST.click();
                console.log("🔹 GST checkbox selected.");
            }
        
            // Common fields (Legal Name, Trade Name, PAN)
            if (legalName?.trim() && tradeName?.trim() && panNumber?.trim()) {
                console.log("🔹 Setting Legal Name:", legalName);
                await CustomerObBoard.legealName.setValue(legalName);
        
                console.log("🔹 Setting Trade Name:", tradeName);
                await CustomerObBoard.trandeName.setValue(tradeName);
        
                console.log("🔹 Setting PAN Number:", panNumber);
                await CustomerObBoard.panInput.setValue(panNumber);
            } else {
                console.warn("⚠️ Missing required values for mandatory fields.");
            }
        
            // GST-specific fields
            if (isGst && gstNumber?.trim()) {
                console.log("🔹 Setting GST Number:", gstNumber);
                await CustomerObBoard.gstInput.setValue(gstNumber);
            } else if (isGst) {
                console.warn("⚠️ Missing GST Number for GST case.");
            }
        
        } catch (error) {
            console.error("❌ Error occurred while processing customer details:", error);
        }
        
        console.log("🔘 Clicking Next Button...");
        await CustomerObBoard.nextBtn.waitForClickable({ timeout: 3000, timeoutMsg: 'Failed to click' })

        await CustomerObBoard.nextBtn.click(); // Ensure button click is awaited
        console.log("✅ Next Button Clicked Successfully!");
    }
}

const generateGST = (): Promise<string> => {
    return new Promise((resolve, reject) => {
        try {
            const firstTwoDigits = faker.number.int({ min: 10, max: 99 });  // 2 numeric (10-99)
            const fiveAlphas = faker.string.alpha(5).toUpperCase();  // 5 uppercase letters (A-Z)
            const fourNumbers = faker.number.int({ min: 1000, max: 9999 });  // 4 numeric (0001-9999)
            const oneCharacter = faker.string.alpha(1).toUpperCase();  // 1 character (A-Z)
            const oneAlphaNumeric = faker.string.alphanumeric(1).toUpperCase();  // 1 alphanumeric (A-Z, 0-9)
            const lastAlphaNumeric = faker.string.alphanumeric(1).toUpperCase();  // 1 alphanumeric (A-Z, 0-9)

            const gst = `${firstTwoDigits}${fiveAlphas}${fourNumbers}${oneCharacter}${oneAlphaNumeric}Z${lastAlphaNumeric}`;
            resolve(gst);
        } catch (error) {
            reject("Error generating GST");
        }
    });
};

const extractPAN = (gst: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (gst.length === 15) {
            resolve(gst.substring(2, 12)); // Extract PAN (characters 3 to 12)
        } else {
            reject("Invalid GST number length");
        }
    });
};

export default new CustomerBasicFlow();





function expect(element: any) {
    return {
        toHaveText: async (expectedText: string) => {
            const actualText = await element.getText();
            chaiExpect(actualText).to.equal(expectedText, `Expected element text to be "${expectedText}", but found "${actualText}"`);
        }
    };
}


