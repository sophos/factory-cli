import Yargs from 'yargs';
import isArray from 'lodash/isArray';
import * as path from 'path';

import { parseInput, readFile } from '../util/io';
import { CREDENTIAL_TYPES } from '../credential-type';
import { JOB_TRIGGER_TYPE } from '../job-trigger-type';

const coerceInput = (arg: string | string[]) => {
  if (isArray(arg)) {
    // TODO: throw err?
    return;
  }

  // If input starts with @ treat input as file path.
  if (arg.startsWith('@')) {
    try {
      const filepath = path.resolve(arg.slice(1));
      return readFile(filepath);
    } catch (err) {
      // TODO: handle error
      console.error(err);
    }
  }

  return parseInput(arg);
};

export default (yargs: Yargs.Argv) =>
  yargs.command('create', '', (yargs) =>
    yargs
      .command('project', '', (yargs) =>
        yargs
          .option('organization-id', {
            describe: 'Project this pipeline belongs to',
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
      .command('pipeline-revision <input>', '', (yargs) =>
        yargs
          .positional('input', {
            type: 'string',
            required: true,
            coerce: coerceInput
          })
          .option('project-id', {
            describe: 'Project this pipeline belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('pipeline-id', {
            describe: 'Pipeline',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('pipeline [options]', '', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'Project this pipeline belongs to',
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
      )
      .command('credential', 'Create a new credential', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'Project this credential will be created under',
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
          .usage('Usage: $0 [options]')
          .option('project-id', {
            describe: 'Project this job belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('pipeline-id', {
            type: 'string',
            describe: 'Pipeline this job relates to',
            demandOption: true,
            requiresArg: true
          })
          .option('pipeline-revision', {
            describe: 'Revision of pipeline to set for job',
            type: 'number',
            requiresArg: true
          })
          .option('name', {
            describe: 'Job name',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('type', {
            describe: 'Job trigger type',
            choices: JOB_TRIGGER_TYPE,
            demandOption: true,
            requiresArg: true
          })
          .option('suppress-events', {
            describe: 'Suppress run events',
            type: 'boolean',
            default: false
          })
          .option('suppress-output', {
            describe: 'Suppress job run output',
            type: 'boolean',
            default: false
          })
          .option('suppress-variables', {
            describe: 'Suppress variables',
            type: 'boolean',
            default: false
          })
          .option('disable-on-failure', {
            type: 'boolean',
            default: false
          })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
