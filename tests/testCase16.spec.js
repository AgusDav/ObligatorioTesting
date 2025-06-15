// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    generateUniqueEmail,
    checkAddresandOrder,
    addProducts,
    createAccount,
    login,
    insertCreditCard,
    checkHomePage,
    checkCartPage,
} = require('./helpers'); 

test('Place Order: Login while Checkout', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. Verifica que la home page se vea completa (verifica header, body y footer)
    await checkHomePage(page);

    // 3. Click al boton "Signup / Login"
    await clickButton(page, 'a[href="/login"]');

    // 4. Rellena formulario de login
    const email = await generateUniqueEmail();
    await createAccount(page, email);
    await login(page, email);

    // 5. Verifica que se haya logueado correctamente
    await verifyVisibility(page, 'a:has-text("Logged in as ")');
    await verifyVisibility(page, 'b:has-text("Test User")');

    // 6. Añade productos al carrito
    await addProducts(page)

    // 7. Click al boton "Cart"
    await clickButton(page, 'a[href="/view_cart"]')

    // 8. Verifica que la cart page se vea completa (verifica header, body y footer)
    await checkCartPage(page);

    // 9. Click al boton "Proceed To Checkout"
    await clickButton(page, 'text="Proceed To Checkout"');

    // 10. Verifica que los datos de la dirección de facturación sean correctos
    await checkAddresandOrder(page);

    // 11. Escribe descripcion y click al boton "Place Order"
    await page.fill('textarea[name="message"]', 'Descripcion de test');
    await clickButton(page, 'text="Place Order"');

    //12. Ingresa los datos de la tarjeta de crédito
    await insertCreditCard(page);

    //13. Click al boton "Pay and Confirm Order"
    await clickButton(page, 'text="Pay and Confirm Order"');

    //14. Verifica que la orden fue realizada correctamente
    await verifyVisibility(page, 'h2:has-text("Order Placed!")');

    //15. Borra la cuenta
    await clickButton(page, 'a:has-text("Delete Account")');

    //16. Verifica que se haya borrado la cuenta y click al boton "Continue"
    await verifyVisibility(page, 'h2:has-text("Account Deleted!")');
    await clickButton(page, 'text="Continue"');
});