const { test, expect } = require('@playwright/test');

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    // Realizar la petición POST a la API con credenciales inválidas
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: 'invalid@email.com',
            password: 'invalidpassword123'
        }
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
    expect(responseBody.message).toBe('User not found!');
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(404);
}); 