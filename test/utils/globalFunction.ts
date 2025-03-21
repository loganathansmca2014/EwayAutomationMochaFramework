import allureReporter from '@wdio/allure-reporter';
import { fa, faker } from "@faker-js/faker";
import { promises } from 'dns';

class Globalfunction
{
    
async highlightElement(element:any):prom<void> {
    await browser.execute("arguments[0].style.border='3px solid yellow'", await element);
}
async takeScreenshot()
{
const screenshot = await browser.takeScreenshot();
await allureReporter.addAttachment("Screenshot", Buffer.from(screenshot, 'base64'), 'image/png');
}



 
}

// Generate a sample GST number

export default new Globalfunction();