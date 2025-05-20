// @ts-check
const { test, expect } = require('@playwright/test');
const { navigateToHome } = require('../utils/navigationHelper');

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    // Paso 1 y 2: Ir a la home
    await navigateToHome(page);

    // Paso 3: Verificar que la página de inicio se carga correctamente
    await expect(page.locator('img[alt="Website for automation practice"]')).toBeVisible();

    // Paso 4: Click en el enlace correcto 'Test Cases'
    await page.locator('a[href="/test_cases"]:not(.test_cases_list)').click();

    // Paso 5: Verificar navegación a la página de test cases
    await expect(page).toHaveURL(/.*test_cases/);
    await expect(page.locator('h2:has-text("Test Cases")')).toBeVisible();
});
