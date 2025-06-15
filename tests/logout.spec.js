const { test } = require('@playwright/test');
const { 
    launchBrowser, 
    verifyVisibility, 
    clickButton,
    loginLogout
} = require('./helpers');
const { testUser } = require('./config/testUsers');

test('Logout User', async ({ page }) => {
    // Iniciamos el navegador y navegamos a la página principal
    await launchBrowser(page);

    // Verificamos que la página de inicio se carga correctamente
    await verifyVisibility(page, 'img[alt="Website for automation practice"]');

    // Navegamos a la página de login
    await clickButton(page, 'a[href="/login"]');

    // Realizamos el proceso de login
    // Usamos el helper loginLogout que maneja todo el proceso de autenticación
    await loginLogout(page, testUser.email, testUser.password);

    // Verificamos que el login fue exitoso
    await verifyVisibility(page, `text=Logged in as ${testUser.name}`);

    // Realizamos el logout
    await clickButton(page, 'a:has-text("Logout")');

    // Verificamos que el logout fue exitoso
    await verifyVisibility(page, 'h2:has-text("Login to your account")');
}); 