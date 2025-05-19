const { expect, test} = require('@playwright/test');

async function launchBrowser(page) {
    await page.goto('http://automationexercise.com');
}

async function verifyVisibility(page, selector) {
    await expect(page.locator(selector)).toBeVisible();
}

async function clickButton(page, selector) {
    await page.click(selector);
}

async function fillForm(page, selector, value) {
    await page.fill(selector, value);
}


module.exports = {  
    launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm,
}