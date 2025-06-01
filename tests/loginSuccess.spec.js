// @ts-check
const { test, expect } = require('@playwright/test');
const { verifyVisibility, clickButton, login, launchBrowser, checkHomePage, createAccount, generateUniqueEmail } = require('./helpers');

test('Test Case 4: Login User with correct email and password', async ({ page }) => {
  // Crear una cuenta nueva para la prueba
  const testEmail = await generateUniqueEmail();
  await createAccount(page, testEmail);
  
  // Paso 1-2: Ir a la página
  await launchBrowser(page);
  
  // Paso 3: Verificar que la página de inicio se carga correctamente
  await checkHomePage(page);
  
  // Paso 4: Ir a login
  await clickButton(page, 'a:has-text("Signup / Login")');
  
  // Paso 5: Verificar formulario de login
  await verifyVisibility(page, 'text=Login to your account');
  
  // Paso 6: Ingresar credenciales correctas
  await login(page, testEmail);
  
  // Paso 7: Verificar login exitoso
  await verifyVisibility(page, 'a:has-text("Logged in as ")');
  
  // Paso 8: Eliminar cuenta
  await clickButton(page, 'a:has-text("Delete Account")');
  
  // Paso 9: Verificar que la cuenta fue eliminada
  await verifyVisibility(page, 'text=ACCOUNT DELETED!');
  
  // Paso 10: Continuar
  await clickButton(page, 'text=Continue');
}); 