import { browsers } from '@browserstack/bstack.caps';
import * as util from '@utils/helper';
require('dotenv').config();

export default class BstackService {
    public caps: {};

    public setBstackBuildCaps(project) {
        this.caps = browsers[project.name];
        this.caps['build'] = process.env.BROWSERSTACK_BUILD || 'local-pw-builds';
        this.caps['browserstack.local'] = process.env.BROWSERSTACK_LOCAL || false;
    }

    public async startBrowser(playwright) {
        return await playwright.chromium.connect({ wsEndpoint: `wss://cdp.browserstack.com/playwright?caps=${encodeURIComponent(JSON.stringify(this.caps),)}` });
    }

    public async setTestResult(page, testInfo) {
        const testResult = {
            action: 'setSessionStatus',
            arguments: {
                status: util.evaluateSessionStatus(testInfo.status),
                reason: util.nestedKeyValue(testInfo, ['error', 'message']),
            },
        };
        await page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(testResult)}`);
    }

    public async setSessionName(page, testInfo) {
        const sessionName = {
            action: 'setSessionName',
            arguments: {
                name: testInfo.project.name + '/' + testInfo.file.split('/').slice(-2).join('/')
            }
        };
        await page.evaluate(() => {}, `browserstack_executor: ${JSON.stringify(sessionName)}`);
    }

    public async getSessionDetails(page) {
        return  await page.evaluate(() => {}, 'browserstack_executor: {"action": "getSessionDetails"}');
    }

}
