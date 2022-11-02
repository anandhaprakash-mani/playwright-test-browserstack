import { expect } from '@playwright/test';
import { test } from '../base.fixtures';

test('category page 1', async ({ page, CategoryPage }) => {
    await page.goto('https://www.softwareadvice.com/property//');
    const h1 = await CategoryPage.header;
    const title = await CategoryPage.compareTitle;
    await expect(h1).toContainText('Find the best');
    await expect(title).toContainText('Compare the');
    await expect(page).toHaveURL(/.*property/);
});
