// @ts-check
import { test, expect } from '@playwright/test';

const {
    launchBrowser,
    verifyVisibility,
    clickButton,
    fillForm, 
    fillFormRegisterUser,
    generateUniqueEmail,
    checkAddresandOrder,
    addProducts,
    insertCreditCard,
    checkHomePage,
    checkCartPage,
} = require('./helpers'); 

test('Place Order: Register while Checkout', async ({ page }) => {
    // 1. Abre el navegador y se dirige a la página
    await launchBrowser(page);

    // 2. Verifica que la home page se vea completa (verifica header, body y footer)
    await checkHomePage(page);

    // 3. Añade productos al carrito
    await addProducts(page)

    // 4. Click al boton "Cart"
    await clickButton(page, 'a[href="/view_cart"]')

    // 5. Verifica que la cart page se vea completa (verifica header, body y footer)
    await checkCartPage(page);

    // 6. Click al boton "Proceed To Checkout"
    await clickButton(page, 'text="Proceed To Checkout"');

    // 7. Click al boton "Register / Login"
    await clickButton(page, 'text="Register / Login"');

    // 8. Llena formulario de registro
    await fillForm(page, 'input[data-qa="signup-name"]', 'Test User');
    const email = await generateUniqueEmail();
    await fillForm(page, 'input[data-qa="signup-email"]', email);
    await page.getByRole('button', { name: 'Signup' }).click();
    await fillFormRegisterUser(page);
    await clickButton(page, 'text="Create Account"');

    // 9. Verifica que la cuenta fue creada correctamente
    await verifyVisibility(page, 'h2:has-text("Account Created!")');
    await clickButton(page, 'text="Continue"');

    // 10. Verifica que se haya logueado correctamente
    await verifyVisibility(page, 'a:has-text("Logged in as ")');
    await verifyVisibility(page, 'b:has-text("Test User")');

    // 11. Click al boton "Cart"
    await clickButton(page, 'a[href="/view_cart"]')

    // 12.Click al boton "Proceed To Checkout"
    await clickButton(page, 'text="Proceed To Checkout"');

    // 13. Verifica que los datos de la dirección de facturación sean correctos
    await checkAddresandOrder(page);

    // 14. Escribe descripcion y click al boton "Place Order"
    await page.fill('textarea[name="message"]', 'Descripcion de test');
    await clickButton(page, 'text="Place Order"');

    //16. Ingresa los datos de la tarjeta de crédito
    await insertCreditCard(page);

    //17. Click al boton "Pay and Confirm Order"
    await clickButton(page, 'text="Pay and Confirm Order"');

    //18. Verifica que la orden fue realizada correctamente
    await verifyVisibility(page, 'h2:has-text("Order Placed!")');

    //19. Borra la cuenta
    await clickButton(page, 'a:has-text("Delete Account")');

    //20. Verifica que se haya borrado la cuenta y click al boton "Continue"
    await verifyVisibility(page, 'h2:has-text("Account Deleted!")');
    await clickButton(page, 'text="Continue"');
});