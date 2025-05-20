// @ts-check
const { test, expect } = require('@playwright/test');
const { generateRandomEmail } = require('../utils/helpers');

// Datos de prueba
const TEST_USER = {
  name: 'Juan',
  email: generateRandomEmail(),
  password: 'Password123'
};

// Setup: Crear usuario antes de la prueba
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  
  // Registro de usuario inicial
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  // Registro
  await page.locator('input[data-qa="signup-name"]').fill(TEST_USER.name);
  await page.locator('input[data-qa="signup-email"]').fill(TEST_USER.email);
  await page.locator('button[data-qa="signup-button"]').click();
  
  // Completar información de registro
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(TEST_USER.password);
  await page.locator('#days').selectOption('1');
  await page.locator('#months').selectOption('1');
  await page.locator('#years').selectOption('2000');
  await page.locator('#newsletter').check();
  await page.locator('#optin').check();
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
  await page.locator('button[data-qa="create-account"]').click();
  await expect(page.getByText('Account Created!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
  
  // Cerrar sesión
  await page.getByRole('link', { name: 'Logout' }).click();
  await page.close();
});

// Limpieza: Eliminar usuario después de la prueba
test.afterAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  // Login para poder eliminar la cuenta
  await page.locator('input[data-qa="login-email"]').fill(TEST_USER.email);
  await page.locator('input[data-qa="login-password"]').fill(TEST_USER.password);
  await page.locator('button[data-qa="login-button"]').click();
  
  // Eliminar cuenta
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
  await page.close();
});

test('Test Case 5: Register User with existing email', async ({ page }) => {
  // Paso 1: Launch browser (manejado por Playwright)
  
  // Paso 2: Navigate to url
  await page.goto('https://automationexercise.com/');
  
  // Paso 3: Verify that home page is visible successfully
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page).toHaveURL('https://automationexercise.com/');
  
  // Paso 4: Click on 'Signup / Login' button
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  // Paso 5: Verify 'New User Signup!' is visible
  await expect(page.getByText('New User Signup!')).toBeVisible();
  
  // Paso 6: Enter name and already registered email address
  await page.locator('input[data-qa="signup-name"]').fill('Juan');
  await page.locator('input[data-qa="signup-email"]').fill(TEST_USER.email);
  
  // Paso 7: Click 'Signup' button
  await page.locator('button[data-qa="signup-button"]').click();
  
  // Paso 8: Verify error 'Email Address already exist!' is visible
  await expect(page.getByText('Email Address already exist!')).toBeVisible();
}); 