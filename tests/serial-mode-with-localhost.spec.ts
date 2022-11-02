import { expect, Page } from '@playwright/test';
import { Browserstack, test } from '../base.fixtures';
import { Category } from '../page-objects/category.page';
import { Product } from '../page-objects/product.page';
import {isBstack, isBstackLocal} from '../constants';

test.describe.configure({mode: "serial"});
let page: Page;
let CategoryPage, ProductPage;

test.skip(({  }) => !isBstackLocal);

test.describe('Serial mode tests 1', () => {
    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        CategoryPage = new Category(page);
        ProductPage = new Product(page);
        if(isBstack) await Browserstack.setSessionName(page, test.info());
    })

    test('1', async ({ }) => {
        await page.goto('http://localhost:3000/us/c/property/?automated=true&gtm=false');
        // await page.goto('https://www.softwareadvice.com/property/?automated=true&gtm=false');
        const h1 = await CategoryPage.header;
        const title = await CategoryPage.compareTitle;
        await expect(h1).toContainText('Find the best');
        await expect(title).toContainText('Compare the');
        await expect(page).toHaveURL(/.*property/);
    });

    test('2', async ({ }) => {
        await page.goto('http://localhost:3000/us/p/crm/salesforce/?automated=true&gtm=false');
        // await page.goto('https://www.softwareadvice.com/crm/salesforce-profile/?automated=true&gtm=false');
        const h1 = await ProductPage.header;
        const title = await ProductPage.compareTitle;
        await expect(h1).toContainText('Salesforce Sales Cloud');
        await expect(title).toContainText('Salesforce Sales Cloud');
        await expect(page).toHaveURL(/.*salesforce/);
    });

    test.afterAll(async () => {
        if(isBstack) await Browserstack.setTestResult(page, test.info());
    })
})
