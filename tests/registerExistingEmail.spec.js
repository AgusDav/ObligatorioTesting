// @ts-check
const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, createAccount, login, verifyVisibility, clickButton } = require('./helpers');

// Datos de prueba
let TEST_USER = {
  name: 'Juan',
  email: '',
  password: 'Password123'
};

// Setup: Crear usuario antes de la prueba
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  TEST_USER.email = await generateUniqueEmail();
  await createAccount(page, TEST_USER.email);
  await page.close();
});

// Limpieza: Eliminar usuario después de la prueba
test.afterAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  await clickButton(page, 'a[href="/login"]');
  
  // Login para poder eliminar la cuenta
  await login(page, TEST_USER.email);
  
  // Eliminar cuenta
  await clickButton(page, 'a:has-text("Delete Account")');
  await verifyVisibility(page, 'text=Account Deleted!');
  await clickButton(page, 'text=Continue');
  await page.close();
});

test('Test Case 5: Register User with existing email', async ({ page }) => {
  // Paso 1-2: Ir a la página
  await page.goto('https://automationexercise.com/');
  
  // Paso 3: Verificar que la página de inicio se carga correctamente
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page).toHaveURL('https://automationexercise.com/');
  
  // Paso 4: Ir a registro
  await clickButton(page, 'a:has-text("Signup / Login")');
  
  // Paso 5: Verificar formulario de registro
  await verifyVisibility(page, 'text=New User Signup!');
  
  // Paso 6: Intentar registro con email existente
  await page.locator('input[data-qa="signup-name"]').fill('Juan');
  await page.locator('input[data-qa="signup-email"]').fill(TEST_USER.email);
  
  // Paso 7: Intentar registro
  await clickButton(page, 'button[data-qa="signup-button"]');
  
  // Paso 8: Verificar mensaje de error
  await verifyVisibility(page, 'text=Email Address already exist!');
}); 