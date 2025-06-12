const { test, expect } = require('@playwright/test');
const { testUser } = require('./config/testUsers');

test('API 7: POST To Verify Login with valid details', async ({ request }) => {
    // Mostrar los datos que estamos enviando
    console.log('Datos de prueba:', testUser);

    // Realizar la petición POST a la API con las credenciales válidas
    const response = await request.post('https://automationexercise.com/api/verifyLogin', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: testUser.email,
            password: testUser.password
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
    
    // Verificar el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User exists!');
}); 