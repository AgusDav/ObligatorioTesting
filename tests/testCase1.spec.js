// @ts-check
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    // 1. Navega y espera carga completa
    await page.goto('https://automationexercise.com/');
});

//Testea que el home page sea visible chequeando un elemento del headen, body y footer
test('home page visible', async ({ page }) => {
    // 2. Logo principal (alt="Website for automation practice") debe ser visible
    const logo = page.locator('img[alt="Website for automation practice"]');
    await expect(logo).toBeVisible();  // Comprobar que el logo carga y se muestra :contentReference[oaicite:0]{index=0}

    // 3. Sección “Category” siempre presente
    await expect(page.locator('text=Category')).toBeVisible();

    // 4. Footer al pie de página
    await expect(page.locator('footer')).toBeVisible();
});

test('singup form', async ({ page }) => {
    // 2. Click en boton
    await page.click('text=Signup / Login');
    await expect(page.locator('text=New User Signup!')).toBeVisible();
});