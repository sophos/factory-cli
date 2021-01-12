import Yargs from 'yargs';
import isArray from 'lodash/isArray';
import * as path from 'path';

import { parseInput, readFile } from '../util/io';

export default (yargs: Yargs.Argv) =>
  yargs.command('delete', '', (yargs) =>
    yargs
      .command('pipeline <pipeline-id>', 'Delete a pipeline', (yargs) =>
        yargs
          .positional('pipeline-id', {
            describe: 'ID pipeline to delete',
            type: 'string',
            required: true
          })
          .option('project-id', {
            describe: 'ID of the project containing the pipeline',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('job <job-id>', 'Delete a job', (yargs) =>
        yargs
          .positional('job', { type: 'string', required: true })
          .option('project-id', {
            describe: 'ID of the project containing the job',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('project <project-id>', 'Delete a project', (yargs) =>
        yargs.positional('project-id', {
          describe: 'ID of the project',
          type: 'string',
          required: true
        })
      )
      .command('runner <runner-id>', 'Delete a runner', (yargs) =>
        yargs
          .positional('runner-id', { type: 'string', required: true })
          .option('organization-id', {
            describe: 'ID of the organization containing the runner',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('credential <credential-id>', 'Delete a runner', (yargs) =>
        yargs
          .positional('credential-id', { type: 'string', required: true })
          .option('project-id', {
            describe: 'ID of the project containing the credential',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
