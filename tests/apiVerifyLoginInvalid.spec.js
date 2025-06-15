const { test, expect } = require('@playwright/test');

test('API 10: POST To Verify Login with invalid details', async ({ request }) => {
    // Intentamos iniciar sesión con credenciales inválidas
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: 'invalid@email.com',
            password: 'invalidpassword123'
        }
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
    
    // Verificamos que la respuesta incluye el mensaje de error esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User not found!');
    
    // Verificamos que la respuesta incluye el código de error correcto
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(404);
}); 