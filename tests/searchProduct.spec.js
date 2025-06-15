// @ts-check
const { test, expect } = require('@playwright/test');
const { launchBrowser, verifyVisibility, clickButton, fillForm } = require('./helpers');

test('Test Case 9: Search Product', async ({ page }) => {
  // Iniciamos el navegador y navegamos a la página principal
  await launchBrowser(page);

  // Verificamos que la página de inicio se carga correctamente
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');

  // Navegamos a la página de productos
  await clickButton(page, 'a[href="/products"]');

  // Verificamos que hemos llegado a la página de productos
  await expect(page).toHaveURL(/.*products/);
  await verifyVisibility(page, 'h2:has-text("All Products")');

  // Realizamos la búsqueda de productos
  await fillForm(page, '#search_product', 'Top');
  await clickButton(page, '#submit_search');

  // Verificamos que la página de resultados de búsqueda se muestra
  await verifyVisibility(page, 'h2:has-text("Searched Products")');

  // Verificamos que se muestran productos relacionados con la búsqueda
  const searchedItems = page.locator('.features_items .product-image-wrapper');
  await expect(searchedItems.first()).toBeVisible();
  const count = await searchedItems.count();
  expect(count).toBeGreaterThan(0);  
});
