// @ts-check
const { test, expect } = require('@playwright/test');
const { launchBrowser, verifyVisibility, clickButton } = require('./helpers');

test('Test Case 7: Verify Test Cases Page', async ({ page }) => {
    // Iniciamos el navegador y navegamos a la página principal
    await launchBrowser(page);

    // Verificamos que la página de inicio se carga correctamente
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');

    // Navegamos a la página de casos de prueba
    await clickButton(page, 'a[href="/test_cases"]:not(.test_cases_list)');

    // Verificamos que hemos llegado a la página de casos de prueba
    await expect(page).toHaveURL(/.*test_cases/);
    await verifyVisibility(page, 'h2:has-text("Test Cases")');
});
