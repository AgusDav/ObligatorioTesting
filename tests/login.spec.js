// @ts-check
const { test, expect } = require('@playwright/test');
const { generateRandomEmail } = require('../utils/helpers');

test('Test Case 2: Login with existing user', async ({ page }) => {
  // Primero registramos un usuario nuevo
  await page.goto('https://automationexercise.com/');
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  
  const name = 'Juan';
  const email = generateRandomEmail();
  const password = 'Password123';
  
  // Registro
  await page.locator('input[data-qa="signup-name"]').fill(name);
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.locator('button[data-qa="signup-button"]').click();
  
  // Completar información de registro
  await page.locator('#id_gender1').check();
  await page.locator('#password').fill(password);
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
  
  // Ahora intentamos hacer login
  await page.getByRole('link', { name: 'Signup / Login' }).click();
  await expect(page.getByText('Login to your account')).toBeVisible();

  // Ingresar credenciales
  await page.locator('input[data-qa="login-email"]').fill(email);
  await page.locator('input[data-qa="login-password"]').fill(password);
  await page.locator('button[data-qa="login-button"]').click();

  // Verificar que el login fue exitoso
  await expect(page.locator('a').filter({ hasText: `Logged in as ${name}` })).toBeVisible();
  
  // Limpiar: eliminar la cuenta
  await page.getByRole('link', { name: 'Delete Account' }).click();
  await expect(page.getByText('Account Deleted!')).toBeVisible();
  await page.locator('a[data-qa="continue-button"]').click();
});
