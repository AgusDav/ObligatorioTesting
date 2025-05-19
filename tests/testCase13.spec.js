// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton, 
} = require('./helpers'); 

test('Verify Product quantity in Cart', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. verifica que la home page se vea completa (verifica header, body y footer)
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');

    await verifyVisibility(page, 'text=Category'); 

    await verifyVisibility(page, 'footer');

    // 3. Añade primer producto al carrito
    await clickButton(page, 'a[href="/product_details/1"]');

    // 4. Verifica que los detalles del producto son visibles
    await verifyVisibility(page, '.product-information');

    // 5. Incrementa la cantidad a 4
    await page.locator('#quantity').fill('4');

    // 6. Añade el producto al carrito
    await clickButton(page, ('span button.btn.cart'));

    // 7. Mira el carrito
    await clickButton(page,'a:has-text("View Cart")');

    // 8. Verifica que el carrito tiene la cantidad correcta del producto
    await expect(page.locator('tr#product-1 td.cart_quantity button')).toHaveText('4');
});