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
        .name('refactr-cli')
        .option(
            '--access-token <token>',
            'API access token',
            process.env.REFACTR_AUTH_TOKEN
        )
        .option('--api-url', 'API endpoint', BASE_PATH);

    // @ts-ignore
    applyCommands(program, [job, project]);

    return program;
};

export { createProgram };
