// @ts-check
const { test, expect } = require('@playwright/test');
const { verifyVisibility, clickButton, login, launchBrowser, checkHomePage, createAccount, generateUniqueEmail } = require('./helpers');

test('Test Case 4: Login User with correct email and password', async ({ page }) => {
  // Primero creamos una cuenta nueva para asegurarnos que tenemos un usuario válido
  const testEmail = await generateUniqueEmail();
  await createAccount(page, testEmail);
  
  // Vamos a la página principal
  await launchBrowser(page);
  
  // Verificamos que la página cargó bien
  await checkHomePage(page);
  
  // Click en el botón de login
  await clickButton(page, 'a:has-text("Signup / Login")');
  
  // Verificamos que el formulario de login está visible
  await verifyVisibility(page, 'text=Login to your account');
  
  // Intentamos hacer login con las credenciales que acabamos de crear
  await login(page, testEmail);
  
  // Verificamos que el login fue exitoso
  await verifyVisibility(page, 'a:has-text("Logged in as ")');
  
  // Limpieza: eliminamos la cuenta que creamos
  await clickButton(page, 'a:has-text("Delete Account")');
  
  // Verificamos que la cuenta fue eliminada correctamente
  await verifyVisibility(page, 'text=ACCOUNT DELETED!');
  
  // Click en Continue para volver a la página principal
  await clickButton(page, 'text=Continue');
}); 