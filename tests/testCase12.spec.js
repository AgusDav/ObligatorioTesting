// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton, 
    checkHomePage,
} = require('./helpers'); 

test('Verify Subscription in Cart page', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. Verifica que la home page se vea completa (verifica header, body y footer)
    await checkHomePage(page);
    
    // 3. Va a /products
    await clickButton(page, 'a[href="/products"]')

    // 4. Añade primer producto al carrito
    await clickButton(page, 'a[data-product-id="1"]');
    
    // 5. Continua comprando 
    await clickButton(page, 'button[data-dismiss="modal"]')

    // 6. Añade segundo producto al carrito
    await clickButton(page, 'a[data-product-id="2"]');
    
    // 7. Mira el carrito
    await clickButton(page, 'a[href="/view_cart"]')

    // 8. Verifica que el carrito tiene los productos
    await verifyVisibility(page, 'a[href="/product_details/1"]'); 
    await verifyVisibility(page, 'a[href="/product_details/2"]'); 

    // 9. Verifica que el carrito tiene los precios y cantidades correctas
    // Producto 1
    await expect(page.locator('tr#product-1 td.cart_price')).toHaveText('Rs. 500');
    await expect(page.locator('tr#product-1 td.cart_quantity button')).toHaveText('1');
    await expect(page.locator('tr#product-1 td.cart_total p.cart_total_price')).toHaveText('Rs. 500');
    // Producto 2
    await expect(page.locator('tr#product-2 td.cart_price')).toHaveText('Rs. 400');
    await expect(page.locator('tr#product-2 td.cart_quantity button')).toHaveText('1');
    await expect(page.locator('tr#product-2 td.cart_total p.cart_total_price')).toHaveText('Rs. 400');
});