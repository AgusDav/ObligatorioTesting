import { test, expect } from '@playwright/test';
const { launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm,
    createAccount,
    addProducts,
    login
} = require('./helpers');



test('Test Case 24: Download Invoice after purchase order', async ({ page }) => {

    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);

    // 3. Verify that home page is visible successfully
    await verifyVisibility(page, 'img[src="/static/images/home/logo.png"]');

    // 4. Add products to cart
    await addProducts(page);

    // 5. Click 'Cart' button
    await clickButton(page, 'a[href="/view_cart"]');

    // 6. Verify that cart page is displayed
    await verifyVisibility(page, 'li:has-text("Shopping Cart")');

    // 7. Click 'Proceed To Checkout'
    await clickButton(page, 'a:has-text("Proceed To Checkout")');

    // 8. Click 'Register / Login' button
    await clickButton(page, 'a:has-text("Register / Login")');

    // 9. Fill all details in Signup and create account
    // 10. Verify 'ACCOUNT CREATED!' and click 'Continue' button
    const email = `test${Date.now()}@example.com`;
    await createAccount(page, email); // register registra, chequea el ACCOUNT CREATED!, selecciona el Continue y hace el logout

    // ingresamos con la cuenta recien registrada
    await login(page, email);


    // 11. Verify 'Logged in as username' at top
    await verifyVisibility(page, 'a:has-text("Logged in as ")', 15000);

    // 12. Click 'Cart' button
    await clickButton(page, 'a:has-text("Cart")');

    // 13. Click 'Proceed To Checkout' button
    await clickButton(page, 'a:has-text("Proceed To Checkout")');

    // 14. Verify Address Details and Review Your Order
    await verifyVisibility(page, 'h2:has-text("Address Details")');
    await verifyVisibility(page, 'h2:has-text("Review Your Order")');

    // 15. Enter description in comment text area and click 'Place Order'
    await fillForm(page, 'textarea[name="message"]', 'This is a test order.');
    await clickButton(page, 'a:has-text("Place Order")');

    // 16. Enter payment details: Name on Card, Card Number, CVC, Expiration date
    await fillForm(page, 'input[name="name_on_card"]', 'Test User');
    await fillForm(page, 'input[name="card_number"]', '4242424242424242');
    await fillForm(page, 'input[name="cvc"]', '123');
    await fillForm(page, 'input[name="expiry_month"]', '12');
    await fillForm(page, 'input[name="expiry_year"]', '2025');

    // 17. Click 'Pay and Confirm Order' button
    await clickButton(page, 'button:has-text("Pay and Confirm Order")');

    // 18. Verify success message 'Your order has been placed successfully!'
    await verifyVisibility(page, 'h2:has-text("Order Placed!")');    

    await page.waitForLoadState('load');
    // 19. Click 'Download Invoice' button and verify invoice is downloaded successfully
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        clickButton(page, 'a:has-text("Download Invoice")')
    ]);
    const downloadPath = await download.path();
    console.log(`Invoice downloaded to: ${downloadPath}`);

    // 20. Click 'Continue' button
    await clickButton(page, 'a:has-text("Continue")');

    // 21. Click 'Delete Account' button
    await clickButton(page, 'a:has-text("Delete Account")');

    // 22. Verify 'ACCOUNT DELETED!' and click 'Continue' button
    await verifyVisibility(page, 'h2:has-text("ACCOUNT DELETED!")');
    await clickButton(page, 'a:has-text("Continue")');
});
