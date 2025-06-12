const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, getUserDataForAPI } = require('./helpers');

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    // Generar un email único para el nuevo usuario
    const email = await generateUniqueEmail();

    // Obtener los datos del usuario usando el helper
    const userData = await getUserDataForAPI(email);

    // Realizar la petición POST a la API para crear la cuenta
    const response = await request.post('https://automationexercise.com/api/createAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: userData
    });

    // Verificar que el código de respuesta sea 200
    expect(response.status()).toBe(200);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Agregar información al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificar el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User created!');

    // Verificar que la respuesta incluye el código de respuesta
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(201);
}); 