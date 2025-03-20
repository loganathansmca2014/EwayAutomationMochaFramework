import { expect } from 'chai';
import * as fs from 'fs';

const testData = JSON.parse(fs.readFileSync('./testData.json', 'utf-8'));

describe('MakeMyTrip Flight Booking Automation', () => {
  it('should search for flights', async () => {
    await browser.url('/');
    console.log('Navigated to:', await browser.getUrl());

    // Close popup if present
    try {
      const popup = await $('div[class*="modal"] button');
      if (await popup.isDisplayed()) {
        await popup.click();
      }
    } catch (err) {
      console.log('No popup found');
    }

    // Select "From" city
    const fromInput = await $('input[placeholder="From"]');
    await fromInput.setValue(testData.origin);
    await browser.pause(1000);
    await $('ul[role="listbox"] li:first-child').click();

    // Select "To" city
    const toInput = await $('input[placeholder="To"]');
    await toInput.setValue(testData.destination);
    await browser.pause(1000);
    await $('ul[role="listbox"] li:first-child').click();

    // Select departure date
    const departureDate = await $(`//div[@aria-label="${testData.departureDate}"]`);
    await departureDate.click();

    // Select return date
    const returnDate = await $(`//div[@aria-label="${testData.returnDate}"]`);
    await returnDate.click();

    // Click search
    const searchBtn = await $('a.widgetSearchBtn');
    await searchBtn.click();

    // Validate results
    await browser.waitUntil(async () => (await $$('div.flight-container').length) > 0, {
      timeout: 10000,
      timeoutMsg: 'Flights not loaded in time',
    });

    expect(await $$('div.flight-container')).to.have.length.greaterThan(0);
  });
});
