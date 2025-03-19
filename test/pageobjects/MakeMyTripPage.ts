import { expect } from "chai";
import BasePage from "./BasePage";

class MakeMyTripPage extends BasePage {
    private searchButton = "a.primaryBtn";
    private get fromInput1()
    {

        return  $("#fromCity");
    }

    private get toCity()
    {

        return  $("#toCity");
    }

    private get toCityInput()
    {

        return  $("react-autosuggest__input react-autosuggest__input--open");
    }
    private get fromInput()
    {

        return  $("//input[contains(@aria-controls,'react-autowhatever-1')]");
    }

  
    private get frame()
    {

        return  $("identity-credentials-get");
    }
   private get popup(){

        return $("[data-cy='closeModal']");

    }
    
    async closePopup() {

// Switch back to the main page
// Ensure the close button is visible before clicking
if (await this.popup.isDisplayed()) {
    console.log("Popup is displayed");
    await this.popup.waitForClickable({ timeout: 5000 });
    await this.popup.click();
    console.log("Popup closed");
  }
        
    }

    async searchFlight(from: string, to: string, departureDate: string): Promise<void> {
  // Wait until it exists
  this.fromInput1.click();
        await this.fromInput.setValue(from);
        await browser.keys("Enter");
        await browser.pause(2000);
        this.toCity.click();

        await this.fromInput.setValue(to);
        await browser.keys("Enter");
        await browser.pause(2000);

        const dateSelector = `//div[contains(@aria-label, '${departureDate}')]`;
        await this.click(dateSelector);
        await this.click(this.searchButton);
    }
}

// ✅ Correct export
export default new MakeMyTripPage();


