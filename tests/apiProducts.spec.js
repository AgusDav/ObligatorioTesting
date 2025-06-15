const { test, expect } = require('@playwright/test');

test('API 1: Get All Products List', async ({ request }) => {
    // Hacemos una petición GET a la API de productos
    const response = await request.get('https://automationexercise.com/api/productsList');

    // Verificamos que la API respondió con éxito (código 200)
    expect(response.status()).toBe(200);

    // Obtenemos el cuerpo de la respuesta en formato JSON
    const responseBody = await response.json();
    
    // Verificamos que la respuesta tiene la estructura correcta
    expect(responseBody).toHaveProperty('products');
    expect(Array.isArray(responseBody.products)).toBeTruthy();

    // Verificamos que hay al menos un producto en la lista
    expect(responseBody.products.length).toBeGreaterThan(0);

    // Verificamos la estructura de un producto individual
    const firstProduct = responseBody.products[0];
    expect(firstProduct).toHaveProperty('id');
    expect(firstProduct).toHaveProperty('name');
    expect(firstProduct).toHaveProperty('price');
    expect(firstProduct).toHaveProperty('brand');
    expect(firstProduct).toHaveProperty('category');
}); 