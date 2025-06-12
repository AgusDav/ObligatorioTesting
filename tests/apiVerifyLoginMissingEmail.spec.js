const { test, expect } = require('@playwright/test');
const { testUser } = require('./config/testUsers');

test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    // Realizar la petición POST a la API sin el parámetro email
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            password: testUser.password // Solo enviamos la contraseña
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
    expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(400);
}); 