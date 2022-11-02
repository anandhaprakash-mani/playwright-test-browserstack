// global-setup.js
import {isBstackLocal} from "../constants";

const { bsLocal, BS_LOCAL_ARGS } = require('../base.fixtures');
const colors = require('cli-color');

module.exports = () => {
    if(isBstackLocal) {
        console.log(colors.magenta('---------------Global set up started--------------'));
        console.log(colors.yellow('Establishing browserstack local tunnel connection..'));
        bsLocal.startSync(BS_LOCAL_ARGS)
        if(bsLocal.isRunning()){
            console.log(colors.green('Browserstack Local STARTED..'))
        } else {
            throw new Error('Browserstack Local is not started. Try Again..');
        }
        console.log(colors.magenta('--------------Global set up done------------------'));
    }
};
