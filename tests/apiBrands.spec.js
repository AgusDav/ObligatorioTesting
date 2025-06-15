const { test, expect } = require('@playwright/test');

test('API 3: Get All Brands List', async ({ request }) => {
    // Hacemos una petición GET a la API de marcas
    const response = await request.get('https://automationexercise.com/api/brandsList');

    // Verificamos que la API respondió con éxito (código 200)
    expect(response.status()).toBe(200);

    // Obtenemos el cuerpo de la respuesta en formato JSON
    const responseBody = await response.json();
    
    // Verificamos que la respuesta tiene la estructura correcta
    // Debe tener una propiedad 'brands' que sea un array
    expect(responseBody).toHaveProperty('brands');
    expect(Array.isArray(responseBody.brands)).toBeTruthy();

    // Verificamos que hay al menos una marca en la lista
    expect(responseBody.brands.length).toBeGreaterThan(0);

    // Verificamos la estructura de una marca individual
    const firstBrand = responseBody.brands[0];
    expect(firstBrand).toHaveProperty('id');      // ID único de la marca
    expect(firstBrand).toHaveProperty('brand');   // Nombre de la marca
}); 