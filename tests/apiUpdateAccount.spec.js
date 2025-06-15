const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, getUserDataForAPI } = require('./helpers');

test('API 13: PUT METHOD To Update User Account', async ({ request }) => {
    // Generamos un email único para el nuevo usuario
    const email = await generateUniqueEmail();
    const password = 'password123';

    // Obtenemos los datos iniciales del usuario usando el helper
    const initialUserData = await getUserDataForAPI(email);

    // Primero creamos la cuenta que vamos a actualizar
    await request.post('https://automationexercise.com/api/createAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: initialUserData
    });

    // Preparamos los datos actualizados del usuario
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

    // Enviamos la petición PUT para actualizar la cuenta
    const updateResponse = await request.put('https://automationexercise.com/api/updateAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: updatedUserData
    });

    // Verificamos que la API responde con éxito (código 200)
    expect(updateResponse.status()).toBe(200);

    // Obtenemos y analizamos la respuesta JSON
    const responseBody = await updateResponse.json();
    
    // Agregamos información detallada al reporte de Playwright
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${updateResponse.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos que la respuesta incluye el mensaje de éxito esperado
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('User updated!');

    // Verificamos que la respuesta incluye el código de respuesta correcto
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(200);

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