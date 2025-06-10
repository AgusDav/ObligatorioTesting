// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const { launchBrowser, verifyVisibility, clickButton, fillForm } = require('./helpers');

test('Test Case 6: Contact Us Form', async ({ page }) => {
  // Paso 1-2: Ir a la página
  await launchBrowser(page);

  // Paso 3: Verificar página de inicio
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');

  // Paso 4: Ir a Contact Us
  await clickButton(page, 'a:has-text("Contact us")');

  // Paso 5: Verificar formulario
  await verifyVisibility(page, 'text=Get In Touch');

  // Paso 6: Llenar formulario
  await fillForm(page, 'input[data-qa="name"]', 'Juan');
  await fillForm(page, 'input[data-qa="email"]', 'juan@example.com');
  await fillForm(page, 'input[data-qa="subject"]', 'Consulta de prueba');
  await fillForm(page, 'textarea[data-qa="message"]', 'Este es un mensaje de prueba para el formulario de contacto.');

  // Paso 7: Subir archivo
  const filePath = path.join(__dirname, '../utils/prueba.txt');
  await page.locator('input[name="upload_file"]').setInputFiles(filePath);

  // Paso 8: Enviar formulario
  // Configurar el manejador del diálogo antes de hacer click
  page.once('dialog', async dialog => {
    await dialog.accept();
  });

  // Esperar a que el formulario esté completamente cargado
  await page.waitForSelector('form.contact-form', { state: 'visible' });
  
  // Verificar que el botón Submit está presente y es clickeable
  const submitButton = page.locator('input[data-qa="submit-button"]');
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
  
  // Paso 9: Hacer click en el botón Submit y aceptar el diálogo
  await Promise.all([
    page.waitForEvent('dialog'),
    submitButton.click()
  ]);

  // Esperar un momento para que se procese el envío
  await page.waitForTimeout(2000);

  // Paso 10: Verificar mensaje de éxito
  // Esperar a que el mensaje aparezca
  await page.waitForSelector('div.status.alert.alert-success', { state: 'visible', timeout: 10000 });
  
  // Verificar el texto del mensaje
  const successMessage = page.locator('div.status.alert.alert-success');
  await expect(successMessage).toContainText('Success! Your details have been submitted successfully.');

  // Paso 11: Volver a home y verificar
  await clickButton(page, 'a:has-text("Home")');
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');
});
