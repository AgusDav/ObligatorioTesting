// @ts-check
const { test, expect } = require('@playwright/test');
const { generateRandomEmail } = require('../utils/helpers');

test('Test Case 1: Register User', async ({ page }) => {
  // Paso 1-2
  await page.goto('https://automationexercise.com/');

  // Paso 3
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Paso 4
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // Paso 5
  await expect(page.getByText('New User Signup!')).toBeVisible();

  // Paso 6
  const name = 'Juan';
  const email = generateRandomEmail();
  await page.locator('input[data-qa="signup-name"]').fill(name);
  await page.locator('input[data-qa="signup-email"]').fill(email);

  // Paso 7
  await page.locator('button[data-qa="signup-button"]').click();

  // Paso 8
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  // Paso 9
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill('Password123');
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('1');
  await page.locator('#years').selectOption('2000');

  // Paso 10-11
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();

  // Paso 12
  await page.locator('#first_name').fill('Juan');
  await page.locator('#last_name').fill('García');
  await page.locator('#company').fill('OpenAI');
  await page.locator('#address1').fill('Calle Falsa 123');
  await page.locator('#address2').fill('Apartamento 1B');
  await page.locator('#country').selectOption('Canada');
  await page.locator('#state').fill('Montevideo');
  await page.locator('#city').fill('Montevideo');
  await page.locator('#zipcode').fill('12345');
  await page.locator('#mobile_number').fill('091234567');

  // Paso 13
  await page.locator('button[data-qa="create-account"]').click();

  // Paso 14
  await expect(page.getByText('Account Created!')).toBeVisible();

  // Paso 15
  await page.locator('a[data-qa="continue-button"]').click();

  // Paso 16
  await expect(page.locator('a').filter({ hasText: `Logged in as ${name}` })).toBeVisible();

  // Paso 17
  await page.getByRole('link', { name: 'Delete Account' }).click();

  // Paso 18
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
});
