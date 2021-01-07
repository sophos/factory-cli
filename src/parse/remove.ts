import Yargs from 'yargs';
import isArray from 'lodash/isArray';
import * as path from 'path';

import { parseInput, readFile } from '../util/io';

export default (yargs: Yargs.Argv) =>
  yargs.command('remove', '', (yargs) =>
    yargs
      .command('pipeline <pipeline-id>', 'Delete specified pipeline', (yargs) =>
        yargs
          .positional('pipeline-id', {
            describe: 'Pipeline to delete',
            type: 'string',
            required: true
          })
          .option('project-id', {
            describe: 'Project this pipeline belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('job <job-id>', 'Delete specified job', (yargs) =>
        yargs
          .positional('job', { type: 'string', required: true })
          .option('project-id', {
            describe: 'Project this pipeline belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('project <project-id>', 'Delete specified project', (yargs) =>
        yargs.positional('project-id', {
          type: 'string',
          required: true
        })
      )
      .command('runner <runner-id>', 'Delete specified runner', (yargs) =>
        yargs
          .positional('runner-id', { type: 'string', required: true })
          .option('organization-id', {
            describe: 'Organization this runner belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command(
        'credential <credential-id>',
        'Delete specified runner',
        (yargs) =>
          yargs
            .positional('credential-id', { type: 'string', required: true })
            .option('project-id', {
              describe: 'Project this credential belongs to',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
