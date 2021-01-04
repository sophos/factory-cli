import * as path from 'path';

import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import { terminalWidth } from 'yargs';
import yargs from 'yargs/yargs';

import { DATA_FORMATTER, EVENT_FORMATTER } from '../formatter';
import { parseInput, readFile } from '../util/io';

const coerceInput = (arg: string | string[]) => {
  if (isArray(arg)) {
    // TODO: throw err?
    return;
  }

  // If input starts with @ treat input as file path.
  if (arg.startsWith('@')) {
    try {
      const filepath = path.resolve(arg.replace('@', ''));
      return readFile(filepath);
    } catch (err) {
      // TODO: handle error
      console.error(err);
    }
  }

  return parseInput(arg);
};

const parse = (argv: string[], { version }: { version: string }) =>
  yargs(argv)
    .strict(true)
    .scriptName('refactrctl')
    .version(version)
    .usage('Usage: $0 <command> [options]')
    .middleware((argv) => {
      if (isString(process.env.REFACTR_ADDRESS)) {
        argv.address = process.env.REFACTR_ADDRESS;
      }

      if (isString(process.env.REFACTR_AUTH_TOKEN)) {
        argv.authToken = argv['auth-token'] = process.env.REFACTR_AUTH_TOKEN;
      }
    })
    .option('verbose', {
      alias: 'v',
      describe: 'Print detailed output',
      type: 'boolean',
    })
    .option('format', {
      describe: 'Specifies output format',
      default: DATA_FORMATTER,
      choices: ['table', 'json', 'yaml'],
    })
    .option('address', {
      describe:
        'Address of the Refactr server. This can also be specified via the REFACTR_ADDRESS environment variable',
      type: 'string',
      default: 'https://api.refactr.it/v1',
      demandOption: true,
      requiresArg: true,
    })
    .option('auth-token', {
      describe:
        'Authentication token. This can also be specified via the REFACTR_AUTH_TOKEN environment variable',
      type: 'string',
      requiresArg: true,
    })

    // Login
    .command('login', 'Authenticates against the API and stores the token')

    // Get
    .command('get', 'Get specified resource', (yargs) =>
      yargs
        .usage('Usage: $0 get <command> [options]')
        .command('project <project-id>', 'Get project details', (yargs) =>
          yargs
            .usage('Usage: $0 <project-id> [options]')
            .positional('project-id', {
              type: 'string',
              describe: 'Project to get',
              demandOption: true,
              requiresArg: true,
            })
        )
        .command(
          'organization <organization-id>',
          'Get organization details',
          (yargs) =>
            yargs
              .usage('Usage: $0 <organization-id> [options]')
              .positional('organization-id', {
                type: 'string',
                describe: 'Organization to get',
                demandOption: true,
                requiresArg: true,
              })
        )
        .command('run <run-id>', 'Get run details', (yargs) =>
          yargs
            .usage('Usage: $0 <run-id> [options]')
            .positional('run-id', {
              type: 'string',
              describe: 'Run to get',
              demandOption: true,
              requiresArg: true,
            })
            .option('project-id', {
              describe: 'Project this run belongs to',
              type: 'string',
              demandOption: true,
              requiresArg: true,
            })
        )
        .option('filter', {
          describe: 'Filter output based on conditions provided',
          type: 'string',
          requiresArg: true,
        })
        .demandCommand(1, 'Command must be specified')
        .strict()
    )

    // List
    .command('list', 'List resources of specified type', (yargs) =>
      yargs
        .usage('Usage: $0 list <command> [options]')
        .command('projects', '', (yargs) =>
          yargs.usage('$0 projects [options]').option('organization-id', {
            describe: 'Organization projects belong to',
            type: 'string',
            requiresArg: true,
          })
        )
        .command('organizations', 'List organizations one belongs to')
        .command('jobs', 'List jobs for a project', (yargs) =>
          yargs.usage('$0 jobs [options]').option('project-id', {
            describe: 'Project runs belong to',
            demandOption: true,
            type: 'string',
            requiresArg: true,
          })
        )
        .command('runs', 'List runs for a project', (yargs) =>
          yargs
            .usage('$0 runs [options]')
            .option('project-id', {
              describe: 'Project runs belong to',
              demandOption: true,
              type: 'string',
              requiresArg: true,
            })
            .option('pipeline-id', {
              describe: 'Pipeline runs belong to',
              type: 'string',
              requiresArg: true,
            })
            .option('job-id', {
              describe: 'Job runs belong to',
              type: 'string',
              requiresArg: true,
            })
        )
        .option('filter', {
          describe: 'Filter output based on conditions provided',
          type: 'string',
          requiresArg: true,
        })
        .demandCommand(1, 'Command must be specified')
        .strict()
    )

    // Invite
    .command('invite', '', (yargs) =>
      yargs
        .command('user', 'Invite user to provide the organization')
        .usage(
          'Usage: $0 user --organization-id <organization-id> --email <email-address>'
        )
        .option('organization-id', {
          describe: 'Organization to invite the user to',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        })
        .option('email', {
          describe: 'Email address to invite user to the organization by',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        })
        .demandCommand(1, 'Command must be specified.')
        .strict()
    )

    // Create
    .command('create', '', (yargs) =>
      yargs
        .option('project-id', {
          describe: 'Project this pipeline belongs to',
          type: 'string',
          demandOption: true,
          requiresArg: true,
        })
        .command('pipeline-revision <input>', '', (yargs) =>
          yargs
            .positional('input', {
              type: 'string',
              required: true,
              coerce: coerceInput,
            })
            .option('pipeline-id', {
              describe: 'Pipeline',
              demandOption: true,
              requiresArg: true,
            })
        )
        .command('pipeline <input>', '', (yargs) =>
          yargs
            .positional('input', {
              type: 'string',
              required: true,
              coerce: coerceInput,
            })
            .option('name', {
              describe: 'Name of the pipeline',
              type: 'string',
              demandOption: true,
              requiresArg: true,
            })
        )
        .demandCommand(1, 'Command must be specified.')
        .strict()
    )

    // Run
    .command('run', 'Execute pipeline-revision, job, etc.', (yargs) =>
      yargs
        .option('format', {
          describe: 'Specifies output format',
          default: EVENT_FORMATTER,
          choices: ['log'],
        })
        .option('wait', {
          describe: 'Wait until run execution finishes',
          type: 'boolean',
        })
        .option('suppress-events', {
          describe: 'Suppress run events',
          type: 'boolean',
        })
        .option('suppress-output', {
          describe: 'Suppress run output',
          type: 'boolean',
        })
        .option('suppress-variables', {
          describe: 'Suppress variables',
          type: 'boolean',
        })
        .command('job <job-id>', '', (yargs) =>
          yargs
            .positional('job-id', {
              describe: 'Job to run',
              type: 'string',
              demandOption: true,
            })
            .option('project-id', {
              describe: 'Project this job belongs to',
              type: 'string',
              demandOption: true,
            })
        )
        .command(
          'pipeline-revision',
          'Executes specified pipeline-revision',
          (yargs) =>
            yargs
              .option('project-id', {
                describe: 'Project this pipeline belongs to',
                type: 'string',
                demandOption: true,
              })
              .option('pipeline-id', {
                describe: 'Pipeline to execute',
                type: 'string',
                demandOption: true,
                requiresArg: true,
              })
              .option('revision', {
                describe: 'Revision number',
                type: 'number',
                demandOption: true,
                requiresArg: true,
              })
              .option('var', {
                describe: 'Pipeline variable in `key:value` format',
                type: 'string',
                requiresArg: true,
                coerce: (arg: string | string[]) => {
                  if (typeof arg === 'string') {
                    arg = [arg];
                  }

                  return Object.fromEntries(
                    arg.map((a) => {
                      const parts = a.split(':');

                      if (parts.length !== 2) {
                        throw new Error(
                          'Invalid variable format, expected variable to be specified as `key:value`.'
                        );
                      }

                      return parts;
                    })
                  );
                },
              })
              .strict()
        )
        .demandCommand(1, 'Command must be specified.')
        .strict()
    )

    .demandCommand(1, 'Command must be specified.')
    .help()
    .wrap(Math.min(120, terminalWidth())).argv;

export default parse;
