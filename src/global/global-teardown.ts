// global-teardown.js
import { isBstackLocal } from '@utils/env';

const { bsLocal } = require('../base/fixtures');
const { promisify } = require('util');
const sleep = promisify(setTimeout);
const colors = require('cli-color');

module.exports = async () => {
    if(isBstackLocal) {
        console.log(colors.magenta('---------------Global tear down started--------------'));
        console.log(colors.yellow('Killing browserstack local tunnel connection..'));
        let localStopped = false;
        if (bsLocal && bsLocal.isRunning()) {
            bsLocal.stop(() => {
                localStopped = true;
                console.log(colors.green('Browserstack Local STOPPED..'));
                console.log(colors.magenta('---------------Global tear down done------------------'));
            });
            while (!localStopped) {
                await sleep(1000);
            }
        }
    }
};
