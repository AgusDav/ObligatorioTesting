// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');

test('Test Case 6: Contact Us Form', async ({ page }) => {
  // Paso 1-2
  await page.goto('https://automationexercise.com');

  // Paso 3
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Paso 4
  await page.getByRole('link', { name: 'Contact us' }).click();

  // Paso 5
  await expect(page.getByText('Get In Touch')).toBeVisible();

  // Paso 6
  await page.locator('input[data-qa="name"]').fill('Juan');
  await page.locator('input[data-qa="email"]').fill('juan@example.com');
  await page.locator('input[data-qa="subject"]').fill('Consulta de prueba');
  await page.locator('textarea[data-qa="message"]').fill('Este es un mensaje de prueba para el formulario de contacto.');

  // Paso 7 - Upload file
  const filePath = path.join(__dirname, '../utils/prueba.txt');
  await page.locator('input[name="upload_file"]').setInputFiles(filePath);

// Paso 8 - Click Submit
page.once('dialog', async dialog => {
    await dialog.accept();
  });
  await page.getByRole('button', { name: 'Submit' }).click();

  // Paso 10 - Verificar mensaje de éxito
  await expect(page.locator('div.status.alert.alert-success')).toHaveText(
    'Success! Your details have been submitted successfully.',
    { timeout: 7000 }
  );
  
  

  // Paso 11 - Click Home y verificar home page
  await page.locator('a:has-text("Home")').last().click();
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();
});
