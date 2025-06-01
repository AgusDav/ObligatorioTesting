const { test, expect } = require('@playwright/test');
const { generateUniqueEmail } = require('./helpers');

test('API 11: POST To Create/Register User Account', async ({ request }) => {
    // Generar un email único para el nuevo usuario
    const email = await generateUniqueEmail();

    // Datos del usuario a crear
    const userData = {
        name: 'Test User',
        email: email,
        password: 'password123',
        title: 'Mr',
        birth_date: '1',
        birth_month: '1',
        birth_year: '2000',
        firstname: 'Test',
        lastname: 'User',
        company: 'TestCompany',
        address1: '123 Test Street',
        address2: 'Apt 1',
        country: 'United States',
        zipcode: '12345',
        state: 'TestState',
        city: 'TestCity',
        mobile_number: '1234567890'
    };

    // Realizar la petición POST a la API para crear la cuenta
    const response = await request.post('https://automationexercise.com/api/createAccount', {
        data: userData
    });

    // Verificar que el código de respuesta sea 201 (Created)
    expect(response.status()).toBe(201);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await response.json();
    
    // Verificar el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User created!');

    // Verificar que la respuesta incluye el código de respuesta
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(201);
}); 