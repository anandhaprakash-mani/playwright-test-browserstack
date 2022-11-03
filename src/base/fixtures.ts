import BrowserstackService from '../support/browserstack.service';
import * as base from '@playwright/test';
import { Category } from '@pages/category.page';
import { Product } from '@pages/product.page';
import { isBstack } from '@utils/env';
const BrowserStackLocal = require('browserstack-local');
require('dotenv').config();

export type myPages = {
    CategoryPage: Category;
    ProductPage: Product;
}

exports.bsLocal = new BrowserStackLocal.Local();

exports.BS_LOCAL_ARGS = {
    key: process.env.BROWSERSTACK_ACCESS_KEY || 'YOUR_ACCESS_KEY',
    forceLocal: 'true',
    force: 'true',
    verbose: true,
    onlyAutomate: true
};

export const Browserstack = new BrowserstackService();

export const test = base.test.extend<myPages>({
    browser: async ({playwright}, use, testInfo) => {
        if (isBstack) {
            Browserstack.setBstackBuildCaps(testInfo.project);
            const bstackBrowser = await Browserstack.startBrowser(playwright);
            await use(bstackBrowser);
            await bstackBrowser.close();
        } else {
            const localBrowser = await playwright[testInfo.project.use.browserName].launch();
            await use(localBrowser);
        }
    },
    page: async ({ browser, playwright }, use, testInfo) => {
        if (isBstack) {
            const bstackPage = await browser.newPage(testInfo.project.use);
            await Browserstack.setSessionName(bstackPage, testInfo);
            await use(bstackPage);
            await Browserstack.setTestResult(bstackPage, testInfo);
            await bstackPage.close();
        } else {
            const page = await browser.newPage();
            await use(page);
        }
    },
    CategoryPage: async({page}, use) => {
        const CategoryPO = new Category(page);
        await use(CategoryPO);
    },
    ProductPage: async({page}, use) => {
        const ProductPO = new Product(page);
        await use(ProductPO);
    }
});
