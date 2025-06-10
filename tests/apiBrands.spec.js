const { test, expect } = require('@playwright/test');

test('API 3: Get All Brands List', async ({ request }) => {
    // Realizar la petición GET a la API
    const response = await request.get('https://automationexercise.com/api/brandsList');

    // Verificar que el código de respuesta sea 200
    expect(response.status()).toBe(200);

    // Obtener y verificar el JSON de respuesta
    const responseBody = await response.json();
    
    // Verificar que la respuesta contiene la estructura esperada
    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBeTruthy();

    // Verificar que hay marcas en la lista
    expect(responseBody.brands.length).toBeGreaterThan(0);

    // Verificar la estructura de una marca
    const firstBrand = responseBody.brands[0];
    expect(firstBrand).toHaveProperty('id');
    expect(firstBrand).toHaveProperty('brand');
}); 