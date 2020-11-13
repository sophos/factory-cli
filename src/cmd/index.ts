/* global __VERSION__ */

import { Command } from 'commander';
import job from './job';
import project from './project';
import { applyCommands } from '../utils/applyCommands';
import { BASE_PATH } from '../constants';

declare const __VERSION__: string;

const createProgram = () => {
    const program = new Command();

    program
        .version(__VERSION__)
        .name('refactrctl')
        .option(
            '--access-token <token>',
            'API access token, it can also be specified via REFACTR_AUTH_TOKEN environment variable'
        )
        .option('--api-url <url>', 'API endpoint', BASE_PATH);

    program.getAccessToken = function () {
        return this.accessToken ?? process.env.REFACTR_AUTH_TOKEN;
    };

    // @ts-ignore
    applyCommands(program, [job, project]);

    return program;
};

export { createProgram };
