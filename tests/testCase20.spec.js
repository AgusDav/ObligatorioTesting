import { test } from '@playwright/test';
const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm,
    addAllProducts,
    login,
    createAccount
} = require('./helpers');

test('Test Case 20: Search Products and Verify Cart After Login', async ({ page }) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);

    // 3. Click on 'Products' button
    await clickButton(page, 'a:has-text("Products")');
    //await handleGoogleVignette(page);

    // 4. Verify user is navigated to ALL PRODUCTS page successfully
    await page.waitForSelector('h2:has-text("All Products")', { state: 'visible' });
    await verifyVisibility(page, 'h2:has-text("All Products")');

    // 5. Enter product name in search input and click search button
    await fillForm(page, 'input[id="search_product"]', 'dress');
    await clickButton(page, 'button[id="submit_search"]');
    //await handleGoogleVignette(page);

    // 6. Verify 'SEARCHED PRODUCTS' is visible
    await verifyVisibility(page, 'h2.title.text-center:has-text("Searched Products")');

    // 7. Verify all the products related to search are visible
    await verifyVisibility(page, '.features_items');

    // 8. Add those products to cart
    await addAllProducts(page);

    // 9. Click 'Cart' button and verify that products are visible in cart
    await clickButton(page, 'a[href="/view_cart"]');
    await verifyVisibility(page, '#product-3');
    await verifyVisibility(page, '#product-4');
    await verifyVisibility(page, '#product-16');
    await verifyVisibility(page, '#product-19');
    await verifyVisibility(page, '#product-20');
    await verifyVisibility(page, '#product-21');
    await verifyVisibility(page, '#product-22');
    await verifyVisibility(page, '#product-23');
    await verifyVisibility(page, '#product-38');


    // 10. Click 'Signup / Login' button and submit login details
    await clickButton(page, 'a:has-text("Signup / Login")');

    const email = `test${Date.now()}@example.com`;
    await createAccount(page, email); // register registra, chequea el ACCOUNT CREATED!, selecciona el Continue y hace el logout

    await login(page, email);

    // 11. Again, go to Cart page
    await clickButton(page, 'a[href="/view_cart"]');

    await page.waitForTimeout(2000);

    // 12. Verify that those products are visible in cart after login as well
    await verifyVisibility(page, '#product-3');
    await verifyVisibility(page, '#product-4');
    await verifyVisibility(page, '#product-16');
    await verifyVisibility(page, '#product-19');
    await verifyVisibility(page, '#product-20');
    await verifyVisibility(page, '#product-21');
    await verifyVisibility(page, '#product-22');
    await verifyVisibility(page, '#product-23');
    await verifyVisibility(page, '#product-38');

});
