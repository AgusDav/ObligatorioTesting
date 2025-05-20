// @ts-check
const { test, expect } = require('@playwright/test');

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
  // Paso 1: Launch browser (manejado por Playwright)
  
  // Paso 2: Navigate to url
  await page.goto('https://automationexercise.com/');
  
  // Paso 3: Verify that home page is visible successfully
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page).toHaveURL('https://automationexercise.com/');
  
  // Paso 4: Click on 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  // Paso 5: Verify 'Login to your account' is visible
  await expect(page.getByText('Login to your account')).toBeVisible();
  
  // Paso 6: Enter incorrect email address and password
  await page.locator('input[data-qa="login-email"]').fill('incorrect@email.com');
  await page.locator('input[data-qa="login-password"]').fill('wrongpassword');
  
  // Paso 7: Click 'login' button
  await page.locator('button[data-qa="login-button"]').click();
  
  // Paso 8: Verify error 'Your email or password is incorrect!' is visible
  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
}); 