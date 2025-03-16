import CustomerObBoard from '../pageobjects/ewayCustomerPage'
import { fa, faker } from "@faker-js/faker";

class CustomerBasicFlow

{

    async customerBasicInfo() {
        try {
            if (await CustomerObBoard.customerlabel.isDisplayed()) {
                let gstNumber = `GST${faker.string.alphanumeric(12).toUpperCase()}`;
                let panNumber = `${faker.string.alpha(5).toUpperCase()}${faker.string.numeric(4)}${faker.string.alpha(1).toUpperCase()}`;
    
                // Click the Customer Label
                await CustomerObBoard.customerlabel.click();
    
                // Wait and Click the Add Icon
                await CustomerObBoard.addicon.waitForClickable({ timeout: 3000, timeoutMsg: 'Failed to click' });
                await CustomerObBoard.addicon.click();
    
                // Validate the Add Customer Panel
                await expect(CustomerObBoard.addcustomerPanel).toHaveText('Add Customer');
    
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

export default new CustomerBasicFlow(); 