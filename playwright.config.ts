import type { PlaywrightTestConfig } from '@playwright/test';
import { VIEWPORTS } from '@utils/env';
require('dotenv').config();

const config: PlaywrightTestConfig = {
    globalSetup: require.resolve('./src/global/global-setup'),
    globalTeardown: require.resolve('./src/global/global-teardown'),
    testDir: './tests',
    timeout: 60 * 1000,
    expect: {
        timeout: 10000,
    },
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    use: {
        baseURL: 'http://localhost:3000' || process.env.URL,
        actionTimeout: 0,
        navigationTimeout: 60*1000,
        headless: false,
        trace: 'off',
        screenshot: 'only-on-failure'
    },
    projects: [
        {
            name: 'chrome',
            use: {
                browserName: 'chromium',
                channel: 'chrome',
                ignoreHTTPSErrors: true,
                viewport: VIEWPORTS.desktop
            },
        },
        {
            name: 'firefox',
            use: {
                browserName: 'firefox',
                ignoreHTTPSErrors: true,
                viewport: VIEWPORTS.desktop
            },
        },
        {
            name: 'safari',
            use: {
                browserName: 'webkit',
                ignoreHTTPSErrors: true,
                viewport: VIEWPORTS.desktop
            },
        },
        {
            name: 'edge',
            use: {
                browserName: 'chromium',
                channel: 'msedge',
                ignoreHTTPSErrors: true,
                viewport: VIEWPORTS.desktop
            },
        },

        /* Test against mobile viewports. */
        {
            name: 'android',
            use: {
                browserName: 'chromium',
                ignoreHTTPSErrors: true,
                viewport: VIEWPORTS.pixel7
            },
        },
        {
            name: 'iphone',
            use: {
                browserName: 'webkit',
                ignoreHTTPSErrors: true,
                viewport: VIEWPORTS.iPhone14Pro
            },
        },
    ],
};

export default config;
