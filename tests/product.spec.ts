import { expect } from '@playwright/test';
import { test } from '@base/fixtures';
import { Product } from '@pages/product.page';

test('product page', async ({ page }) => {
    const ProductPage = new Product(page);
    await page.goto('https://www.softwareadvice..com/crm/hubspot-profile/');
    const h1 = await ProductPage.header;
    const title = await ProductPage.compareTitle;
    await expect(h1).toContainText('Salesforce Sales Cloud');
    await expect(title).toContainText('Salesforce Sales Cloud');
    await expect(page).toHaveURL(/.*salesforce/);
});
