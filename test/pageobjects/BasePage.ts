export default class BasePage {
    async open(url: string): Promise<void> {
        await browser.url(url);
    }

    async click(selector: string): Promise<void> {
        const element = await $(selector);
        await element.waitForClickable();
        await element.click();
    }

    async setValue(selector: string, value: string): Promise<void> {
        const element = await $(selector);
        await element.waitForDisplayed();
        await element.setValue(value);
    }

    async isDisplayed(selector: string): Promise<boolean> {
        return await $(selector).isDisplayed();
    }
}
