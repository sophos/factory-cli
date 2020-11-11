/* global __VERSION__ */

import { Command } from 'commander';
import job from './job';
import project from './project';
import { applyCommands } from '../utils/applyCommands';
import { BASE_PATH } from '../constants';

declare const __VERSION__: string;

const helpMessage = `
Usage: refactrctl [options] [command]

Options:
  -V, --version           output the version number
  --access-token <token>  API access token, can also be specified via REFACTR_AUTH_TOKEN environment variable
  --api-url <url>         API endpoint (default: "${BASE_PATH}")
  -h, --help              display help for command

Commands:
  job [options]           job actions
  project                 project actions
`;

const createProgram = () => {
    const program = new Command();

    program
        .version(__VERSION__)
        .name('refactrctl')
        .option(
            '--access-token <token>',
            'API access token, can also be specified via REFACTR_AUTH_TOKEN environment variable',
            process.env.REFACTR_AUTH_TOKEN
        )
        .option('--api-url <url>', 'API endpoint', BASE_PATH);
    program.helpInformation = (): string => helpMessage;
    program.addHelpCommand(false);

    // @ts-ignore
    applyCommands(program, [job, project]);

    return program;
};

export { createProgram };
