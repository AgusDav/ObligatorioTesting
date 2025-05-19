// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton, 
} = require('./helpers'); 

test('Verify Subscription in Cart page', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. verifica que la home page se vea completa (verifica header, body y footer)
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');

    await verifyVisibility(page, 'text=Category'); 

    await verifyVisibility(page, 'footer');

    // 3. Va a /view_cart
    await clickButton(page, 'a[href="/view_cart"]')

    // 4. Busca texto SUBSCRIPTION
    await verifyVisibility(page, 'text=SUBSCRIPTION');
    
    // 5. Ingresa email y click en boton de flecha
    await page.locator('#susbscribe_email').fill('test_email@test')
    await clickButton(page, 'button[id="subscribe"]')

    //6. Se fija que la alerta de éxito aparezca
    await verifyVisibility(page, 'text=You have been successfully subscribed!');
});