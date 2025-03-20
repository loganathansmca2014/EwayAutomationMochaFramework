class EwayCustomerContact {


    get customerContactlabel() {
        return $('(//span[contains(text(),"Next")])[2]');
    }


    get contactPerson() {
        return $('//input[@formcontrolname="contactPerson"]');
    }




    get designation() {
        return $('//input[@formcontrolname="designation"]');
    }

    get mobile() {
        return $('//input[@formcontrolname="mobile"]');
    }

    get alternateMobile() {
        return $('//input[@formcontrolname="alternateMobile"]');
    }
    get email() {
        return $('//input[@formcontrolname="email"]');
    }
    get telephone() {
        return $('//input[@formcontrolname="telephone"]');
    }
    get fax() {
        return $('//input[@formcontrolname="fax"]');
    }


    get saveBtn() {
        return $('//span[normalize-space(text())="Save"]')
    }

    // async customerContactRequired(name:string,designation:string,mobile:string,email:string) {
    //     await this.contactPerson.setValue(name)
    //     await this.designation.setValue(designation)
    //     await this.mobile.setValue(mobile)
    //     await this.email.setValue(email)
    // }
        
    // async customerContactOptional() {
    //     await this.alternateMobile
    //     await this.telephone
    //     await this.fax
    //     await this.email

       
    
    // }

    async clickSaveBtn()
    {
        await this.saveBtn.click();
    }
}

export default new EwayCustomerContact();