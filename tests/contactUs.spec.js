// @ts-check
const { test, expect } = require('@playwright/test');
const path = require('path');
const { launchBrowser, verifyVisibility, clickButton, fillForm } = require('./helpers');

test.beforeEach(async ({ page }) => {
  // Configuramos el manejador de diálogos para aceptarlos automáticamente
  page.on('dialog', async dialog => {
    console.log(`Se detectó un diálogo con el mensaje: "${dialog.message()}"`);
    await dialog.accept();
  });
});

test('Test Case 6: Contact Us Form', async ({ page }) => {
  // Vamos a la página principal
  await launchBrowser(page);

  // Verificamos que la página cargó correctamente
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');

  // Click en el enlace de Contact Us
  await clickButton(page, 'a:has-text("Contact us")');

  // Verificamos que el formulario de contacto está visible
  await verifyVisibility(page, 'text=Get In Touch');

  // Llenamos el formulario con datos de prueba
  await fillForm(page, 'input[data-qa="name"]', 'Juan');
  await fillForm(page, 'input[data-qa="email"]', 'juan@example.com');
  await fillForm(page, 'input[data-qa="subject"]', 'Consulta de prueba');
  await fillForm(page, 'textarea[data-qa="message"]', 'Este es un mensaje de prueba para el formulario de contacto.');

  // Subimos un archivo de prueba
  const filePath = path.join(__dirname, '../utils/prueba.txt');
  await page.locator('input[name="upload_file"]').setInputFiles(filePath);

  // Esperamos a que el formulario esté completamente cargado
  await page.waitForSelector('form.contact-form', { state: 'visible' });
  
  // Verificamos que el botón Submit está presente y se puede clickear
  const submitButton = page.locator('input[data-qa="submit-button"]');
  await expect(submitButton).toBeVisible();
  await expect(submitButton).toBeEnabled();
  
  // Enviamos el formulario
  await submitButton.click();

  // Esperamos a que la página se estabilice después del envío
  await page.waitForLoadState('networkidle');

  // Pequeña espera adicional para asegurar la renderización visual
  await page.waitForTimeout(500);

  // Esperamos y verificamos el mensaje de éxito
  await page.waitForSelector('div.status.alert.alert-success', {
    state: 'visible',
    timeout: 10000
  });
  
  // Verificamos que el mensaje de éxito contiene el texto correcto
  const successMessage = page.locator('div.status.alert.alert-success');
  await expect(successMessage).toContainText('Success! Your details have been submitted successfully.');

  // Volvemos a la página principal y verificamos que cargó correctamente
  await clickButton(page, 'a:has-text("Home")');
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');
});
