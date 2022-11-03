
require('dotenv').config();

export const isBstack = process.env.PWBSTACK === 'true';
export const isBstackLocal = process.env.BROWSERSTACK_LOCAL === 'true';

export const VIEWPORTS = {
    desktop: { width: 1680, height: 1280 },
    iPhone14Pro: { width: 393, height: 786 },
    pixel7: { width: 412, height: 796 }
};
