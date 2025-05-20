// @ts-check
const { test, expect } = require('@playwright/test');

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
  // Paso 1: Navegar a la URL
  await page.goto('http://automationexercise.com');

  // Paso 2: Verificar que la página de inicio se carga correctamente
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Paso 3: Click en el botón 'Products'
  await page.locator('a[href="/products"]').click();

  // Paso 4: Verificar que el usuario es redirigido a la página de "ALL PRODUCTS"
  await expect(page).toHaveURL(/.*products/);

  // Paso 5: Verificar que la lista de productos es visible
  await expect(page.locator('.features_items')).toBeVisible();

  // Paso 6: Click en 'View Product' del primer producto
  await page.locator('.features_items a:has-text("View Product")').first().click();

  // Paso 7: Verificar que el usuario es redirigido a la página de detalles del producto
  await expect(page).toHaveURL(/.*product_details/);

  // Paso 8: Verificar que los detalles del producto están visibles
  await expect(page.locator('.product-information')).toBeVisible();
  const productTitle = page.locator('.product-information h2');
  await expect(productTitle).toBeVisible();
  await expect(productTitle).not.toHaveText('');  
// Verificación por contenido textual
await expect(page.locator('p', { hasText: 'Category:' })).toBeVisible();
await expect(page.getByText(/^Rs\.\s*\d+/)).toBeVisible();
await expect(page.locator('p', { hasText: 'Availability:' })).toBeVisible();
await expect(page.locator('p', { hasText: 'Condition:' })).toBeVisible();
await expect(page.locator('p', { hasText: 'Brand:' })).toBeVisible();
});
