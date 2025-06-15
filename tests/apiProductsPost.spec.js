const { test, expect } = require('@playwright/test');

test('API 2: POST To All Products List', async ({ request }) => {
    // Intentamos obtener la lista de productos usando POST
    const response = await request.post('https://automationexercise.com/api/productsList');

    // Verificamos que la API responde con código 200
    expect(response.status()).toBe(200);

    // Obtenemos y analizamos la respuesta JSON
    const responseBody = await response.json();
    
    // Agregamos información detallada al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos que la respuesta incluye un mensaje
    // Este mensaje nos indica que el método POST no es el recomendado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('This request method is not supported.');
}); 