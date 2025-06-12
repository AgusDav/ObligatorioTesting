const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, getUserDataForAPI } = require('./helpers');

test('API 14: GET user account detail by email', async ({ request }) => {
    // Generar un email único para el nuevo usuario
    const email = await generateUniqueEmail();
    const password = 'password123';

    // Obtener los datos del usuario usando el helper
    const userData = await getUserDataForAPI(email);

    // Primero creamos la cuenta
    await request.post('https://automationexercise.com/api/createAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: userData
    });

    // Obtenemos los detalles del usuario
    const response = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${email}`);

    // Verificar que el código de respuesta sea 200
    expect(response.status()).toBe(200);

    // Obtener y verificar el JSON de respuesta
    const responseBody = await response.json();
    
    // Agregar información al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${response.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificar que la respuesta contiene la estructura esperada
    expect(responseBody).toHaveProperty('user');
    
    // Verificar los detalles del usuario
    const user = responseBody.user;
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', userData.name);
    expect(user).toHaveProperty('email', userData.email);
    expect(user).toHaveProperty('title', userData.title);
    expect(user).toHaveProperty('birth_day', userData.birth_date);
    expect(user).toHaveProperty('birth_month', userData.birth_month);
    expect(user).toHaveProperty('birth_year', userData.birth_year);
    expect(user).toHaveProperty('first_name', userData.firstname);
    expect(user).toHaveProperty('last_name', userData.lastname);
    expect(user).toHaveProperty('company', userData.company);
    expect(user).toHaveProperty('address1', userData.address1);
    expect(user).toHaveProperty('address2', userData.address2);
    expect(user).toHaveProperty('country', userData.country);
    expect(user).toHaveProperty('zipcode', userData.zipcode);
    expect(user).toHaveProperty('state', userData.state);
    expect(user).toHaveProperty('city', userData.city);

    // Limpieza: Eliminamos la cuenta después de la prueba
    await request.delete('https://automationexercise.com/api/deleteAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: email,
            password: password
        }
    });
}); 