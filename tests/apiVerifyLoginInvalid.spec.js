const { test, expect } = require('@playwright/test');

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    // Realizar la petición POST a la API con credenciales inválidas
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        data: {
            email: 'invalid@email.com',
            password: 'invalidpassword123'
        }
    });

    // Verificar que el código de respuesta sea 404 (Not Found)
    expect(response.status()).toBe(404);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Verificar el mensaje de error esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User not found!');
}); 