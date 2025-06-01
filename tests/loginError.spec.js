// @ts-check
const { test, expect } = require('@playwright/test');
const { launchBrowser, verifyVisibility, clickButton, fillForm } = require('./helpers');

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
  // Paso 1-2: Ir a la página
  await launchBrowser(page);
  
  // Paso 3: Verificar que la página de inicio se carga correctamente
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page).toHaveURL('https://automationexercise.com/');
  
  // Paso 4: Ir a login
  await clickButton(page, 'a:has-text("Signup / Login")');
  
  // Paso 5: Verificar formulario de login
  await verifyVisibility(page, 'text=Login to your account');
  
  // Paso 6: Ingresar credenciales incorrectas
  await fillForm(page, 'input[data-qa="login-email"]', 'incorrect@email.com');
  await fillForm(page, 'input[data-qa="login-password"]', 'wrongpassword');
  
  // Paso 7: Intentar login
  await clickButton(page, 'button[data-qa="login-button"]');
  
  // Paso 8: Verificar mensaje de error
  await verifyVisibility(page, 'text=Your email or password is incorrect!');
}); 