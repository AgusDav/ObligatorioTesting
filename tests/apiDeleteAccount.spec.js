const { test, expect } = require('@playwright/test');
const { generateUniqueEmail, getUserDataForAPI } = require('./helpers');

test('API 12: DELETE METHOD To Delete User Account', async ({ request }) => {
    // Generamos un email único para el nuevo usuario
    const email = await generateUniqueEmail();
    const password = 'password123';

    // Obtenemos los datos del usuario usando el helper
    const userData = await getUserDataForAPI(email);

    // Primero creamos la cuenta que vamos a eliminar
    await request.post('https://automationexercise.com/api/createAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: userData
    });

    // Intentamos eliminar la cuenta recién creada
    // Usamos las credenciales correctas para asegurar que la eliminación sea exitosa
    const deleteResponse = await request.delete('https://automationexercise.com/api/deleteAccount', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            email: email,
            password: password
        }
    });

    // Verificamos que la API respondió con éxito (código 200)
    expect(deleteResponse.status()).toBe(200);

    // Obtenemos y verificamos el mensaje de respuesta
    const responseBody = await deleteResponse.json();
    
    // Agregamos información al reporte de Playwright
    // Esto nos ayudará a debuggear si algo falla
    test.info().annotations.push({
        type: 'API Response',
        description: `Status: ${deleteResponse.status()}\nBody: ${JSON.stringify(responseBody, null, 2)}`
    });
    
    // Verificamos el mensaje de éxito esperado
    // Este mensaje nos confirma que la cuenta se eliminó correctamente
    expect(responseBody).toHaveProperty('message');
    expect(responseBody.message).toBe('Account deleted!');

    // Verificamos que la respuesta incluye el código de respuesta
    expect(responseBody).toHaveProperty('responseCode');
    expect(responseBody.responseCode).toBe(200);
}); 