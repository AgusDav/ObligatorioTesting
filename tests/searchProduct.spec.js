// @ts-check
const { test, expect } = require('@playwright/test');

test('Test Case 9: Search Product', async ({ page }) => {
  // Paso 1 y 2: Navegar a la URL
  await page.goto('http://automationexercise.com');

  // Paso 3: Verificar que la página de inicio es visible
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Paso 4: Click en 'Products'
  await page.locator('a[href="/products"]').click();

  // Paso 5: Verificar navegación a ALL PRODUCTS
  await expect(page).toHaveURL(/.*products/);
  await expect(page.locator('h2:has-text("All Products")')).toBeVisible();

  // Paso 6: Ingresar nombre del producto en el input de búsqueda y hacer click en buscar
  const searchInput = page.locator('#search_product');
  await searchInput.fill('Top');
  await page.locator('#submit_search').click();

  // Paso 7: Verificar que aparece 'SEARCHED PRODUCTS'
  await expect(page.locator('h2:has-text("Searched Products")')).toBeVisible();

  // Paso 8: Verificar que todos los productos relacionados con la búsqueda son visibles
  const searchedItems = page.locator('.features_items .product-image-wrapper');
  await expect(searchedItems.first()).toBeVisible();
  const count = await searchedItems.count();
  expect(count).toBeGreaterThan(0);  
});
