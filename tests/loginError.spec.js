// @ts-check
const { test, expect } = require('@playwright/test');
const { launchBrowser, verifyVisibility, clickButton, fillForm } = require('./helpers');

test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
  // Iniciamos el navegador y navegamos a la página principal
  await launchBrowser(page);
  
  // Verificamos que la página de inicio se carga correctamente
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');
  await expect(page).toHaveTitle('Automation Exercise');
  await expect(page).toHaveURL('https://automationexercise.com/');
  
  // Navegamos a la página de login
  await clickButton(page, 'a:has-text("Signup / Login")');
  
  // Verificamos que el formulario de login es visible
  await verifyVisibility(page, 'text=Login to your account');
  
  // Ingresamos credenciales incorrectas
  await fillForm(page, 'input[data-qa="login-email"]', 'incorrect@email.com');
  await fillForm(page, 'input[data-qa="login-password"]', 'wrongpassword');
  
  // Intentamos iniciar sesión con las credenciales incorrectas
  await clickButton(page, 'button[data-qa="login-button"]');
  
  // Verificamos que aparece el mensaje de error esperado
  await verifyVisibility(page, 'text=Your email or password is incorrect!');
}); 