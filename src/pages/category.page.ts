// playwright-dev-page.ts
import { Page } from '@playwright/test';

export class Category {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get header()            { return this.page.locator('#product-info h1'); }
    get compareTitle()      { return this.page.locator('#price-quotes-category-title'); }

}
