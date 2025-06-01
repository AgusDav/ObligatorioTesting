// @ts-check
const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, createAccount, verifyVisibility, clickButton } = require('./helpers');

test('Test Case 1: Register User', async ({ page }) => {
  // Paso 1-2: Ir a la página y verificar que se carga correctamente
  await page.goto('https://automationexercise.com/');
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');

  // Paso 3-4: Ir a registro y verificar formulario
  await clickButton(page, 'a[href="/login"]');
  await verifyVisibility(page, 'text=New User Signup!');

  // Paso 5-6: Crear cuenta
  const email = await generateUniqueEmail();
  await createAccount(page, email);

  // Los pasos de verificación de cuenta creada y continuación ya están en createAccount.
  // El paso de verificación de logueo y eliminación de cuenta se remueven
  // porque createAccount desloguea al usuario.
});
