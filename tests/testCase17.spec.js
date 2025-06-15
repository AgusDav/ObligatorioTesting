// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    clickButton,
    addProducts,
    checkHomePage,
    checkCartPage,
} = require('./helpers'); 

test('Remove Products From Cart', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. Verifica que la home page se vea completa (verifica header, body y footer)
    await checkHomePage(page);

    // 3. Añade productos al carrito
    await addProducts(page);

    // 4. Click al boton "Cart"
    await clickButton(page, 'a[href="/view_cart"]');

    // 5. Verifica que la cart page se vea completa (verifica header, body y footer)
    await checkCartPage(page);

    //6. Borra el primer producto del carrito
    await clickButton(page, `a.cart_quantity_delete[data-product-id="${1}"]`);

    //7. Verifica que el primer producto se haya eliminado del carrito
    await page.waitForSelector('#product-1', { state: 'hidden' });
    const product = await page.isVisible('#product-1');
    if (!product) {
        console.log('Se borro exitosamente el producto 1 del carrito');
    } else {
        console.error('Fallo al borrar el producto del carrito');
    }
});