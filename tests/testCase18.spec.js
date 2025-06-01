// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    checkHomePage, 
} = require('./helpers'); 

test('View Category Products', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. Verifica que la home page se vea completa (verifica header, body y footer)
    await checkHomePage(page);

    // 3. Verifica que la barra lateral sea visible
    await verifyVisibility(page, '.left-sidebar');

    // 4. Click al boton "Women"
    await clickButton(page, 'a[href="#Women"]');

    // 5. Click sobre alguna categoria de "Women", "Tops" en este caso
    await clickButton(page, 'a[href="/category_products/2"]');

    // 6. Verifa que se vea el texto de Tops
    await verifyVisibility(page, 'text=WOMEN - TOPS PRODUCTS');

    // 7. Click al boton "Men"
    await clickButton(page, 'a[href="#Men"]');

    // 8. Click en alguna categoria de "Men", "Tshirts" en este caso
    await clickButton(page, 'a[href="/category_products/3"]');

    // 9. Verifa que se vea el texto de Tshirts
    await verifyVisibility(page, 'text=MEN - TSHIRTS PRODUCTS');
});