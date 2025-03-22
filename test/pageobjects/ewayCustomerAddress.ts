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

    get NextBtn()
    {
        return $("(//span[contains(text(),'Next')])[2]")
    }
}
export default new EwayCustomerAddress();
