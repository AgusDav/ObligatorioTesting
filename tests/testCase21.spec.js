import { test } from '@playwright/test';
const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm
} = require('./helpers');

test('Test Case 21: Add review on product', async ({ page }) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);

    // 3. Click on 'Products' button
    await clickButton(page, 'a:has-text("Products")');

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    //await handleGoogleVignette(page);
    await page.waitForLoadState('load');
    await page.waitForSelector('h2:has-text("All Products")', { state: 'visible' });
    await verifyVisibility(page, 'h2:has-text("All Products")');

    // 5. Click on 'View Product' button for the first product
    await clickButton(page, 'a[href="/product_details/1"]');

    // 6. Verify 'Write Your Review' is visible
    await page.waitForSelector('a:has-text("Write Your Review")', { state: 'visible' });
    await verifyVisibility(page, 'a:has-text("Write Your Review")', 15000);

    // 7. Enter name, email and review
    await fillForm(page, 'input[id="name"]', 'Test User');
    await fillForm(page, 'input[id="email"]', 'test@example.com');
    await page.fill('textarea[name="review"]', 'This is a test review.');

    // 8. Click 'Submit' button
    await clickButton(page, 'button[id="button-review"]');

    // 9. Verify success message 'Thank you for your review.'
    await verifyVisibility(page, 'span:has-text("Thank you for your review.")');

});