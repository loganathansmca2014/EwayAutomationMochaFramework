
import { faker } from '@faker-js/faker/.';
import globalFunction from '../utils/globalFunction';
import CustomerObBoard from '../pageobjects/ewayCustomerPage';

describe("Feature :Customer OnBoard Page",()=>{
it("TC01_Customer can give the Basic details",async()=>{

if(await CustomerObBoard.customerlabel.isDisplayed)
{
    let isGst:string;
    await CustomerObBoard.customerlabel.click();
    await CustomerObBoard.addicon.waitForClickable({timeout:3000,timeoutMsg:'Failed to click'})
    await CustomerObBoard.addicon.click();
    await expect(CustomerObBoard.addcustomerPanel.getText()).toHaveText('Add Customer');
    await CustomerObBoard.isGstrequired();
    if (globalFunction.generateFakeGST() != null && globalFunction.generateFakeGST().trim() !== "") {

        if(isGst="Yes")
        console.log("Valid GST Number");
    } else {
        console.log("Invalid GST Number");
    }}


})



})

function isGstrequired(arg0: any) {
    throw new Error('Function not implemented.');
}
