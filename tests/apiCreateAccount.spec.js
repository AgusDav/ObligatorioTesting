const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, getUserDataForAPI } = require('./helpers');

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    // Generamos un email único para el nuevo usuario
    const email = await generateUniqueEmail();

    // Obtenemos los datos del usuario usando el helper
    const userData = await getUserDataForAPI(email);

    // Hacemos la petición POST a la API para crear la cuenta
    const response = await request.post('https://automationexercise.com/api/createAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: userData
    });

    // Verificamos que la API respondió con éxito (código 200)
    expect(response.status()).toBe(200);

    // Obtenemos y verificamos el mensaje de respuesta
    const responseBody = await response.json();
    
    // Agregamos información al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User created!');

    // Verificamos que la respuesta incluye el código de respuesta
    // El código 201 es el estándar para creación exitosa
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(201);
}); 