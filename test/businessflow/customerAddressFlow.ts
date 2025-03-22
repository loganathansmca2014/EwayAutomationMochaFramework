import { fa, faker } from "@faker-js/faker";
import ewayCustomerAddress from "../pageobjects/ewayCustomerAddress";
import CustomerObBoard from '../pageobjects/ewayCustomerPage'
import { scrollIntoView } from "webdriverio/build/commands/element";
class EwayCustomerAddressflow
{

async ewaycutomerAddressInfo()
{
  const mobileNumber = faker.string.numeric(10);
  await this.customerAddressInputForm(faker.person.fullName(), faker.location.streetAddress(), faker.location.secondaryAddress(), faker.location.zipCode())
            

}

async customerAddressInputForm(name: string, address1: string, address2: string, zipCode: string) {
        console.log("📍 Validating customer address form inputs...");

        // Check if any input is null, undefined, or empty
        if (name?.trim()?.length>0 && address1?.trim()?.length>0 &&  address2?.trim()?.length>0 &&  zipCode?.trim()?.length>0) {
            console.warn("⚠️ Missing required fields! Please check inputs.");
            console.warn(`🛑 name: ${name}, address1: ${address1}, address2: ${address2}, zipCode: ${zipCode}`);
            console.log("✅ All required inputs are present.");

            await ewayCustomerAddress.customerName.setValue(name);
            console.log(`✍️ Name entered: ${name}`);

            await ewayCustomerAddress.customerAddress1.setValue(address1);
            console.log(`🏠 Address 1 entered: ${address1}`);

            await ewayCustomerAddress.customerAddress2.setValue(address2);
            console.log(`🏢 Address 2 entered: ${address2}`);
            const dropdownCountry = await ewayCustomerAddress.customerCountry;

            await this.selectDropdownValue(dropdownCountry, 'India');
            const dropdownState = await ewayCustomerAddress.customerState;

            await this.selectDropdownValue(dropdownState, 'Tamil Nadu');
            const dropdownCity = await ewayCustomerAddress.customerCity;

            await this.selectDropdownValue(dropdownCity, 'Chennai');
            await ewayCustomerAddress.customerPincode.setValue(zipCode);
            await browser.execute(() => {
                window.scrollBy(0, -100); // Scroll up by 500 pixels
            });
                        await ewayCustomerAddress.addAddressIcon.click();
            console.log("✅ Address has been Added...");
            await browser.execute(() => {
                window.scrollBy(0, -1000); // Scroll up by 500 pixels
            });
            
            await ewayCustomerAddress.NextBtn.click();
            console.log("✅ Clicked Customer Contact Form...");

        }
    }

    
    async selectDropdownValue(dropdownElement: any, value: string) {
        console.log(`🌍 Random Country: ${value}`);
        console.log(`🔽 Selecting dropdown value: ${value}`);
        // Ensure dropdown exists
        if (!await dropdownElement) {
            console.error("❌ Dropdown element is not found!");
            return;
        }

        // Click dropdown to open options

        await dropdownElement.click();
        console.log("📂 Dropdown opened");

        // Select option by visible text
        const option = await $(`//mat-option//span[contains(text(), '${value}')]`);

        if (await option.isExisting()) {
            await option.click();
            console.log(`✅ Selected: ${value}`);
        } else {
            console.warn(`⚠️ Option "${value}" not found in dropdown`);
        }
    }

}
export default new EwayCustomerAddressflow();