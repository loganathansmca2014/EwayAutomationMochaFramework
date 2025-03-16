import CustomerObBoard from '../pageobjects/ewayCustomerPage';
class EwayCustomerAddress {




    get customerAddresslabel() {
        return $('(//*[@class="mat-mdc-card-title"])[1]');
    }


    get customerName() {
        return $('//input[@formcontrolname="name"]');
    }




    get customerAddress1() {
        return $('//input[@formcontrolname="address1"]');
    }


    get customerAddress2() {
        return $('//input[@formcontrolname="address2"]');
    }


    get customerCountry() {
        return $('(//*[contains(@id,"mat-select-value-")])[3]');
    }

    get listOfCountry() {
        return $$('(//mat-option[@aria-selected="false"])')
    }

    get customerState() {
        return $('(//*[contains(@id,"mat-select-value-")])[4]');
    }


    get customerCity() {
        return $('(//*[starts-with(@id,"mat-select-value-")])[5]');
    }
    get customerPincode() {
        return $('//input[@formcontrolname="pincode"]');
    }

    get addAddressIcon()
    {
        return $('(//i[text()="add"]/following-sibling::span)[3]')
    }
    // async customerAddressInputForm(name: string, address1: string, address2: string, zipCode: string) {
    //     console.log("📍 Validating customer address form inputs...");

    //     // Check if any input is null, undefined, or empty
    //     if (name?.trim()?.length>0 && address1?.trim()?.length>0 &&  address2?.trim()?.length>0 &&  zipCode?.trim()?.length>0) {
    //         console.warn("⚠️ Missing required fields! Please check inputs.");
    //         console.warn(`🛑 name: ${name}, address1: ${address1}, address2: ${address2}, zipCode: ${zipCode}`);
    //         console.log("✅ All required inputs are present.");

    //         await this.customerName.setValue(name);
    //         console.log(`✍️ Name entered: ${name}`);

    //         await this.customerAddress1.setValue(address1);
    //         console.log(`🏠 Address 1 entered: ${address1}`);

    //         await this.customerAddress2.setValue(address2);
    //         console.log(`🏢 Address 2 entered: ${address2}`);
    //         const dropdownCountry = await this.customerCountry;

    //         await this.selectDropdownValue(dropdownCountry, 'India');
    //         const dropdownState = await this.customerState;

    //         await this.selectDropdownValue(dropdownState, 'Tamil Nadu');
    //         const dropdownCity = await this.customerCity;

    //         await this.selectDropdownValue(dropdownCity, 'Chennai');
    //         await this.customerPincode.setValue(zipCode);
    //         await this.addAddressIcon.click();
    //         console.log("✅ Address has been Added...");
    //         await CustomerObBoard.clickcustomerContact.click();
    //         console.log("✅ Clicked Customer Contact Form...");

    //     }

    //     // Replace with your actual dropdown selector


    // }

    // async selectDropdownValue(dropdownElement: any, value: string) {
    //     console.log(`🌍 Random Country: ${value}`);
    //     console.log(`🔽 Selecting dropdown value: ${value}`);
    //     // Ensure dropdown exists
    //     if (!await dropdownElement) {
    //         console.error("❌ Dropdown element is not found!");
    //         return;
    //     }

    //     // Click dropdown to open options

    //     await dropdownElement.click();
    //     console.log("📂 Dropdown opened");

    //     // Select option by visible text
    //     const option = await $(`//mat-option//span[contains(text(), '${value}')]`);

    //     if (await option.isExisting()) {
    //         await option.click();
    //         console.log(`✅ Selected: ${value}`);
    //     } else {
    //         console.warn(`⚠️ Option "${value}" not found in dropdown`);
    //     }
    // }
}
export default new EwayCustomerAddress();
