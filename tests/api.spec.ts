import { expect, test } from '@playwright/test';

test(`API Test`, async ({ request }) => {
    const response = await request.get('https://upcsum-products-api.softwareadvice.com/products/product-uri/freshbooks/category-id/14/country/us');
    await expect(response).toBeOK();
    const guidRegEx = /^[{]?[0-9a-fA-F]{8}-([0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}[}]?$/;
    const data = await response.json();
    await expect(data.productGuid).toMatch(guidRegEx)
});
