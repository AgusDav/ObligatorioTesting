const { test, expect } = require('@playwright/test');

test('API 5: POST To Search Product', async ({ request }) => {
    // Probamos diferentes términos de búsqueda para asegurar que la API funciona con varios casos
    const searchTerms = ['top', 'tshirt', 'jean'];

    for (const searchTerm of searchTerms) {
        // Hacemos la petición a la API con cada término de búsqueda
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                search_product: searchTerm
            }
        });

        // Verificamos que la API respondió correctamente
        expect(response.status()).toBe(200);

        // Obtenemos y verificamos la respuesta
        const responseBody = await response.json();
        
        // Verificamos que la respuesta tiene la estructura correcta
        expect(responseBody).toHaveProperty('products');
        expect(Array.isArray(responseBody.products)).toBeTruthy();

        // Verificamos que encontramos productos
        expect(responseBody.products.length).toBeGreaterThan(0);

        // Verificamos que cada producto tiene la estructura correcta
        const firstProduct = responseBody.products[0];
        expect(firstProduct).toHaveProperty('id');
        expect(firstProduct).toHaveProperty('name');
        expect(firstProduct).toHaveProperty('price');
        expect(firstProduct).toHaveProperty('brand');
        expect(firstProduct).toHaveProperty('category');

        // Verificamos que el producto encontrado realmente contiene el término de búsqueda
        expect(firstProduct.name.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
}); 