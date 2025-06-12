const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, getUserDataForAPI } = require('./helpers');

test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    // Generar un email único para el nuevo usuario
    const email = await generateUniqueEmail();
    const password = 'password123';

    // Obtener los datos del usuario usando el helper
    const userData = await getUserDataForAPI(email);

    // Primero creamos la cuenta
    await request.post('https://automationexercise.com/api/createAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: userData
    });

    // Luego eliminamos la cuenta
    const deleteResponse = await request.delete('https://automationexercise.com/api/deleteAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: email,
            password: password
        }
    });

    // Verificar que el código de respuesta sea 200
    expect(deleteResponse.status()).toBe(200);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await deleteResponse.json();
    
    // Agregar información al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${deleteResponse.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificar el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Account deleted!');

    // Verificar que la respuesta incluye el código de respuesta
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(200);
}); 