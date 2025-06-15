// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton, 
    checkHomePage, 
} = require('./helpers'); 

test('Verify Subscription in home page', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. verifica que la home page se vea completa (verifica header, body y footer)
    await checkHomePage(page);

    // 3. Busca texto SUBSCRIPTION
    await verifyVisibility(page, 'text=SUBSCRIPTION');

    // 4. Ingresa email y click en boton de flecha
    await page.locator('#susbscribe_email').fill('test_email@test')
    await clickButton(page, 'button[id="subscribe"]')

    //5. Se fija que la alerta de éxito aparezca
    await verifyVisibility(page, 'text=You have been successfully subscribed!');
});