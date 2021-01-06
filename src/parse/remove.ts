import Yargs from 'yargs';
import isArray from 'lodash/isArray';
import * as path from 'path';

import { parseInput, readFile } from '../util/io';

export default (yargs: Yargs.Argv) =>
  yargs.command('remove', '', (yargs) =>
    yargs
      .command('pipeline <pipeline-id>', '', (yargs) =>
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
      .command('job <job-id>', 'Job to delete', (yargs) =>
        yargs
          .positional('job', { type: 'string', required: true })
          .option('project-id', {
            describe: 'Project this pipeline belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('project <project-id>', '', (yargs) =>
        yargs.positional('project-id', {
          type: 'string',
          required: true
        })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
