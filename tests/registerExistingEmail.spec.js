// @ts-check
const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, createAccount, login, verifyVisibility, clickButton } = require('./helpers');

// Datos de prueba que usaremos para crear y luego intentar duplicar una cuenta
let TEST_USER = {
  name: 'Juan',
  email: '',
  password: 'Password123'
};

// Setup: Creamos un usuario antes de la prueba
// Esto nos permite probar el intento de registro con un email que ya existe
test.beforeAll(async ({ browser }) => {
  const page = await browser.newPage();
  TEST_USER.email = await generateUniqueEmail();
  await createAccount(page, TEST_USER.email);
  await page.close();
});

// Limpieza: Eliminamos el usuario después de la prueba
// Es una buena práctica dejar el sistema como lo encontramos
test.afterAll(async ({ browser }) => {
  const page = await browser.newPage();
  await page.goto('https://automationexercise.com/');
  await clickButton(page, 'a[href="/login"]');
  
  // Necesitamos hacer login para poder eliminar la cuenta
  await login(page, TEST_USER.email);
  
  // Eliminamos la cuenta y verificamos que se eliminó correctamente
  await clickButton(page, 'a:has-text("Delete Account")');
  await verifyVisibility(page, 'text=Account Deleted!');
  await clickButton(page, 'text=Continue');
  await page.close();
});

test('Test Case 5: Register User with existing email', async ({ page }) => {
  // Paso 1-2: Navegamos a la página principal
  await page.goto('https://automationexercise.com/');
  
  // Verificamos que la página de inicio se carga correctamente
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page).toHaveURL('https://automationexercise.com/');
  
  // Navegamos a la página de registro
  await clickButton(page, 'a:has-text("Signup / Login")');
  
  // Verificamos que el formulario de registro es visible
  await verifyVisibility(page, 'text=New User Signup!');
  
  // Intentamos registrar una cuenta con un email que ya existe
  await page.locator('input[data-qa="signup-name"]').fill('Juan');
  await page.locator('input[data-qa="signup-email"]').fill(TEST_USER.email);
  
  // Intentamos completar el registro
  await clickButton(page, 'button[data-qa="signup-button"]');
  
  // Paso Verificamos que aparece el mensaje de error esperado
  await verifyVisibility(page, 'text=Email Address already exist!');
}); 