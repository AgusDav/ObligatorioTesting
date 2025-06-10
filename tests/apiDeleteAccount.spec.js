const { test, expect } = require('@playwright/test');
const { generateUniqueEmail } = require('./helpers');

test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    // Generar un email único para el nuevo usuario
    const email = await generateUniqueEmail();
    const password = 'password123';

    // Datos del usuario a crear
    const userData = {
        name: 'Test User',
        email: email,
        password: password,
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

    // Primero creamos la cuenta
    await request.post('https://automationexercise.com/api/createAccount', {
        data: userData
    });

    // Luego eliminamos la cuenta
    const deleteResponse = await request.delete('https://automationexercise.com/api/deleteAccount', {
        data: {
            email: email,
            password: password
        }
    });

    // Verificar que el código de respuesta sea 200
    expect(deleteResponse.status()).toBe(200);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await deleteResponse.json();
    
    // Verificar el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Account deleted!');

    // Verificar que la respuesta incluye el código de respuesta
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(200);
}); 