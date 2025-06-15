import { test } from '@playwright/test';
const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    scrollToFooter
} = require('./helpers');
const { Console } = require('console');

test('Test Case 22: Add to cart from Recommended items', async ({ page }) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);

    // 3. Scroll to bottom of page
    await scrollToFooter(page);

    // 4. Verify 'RECOMMENDED ITEMS' are visible
    await verifyVisibility(page, 'h2:has-text("recommended items")');

    // 5. Click on 'Add To Cart' on Recommended product
    await page.locator('div:nth-child(2) > div > .product-image-wrapper > .single-products > .productinfo > .btn').first().click();

    // 6. Click on 'View Cart' button
    await clickButton(page, 'a[href="/view_cart"] > u');

    // 7. Verify that product is displayed in cart page
    await verifyVisibility(page, '#product-4'); //es el que agrega
    

});