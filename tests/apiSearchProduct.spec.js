const { test, expect } = require('@playwright/test');

test('API 5: POST To Search Product', async ({ request }) => {
    // Array de términos de búsqueda para probar
    const searchTerms = ['top', 'tshirt', 'jean'];

    for (const searchTerm of searchTerms) {
        // Realizar la petición POST a la API con el término de búsqueda
        const response = await request.post('https://automationexercise.com/api/searchProduct', {
            data: {
                search_product: searchTerm
            }
        });

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

        // Verificar que el nombre del producto contiene el término de búsqueda
        expect(firstProduct.name.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
}); 