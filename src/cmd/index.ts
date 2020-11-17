/* global __VERSION__ */

import { Command } from 'commander';
import job from './job';
import project from './project';
import run from './run';
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
            'API token'
        )
        .option('--api-url <url>', 'API endpoint', BASE_PATH);

    // @ts-ignore
    applyCommands(program, [job, project, run]);

    return program;
};

export { createProgram };
