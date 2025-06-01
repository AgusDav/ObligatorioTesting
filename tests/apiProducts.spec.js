const { test, expect } = require('@playwright/test');

test('API 1: Get All Products List', async ({ request }) => {
    // Realizar la petición GET a la API
    const response = await request.get('https://automationexercise.com/api/productsList');

    // Verificar que el código de respuesta sea 200
    expect(response.status()).toBe(200);

    // Obtener y verificar el JSON de respuesta
    const responseBody = await response.json();
    
    // Verificar que la respuesta contiene la estructura esperada
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBeTruthy();

    // Verificar que hay productos en la lista
    expect(responseBody.products.length).toBeGreaterThan(0);

    // Verificar la estructura de un producto
    const firstProduct = responseBody.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
}); 