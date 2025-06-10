const { test, expect } = require('@playwright/test');

test('API 9: DELETE To Verify Login', async ({ request }) => {
    // Realizar la petición DELETE a la API
    const response = await request.delete('https://automationexercise.com/api/verifyLogin');

    // Verificar que el código de respuesta sea 405 (Method Not Allowed)
    expect(response.status()).toBe(405);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Verificar el mensaje de error esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('This request method is not supported.');
}); 