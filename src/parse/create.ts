import * as path from 'path';

import Yargs from 'yargs';
import isArray from 'lodash/isArray';
import isString from 'lodash/isString';
import isNil from 'lodash/isNil';

import { readStdin, parsePipelineFile, readPipelineFile } from '../util/io';
import { CREDENTIAL_TYPES } from '../credential-type';
import { JOB_TRIGGER_TYPE } from '../job-trigger-type';

const coerceInput = (arg: string | string[]) => {
  if (isArray(arg)) {
    // TODO: throw err?
    return;
  } else if (!isString(arg)) {
    return;
  }

  // If input starts with @ treat input as file path.
  if (arg.startsWith('@')) {
    const filepath = path.resolve(arg.slice(1).trim());
    return readPipelineFile(filepath);
  }

  return parsePipelineFile(arg);
};

export default (yargs: Yargs.Argv) =>
  yargs.command('create', 'Create specified resource', (yargs) =>
    yargs
      .command('project', 'Create a new project', (yargs) =>
        yargs
          .option('organization-id', {
            describe:
              'ID of organization under which the project will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the project',
            type: 'string',
            requiresArg: true,
            demandOption: true
          })
      )
      .command(
        'pipeline-revision [input]',
        'Create a new pipeline-revision',
        (yargs) =>
          yargs
            .positional('input', {
              description:
                'Pipeline workflow configuration. The configuration must be provided either in YAML or JSON formats. ' +
                'If supplied argument is starting with at symbol (`@`) argument is treated as path to configuration file.',
              coerce: coerceInput
            })
            .default('input', () => readStdin(), 'read from stdin')
            .check((argv) => {
              if (isNil(argv.input)) {
                throw new Error('Input data must be provided');
              }

              return true;
            }, false)
            .option('project-id', {
              describe: 'ID of the project containing the pipeline',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
            .option('pipeline-id', {
              describe: 'ID of the pipeline for the pipeline-revision',
              demandOption: true,
              requiresArg: true
            })
      )
      .command('pipeline [options]', 'Creates a new pipeline', (yargs) =>
        yargs
          .usage(
            '$0 pipeline --project-id <project-id> --name <name> [options]'
          )
          .option('project-id', {
            describe: 'ID of the project under which pipeline will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the pipeline',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('description', {
            describe: 'Description of the pipeline',
            type: 'string',
            requiresArg: true
          })
          .option('summary', {
            describe: 'Summary of the pipeline',
            type: 'string',
            requiresArg: true
          })
      )
      .command('credential', 'Create a new credential', (yargs) =>
        yargs
          .option('project-id', {
            describe:
              'ID of the project under which the credential will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the credential',
            type: 'string',
            requiresArg: true,
            demandOption: true
          })
          .option('data', {
            describe: 'Credential data. Must be valid JSON value.',
            type: 'string',
            requiresArg: true,
            demandOption: true,
            coerce: (arg) => JSON.parse(arg)
          })
          .option('id', {
            describe: 'Credential reference id',
            requiresArg: true,
            demandOption: true
          })
          .option('type', {
            describe: 'Credential type',
            requiresArg: true,
            demandOption: true,
            choices: CREDENTIAL_TYPES
          })
      )
      .command('job', 'Create a new job', (yargs) =>
        yargs
          .usage('Usage: $0 job [options]')
          .option('project-id', {
            describe: 'ID of the project under which job will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('pipeline-id', {
            type: 'string',
            describe: 'ID of the pipeline from which job will be created',
            demandOption: true,
            requiresArg: true
          })
          .option('pipeline-revision', {
            describe: 'Number of the pipeline revision',
            type: 'number',
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the job',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('type', {
            describe: 'Trigger type of the job',
            choices: JOB_TRIGGER_TYPE,
            demandOption: true,
            requiresArg: true
          })

          .option('schedule', { hidden: true })
          .option('schedule.start-day', {
            type: 'string',
            requiresArg: true
          })
          .option('schedule.start-time', {
            type: 'string',
            requiresArg: true
          })
          .option('schedule.offset', {
            type: 'string',
            requiresArg: true
          })
          .option('schedule.interval', {
            type: 'number',
            requiresArg: true
          })
          .option('schedule.interval-type', {
            choices: ['minute', 'hour', 'day', 'week', 'month'],
            requiresArg: true
          })
          .option('suppress-events', {
            describe: 'Suppress run events during job run',
            type: 'boolean',
            default: false
          })
          .option('suppress-outputs', {
            describe: 'Suppress outputs during job run',
            type: 'boolean',
            default: false
          })
          .option('suppress-variables', {
            describe: 'Suppress variables during job run',
            type: 'boolean',
            default: false
          })
          .option('disable-on-failure', {
            describe: 'Specifies whether job will be disabled on failed run',
            type: 'boolean',
            default: false
          })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
