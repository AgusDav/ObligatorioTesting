import { test, expect } from '@playwright/test';
const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm,
    createAccount,
    login,
    addProducts
} = require('./helpers');



test('Test Case 23: Verify address details in checkout page', async ({ page }) => {

    // 1. Launch browser and navigate to the URL
    await launchBrowser(page);

    // 2. Verify that home page is visible successfully
    await verifyVisibility(page, 'img[src="/static/images/home/logo.png"]');

    // 3. Click 'Signup / Login' button
    await clickButton(page, 'a:has-text("Signup / Login")');
    //await handleGoogleVignette(page);

    // 4. Fill all details in Signup and create account
    // 5. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    const email = `test${Date.now()}@example.com`;
    await createAccount(page, email); // register registra, chequea el ACCOUNT CREATED!, selecciona el Continue y hace el logout

    // ingresamos con la cuenta recien registrada
    await login(page, email);

    // 6. Verify 'Logged in as username' at top
    await verifyVisibility(page, 'a:has-text("Logged in as ")', 15000);
    await verifyVisibility(page, 'b:has-text("Test User")', 15000);

    // 7. Add products to cart
    await addProducts(page);

    // 8. Click 'Cart' button
    await clickButton(page, 'a:has-text("Cart")');

    // 9. Verify that cart page is displayed
    await verifyVisibility(page, 'li:has-text("Shopping Cart")');

    // 10. Click 'Proceed To Checkout'
    await clickButton(page, 'a:has-text("Proceed To Checkout")');

    // 11. Verify that the delivery address matches the address filled during account registration
    const expectedDeliveryAddress = `
        Your delivery address
        Mr. Test User
        TestCompany
        123 Test Street
        Apt 1
        TestCity TestState 12345
        United States
        1234567890
    `.trim().replace(/\s+/g, ' ');

    const actualDeliveryAddress = await page.textContent('#address_delivery');
    expect(actualDeliveryAddress.replace(/\s+/g, ' ')).toContain(expectedDeliveryAddress);

    // 12. Verify that the billing address matches the address filled during account registration
    const expectedBillingAddress = `
        Your billing address
        Mr. Test User
        TestCompany
        123 Test Street
        Apt 1
        TestCity TestState 12345
        United States
        1234567890
    `.trim().replace(/\s+/g, ' ');

    const actualBillingAddress = await page.textContent('#address_invoice');
    expect(actualBillingAddress.replace(/\s+/g, ' ')).toContain(expectedBillingAddress);

    // 13. Click 'Delete Account' button
    await clickButton(page, 'a:has-text("Delete Account")');

    // 14. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await page.waitForSelector('h2:has-text("ACCOUNT DELETED!")', { state: 'visible' });
    await verifyVisibility(page, 'h2:has-text("ACCOUNT DELETED!")');
    await clickButton(page, 'a:has-text("Continue")');
});
