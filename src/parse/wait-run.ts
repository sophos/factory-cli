import Yargs from 'yargs';
import { readStdin } from '../util/io';
import isNil from 'lodash/isNil';

export default (yargs: Yargs.Argv) =>
  yargs
    .command(
      'wait-run [run-id]',
      'Wait until run execution is finished',
      (yargs) =>
        yargs
          .positional('run-id', {
            describe: 'ID of the run to wait',
            type: 'string',
            demandOption: true
          })
          .default('run-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.runId)) {
              throw new Error('Run ID must be provided');
            }

            return true;
          }, false)

          .option('project-id', {
            describe: 'ID of the project containing the run',
            type: 'string',
            demandOption: true
          })
    )
    .demandCommand(1, 'Command must be specified.')
    .strict();
