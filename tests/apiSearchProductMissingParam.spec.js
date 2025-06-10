const { test, expect } = require('@playwright/test');

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    // Realizar la petición POST a la API sin el parámetro search_product
    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        data: {} // Enviamos un objeto vacío para simular la falta del parámetro
    });

    // Verificar que el código de respuesta sea 400 (Bad Request)
    expect(response.status()).toBe(400);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Verificar el mensaje de error esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
}); 