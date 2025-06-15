// @ts-check
const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, createAccount, verifyVisibility, clickButton } = require('./helpers');

test('Test Case 1: Register User', async ({ page }) => {
  // Navegamos a la página principal y verificamos que se carga correctamente
  await page.goto('https://automationexercise.com/');
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');

  // Navegamos a la página de registro y verificamos el formulario
  await clickButton(page, 'a[href="/login"]');
  await verifyVisibility(page, 'text=New User Signup!');

  // Creamos una nueva cuenta
  const email = await generateUniqueEmail();
  await createAccount(page, email);
});
