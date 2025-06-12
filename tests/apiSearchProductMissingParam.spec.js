const { test, expect } = require('@playwright/test');

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    // Realizar la petición POST a la API sin el parámetro search_product
    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        data: {} // Enviamos un objeto vacío para simular la falta del parámetro
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
    
    // Verificar el mensaje de error esperado y el código de respuesta
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(400);
}); 