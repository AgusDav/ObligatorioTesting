const { test, expect } = require('@playwright/test');

test('API 4: PUT To All Brands List', async ({ request }) => {
    // Intentamos hacer una petición PUT a la API de marcas
    const response = await request.put('https://automationexercise.com/api/brandsList');

    // Verificamos que la API respondió con éxito (código 200)
    expect(response.status()).toBe(200);

    // Obtenemos y verificamos el mensaje de respuesta
    const responseBody = await response.json();
    
    // Agregamos información al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos el mensaje de error esperado
    // La API debería indicar que el método PUT no está soportado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('This request method is not supported.');
}); 