const { test, expect } = require('@playwright/test');

test('API 9: DELETE To Verify Login', async ({ request }) => {
    // Realizar la petición DELETE a la API
    const response = await request.delete('https://automationexercise.com/api/verifyLogin');

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
    expect(responseBody.message).toBe('This request method is not supported.');
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(405);
}); 