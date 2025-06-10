const { test, expect } = require('@playwright/test');
const { generateUniqueEmail } = require('./helpers');

test('API 14: GET user account detail by email', async ({ request }) => {
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

    // Obtenemos los detalles del usuario
    const response = await request.get(`https://automationexercise.com/api/getUserDetailByEmail?email=${email}`);

    // Verificar que el código de respuesta sea 200
    expect(response.status()).toBe(200);

    // Obtener y verificar el JSON de respuesta
    const responseBody = await response.json();
    
    // Verificar que la respuesta contiene la estructura esperada
    expect(responseBody).toHaveProperty('user');
    
    // Verificar los detalles del usuario
    const user = responseBody.user;
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('name', userData.name);
    expect(user).toHaveProperty('email', userData.email);
    expect(user).toHaveProperty('title', userData.title);
    expect(user).toHaveProperty('birth_date', userData.birth_date);
    expect(user).toHaveProperty('birth_month', userData.birth_month);
    expect(user).toHaveProperty('birth_year', userData.birth_year);
    expect(user).toHaveProperty('firstname', userData.firstname);
    expect(user).toHaveProperty('lastname', userData.lastname);
    expect(user).toHaveProperty('company', userData.company);
    expect(user).toHaveProperty('address1', userData.address1);
    expect(user).toHaveProperty('address2', userData.address2);
    expect(user).toHaveProperty('country', userData.country);
    expect(user).toHaveProperty('zipcode', userData.zipcode);
    expect(user).toHaveProperty('state', userData.state);
    expect(user).toHaveProperty('city', userData.city);
    expect(user).toHaveProperty('mobile_number', userData.mobile_number);

    // Limpieza: Eliminamos la cuenta después de la prueba
    await request.delete('https://automationexercise.com/api/deleteAccount', {
        data: {
            email: email,
            password: password
        }
    });
}); 