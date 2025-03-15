import allureReporter from '@wdio/allure-reporter';
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
}

export default new Globalfunction();