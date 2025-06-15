const { test, expect } = require('@playwright/test');

test('API 6: POST To Search Product without search_product parameter', async ({ request }) => {
    // Intentamos buscar productos sin proporcionar el parámetro search_product
    const response = await request.post('https://automationexercise.com/api/searchProduct', {
        data: {} // Enviamos un objeto vacío para simular la falta del parámetro
    });

    // Verificamos que la API responde con código 200
    expect(response.status()).toBe(200);

    // Obtenemos y analizamos la respuesta JSON
    const responseBody = await response.json();
    
    // Agregamos información detallada al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos que la respuesta incluye un mensaje de error claro
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Bad request, search_product parameter is missing in POST request.');
    
    // Verificamos que la respuesta incluye el código de error correcto
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(400);
}); 