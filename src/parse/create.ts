import Yargs from 'yargs';
import isArray from 'lodash/isArray';
import * as path from 'path';

import { parseInput, readFile } from '../util/io';
import { CREDENTIAL_TYPES } from '../credential-type';

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
      .command('pipeline <input>', '', (yargs) =>
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
          .option('name', {
            describe: 'Name of the pipeline',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('credential', 'Create credential', (yargs) =>
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
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
