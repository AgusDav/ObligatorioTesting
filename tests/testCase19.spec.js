const { test } = require('@playwright/test');
const {
    launchBrowser,
    verifyVisibility,
    clickButton
} = require('./helpers');

test('Test Case 19: View & Cart Brand Products', async ({ page }) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);
    // 3. Click on 'Products' button
    await clickButton(page, 'a[href="/products"]');
    //await handleGoogleVignette(page);
    // 4. Verify that Brands are visible on left side bar
    await verifyVisibility(page, '.left-sidebar');
    // 5. Click on any brand name
    await page.waitForSelector('a[href="/brand_products/Polo"]', { state: 'visible' });
    await clickButton(page, 'a[href="/brand_products/Polo"]');
    // 6. Verify that user is navigated to brand page and brand products are displayed
    await verifyVisibility(page, 'h2.title.text-center:has-text("Brand - Polo Products")');
    await verifyVisibility(page, 'div.features_items');
    // 7. On left side bar, click on any other brand link
    await clickButton(page, 'a[href="/brand_products/H&M"]');
    // 8. Verify that user is navigated to that brand page and can see products
    await verifyVisibility(page, 'h2.title.text-center:has-text("Brand - H&M Products")');
    await verifyVisibility(page, 'div.features_items');

});