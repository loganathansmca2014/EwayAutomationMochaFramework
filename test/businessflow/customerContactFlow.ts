import ewayCustomerContact from "../pageobjects/ewayCustomerContact";
import logger from "../utils/logger"; // Import logger

class EwayCustomerContactFlow {
    async addCustomerContactdata(
        contactPerson: string,
        designation: string,
        mobile: string,
        email: string,
        alternativeNo?: string,
        teleph?: string,
        faxNumber?: string
    ) {
     //   await expect(ewayCustomerContact.customerContactlabel).toBeDisplayed();
        logger.info("📌 Entered into customer contact module");

        // Validate mandatory fields
        if (![contactPerson, designation, mobile, email].every(field => field?.trim())) {
            console.error("❌ Missing required fields: Contact Person, Designation, Mobile, or Email.");
            return;
        }

        logger.info(`📝 Adding Customer Contact Data:
        - Contact Person: ${contactPerson}
        - Designation: ${designation}
        - Mobile: ${mobile}
        - Email: ${email}
        - Alternative Number: ${alternativeNo || "Not Provided"}
        - Telephone: ${teleph || "Not Provided"}
        - Fax: ${faxNumber || "Not Provided"}`);

        // Set required fields
        await ewayCustomerContact.contactPerson.setValue(contactPerson);
        await ewayCustomerContact.designation.setValue(designation);
        await ewayCustomerContact.mobile.setValue(mobile);
        await ewayCustomerContact.email.setValue(email);

        // Set optional fields if provided
        if (alternativeNo?.trim()) await ewayCustomerContact.alternateMobile.setValue(alternativeNo);
        if (teleph?.trim()) await ewayCustomerContact.telephone.setValue(teleph);
        if (faxNumber?.trim()) await ewayCustomerContact.fax.setValue(faxNumber);

        await ewayCustomerContact.saveBtn.click();
        logger.info("✅ Customer contact data added successfully.");
    }
}

export default new EwayCustomerContactFlow();
