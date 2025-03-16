class CustomerObBoard
{

    get customerlabel()
    {
        return $('(//a[@class="menu-top"]//span)[2]');
    }

    get addicon()
    {

        return $('//button[@mattooltip="Add"]')
    }

    get addcustomerPanel()
    {
        return $('//div[@class="modalTitle"]')
    }

    get isGST()
    {
        return $('#hasGst')
    }
    get legealName()
    {
        return $('//input[@formcontrolname="legalName"]')
    }
    get trandeName()
    {
        return $('//input[@formcontrolname="tradeName"]')
    }

    get gstInput()
    {
        return $('(//*[starts-with(@id,"mat-mdc-form-field-label-")])[3]')
    }
    get gstPan()
    {
        return $('(//*[starts-with(@id,"mat-mdc-form-field-label-")])[4]')
    }
    get nextBtn()
    {
        return $('(//*[@class="mat-mdc-button-persistent-ripple mdc-button__ripple"])[2]')
    }



}
export default new CustomerObBoard()