const { test, expect } = require('@playwright/test');
const { testUser } = require('./config/testUsers');

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    // Mostramos los datos que estamos usando para el test
    console.log('Datos de prueba:', testUser);

    // Intentamos iniciar sesión con credenciales válidas
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: testUser.email,
            password: testUser.password
        }
    });

    // Verificamos que la API responde con éxito (código 200)
    expect(response.status()).toBe(200);

    // Obtenemos y analizamos la respuesta JSON
    const responseBody = await response.json();
    
    // Agregamos información detallada al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos que la respuesta incluye el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User exists!');
}); 