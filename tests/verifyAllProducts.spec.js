// @ts-check
const { test, expect } = require('@playwright/test');

test('Test Case 8: Verify All Products and product detail page', async ({ page }) => {
  // Navegamos a la página principal
  await page.goto('http://automationexercise.com');

  // Verificamos que la página de inicio se carga correctamente
  await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

  // Navegamos a la página de productos
  await page.locator('a[href="/products"]').click();

  // Verificamos que hemos llegado a la página de productos
  await expect(page).toHaveURL(/.*products/);

  // Verificamos que la lista de productos es visible
  await expect(page.locator('.features_items')).toBeVisible();

  // Seleccionamos el primer producto para ver sus detalles
  await page.locator('.features_items a:has-text("View Product")').first().click();

  // Verificamos que hemos llegado a la página de detalles del producto
  await expect(page).toHaveURL(/.*product_details/);

  // Verificamos que los detalles del producto están visibles y completos
  await expect(page.locator('.product-information')).toBeVisible();
  const productTitle = page.locator('.product-information h2');
  await expect(productTitle).toBeVisible();
  await expect(productTitle).not.toHaveText('');  

  // Verificamos la presencia de todos los campos importantes del producto
  await expect(page.locator('p', { hasText: 'Category:' })).toBeVisible();
  await expect(page.getByText(/^Rs\.\s*\d+/)).toBeVisible();
  await expect(page.locator('p', { hasText: 'Availability:' })).toBeVisible();
  await expect(page.locator('p', { hasText: 'Condition:' })).toBeVisible();
  await expect(page.locator('p', { hasText: 'Brand:' })).toBeVisible();
});