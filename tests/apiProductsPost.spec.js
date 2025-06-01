const { test, expect } = require('@playwright/test');

test('API 2: POST To All Products List', async ({ request }) => {
    // Realizar la petición POST a la API
    const response = await request.post('https://automationexercise.com/api/productsList');

    // Verificar que el código de respuesta sea 405 (Method Not Allowed)
    expect(response.status()).toBe(405);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Verificar el mensaje de error esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('This request method is not supported.');
}); 