const { test, expect } = require('@playwright/test');
const { generateUniqueEmail } = require('./helpers');

test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    // Generar un email único para el nuevo usuario
    const email = await generateUniqueEmail();
    const password = 'password123';

    // Datos iniciales del usuario
    const initialUserData = {
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
        data: initialUserData
    });

    // Datos actualizados del usuario
    const updatedUserData = {
        name: 'Updated User',
        email: email,
        password: password,
        title: 'Mrs',
        birth_date: '2',
        birth_month: '2',
        birth_year: '2001',
        firstname: 'Updated',
        lastname: 'User',
        company: 'UpdatedCompany',
        address1: '456 New Street',
        address2: 'Apt 2',
        country: 'Canada',
        zipcode: '54321',
        state: 'NewState',
        city: 'NewCity',
        mobile_number: '9876543210'
    };

    // Actualizamos la cuenta
    const updateResponse = await request.put('https://automationexercise.com/api/updateAccount', {
        data: updatedUserData
    });

    // Verificar que el código de respuesta sea 200
    expect(updateResponse.status()).toBe(200);

    // Obtener y verificar el mensaje de respuesta
    const responseBody = await updateResponse.json();
    
    // Verificar el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User updated!');

    // Verificar que la respuesta incluye el código de respuesta
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(200);

    // Limpieza: Eliminamos la cuenta después de la prueba
    await request.delete('https://automationexercise.com/api/deleteAccount', {
        data: {
            email: email,
            password: password
        }
    });
}); 