// @ts-check
const { test, expect } = require('@playwright/test');
const { launchBrowser, verifyVisibility, clickButton, fillForm } = require('./helpers');

test('Test Case 9: Search Product', async ({ page }) => {
  // Paso 1 y 2: Navegar a la URL
  await launchBrowser(page);

  // Paso 3: Verificar que la página de inicio es visible
  await verifyVisibility(page, 'img[alt="Website for automation practice"]');

  // Paso 4: Click en 'Products'
  await clickButton(page, 'a[href="/products"]');

  // Paso 5: Verificar navegación a ALL PRODUCTS
  await expect(page).toHaveURL(/.*products/);
  await verifyVisibility(page, 'h2:has-text("All Products")');

  // Paso 6: Ingresar nombre del producto en el input de búsqueda y hacer click en buscar
  await fillForm(page, '#search_product', 'Top');
  await clickButton(page, '#submit_search');

  // Paso 7: Verificar que aparece 'SEARCHED PRODUCTS'
  await verifyVisibility(page, 'h2:has-text("Searched Products")');

  // Paso 8: Verificar que todos los productos relacionados con la búsqueda son visibles
  const searchedItems = page.locator('.features_items .product-image-wrapper');
  await expect(searchedItems.first()).toBeVisible();
  const count = await searchedItems.count();
  expect(count).toBeGreaterThan(0);  
});
