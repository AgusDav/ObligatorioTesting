// @ts-check
const { test, expect } = require('@playwright/test');
const { launchBrowser, verifyVisibility, clickButton } = require('./helpers');

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    // Paso 1 y 2: Ir a la home
    await launchBrowser(page);

    // Paso 3: Verificar que la página de inicio se carga correctamente
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');

    // Paso 4: Click en el enlace correcto 'Test Cases'
    await clickButton(page, 'a[href="/test_cases"]:not(.test_cases_list)');

    // Paso 5: Verificar navegación a la página de test cases
    await expect(page).toHaveURL(/.*test_cases/);
    await verifyVisibility(page, 'h2:has-text("Test Cases")');
});
