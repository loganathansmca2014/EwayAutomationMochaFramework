import allureReporter from '@wdio/allure-reporter';
import { faker } from '@faker-js/faker';

class Globalfunction
{
    
async highlightElement(element:any) {
    await browser.execute("arguments[0].style.border='3px solid yellow'", await element);
}
async takeScreenshot()
{
const screenshot = await browser.takeScreenshot();
await allureReporter.addAttachment("Screenshot", Buffer.from(screenshot, 'base64'), 'image/png');
}

 generateFakeGST(): string {
    const stateCode = faker.number.int({ min: 1, max: 35 }).toString().padStart(2, '0'); // State Code (01-35)
    const pan = faker.string.alpha(5).toUpperCase() + faker.number.int({ min: 1000, max: 9999 }) + faker.string.alpha(1).toUpperCase(); // Fake PAN (ABCDE1234F)
    const entityCode = faker.number.int({ min: 1, max: 9 }).toString(); // Entity Code (1-9)
    const defaultZ = 'Z'; // 14th character is always 'Z'
    const checksum = faker.string.alphanumeric(1).toUpperCase(); // Checksum character

    return `${stateCode}${pan}${entityCode}${defaultZ}${checksum}`;
    console.log('${stateCode}${pan}${entityCode}${defaultZ}${checksum}');
 }
}

// Generate a sample GST number

export default new Globalfunction();