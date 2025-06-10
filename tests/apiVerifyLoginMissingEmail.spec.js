const { test, expect } = require('@playwright/test');
const { testUser } = require('./config/testUsers');

test('API 8: POST To Verify Login without email parameter', async ({ request }) => {
    // Realizar la petición POST a la API sin el parámetro email
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        data: {
            password: testUser.password // Solo enviamos la contraseña
        }
    });

    // Verificar que el código de respuesta sea 400 (Bad Request)
    expect(response.status()).toBe(400);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Verificar el mensaje de error esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Bad request, email or password parameter is missing in POST request.');
}); 