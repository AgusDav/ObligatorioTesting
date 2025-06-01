const { test } = require('@playwright/test');
const { 
    launchBrowser, 
    verifyVisibility, 
    clickButton,
    loginLogout
} = require('./helpers');
const { testUser } = require('./config/testUsers');

test('Logout User', async ({ page }) => {
    // 1. Launch browser
    // 2. Navigate to url 'http://automationexercise.com'
    await launchBrowser(page);

    // 3. Verify that home page is visible successfully
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');

    // 4. Click on 'Signup / Login' button
    await clickButton(page, 'a[href="/login"]');

    // 5. Verify 'Login to your account' is visible
    // 6. Enter correct email address and password
    // 7. Click 'login' button
    await loginLogout(page, testUser.email, testUser.password);

    // 8. Verify that 'Logged in as username' is visible
    await verifyVisibility(page, `text=Logged in as ${testUser.name}`);

    // 9. Click 'Logout' button
    await clickButton(page, 'a:has-text("Logout")');

    // 10. Verify that user is navigated to login page
    await verifyVisibility(page, 'h2:has-text("Login to your account")');
}); 