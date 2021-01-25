import Yargs from 'yargs';
import { readStdin } from '../util/io';
import isNil from 'lodash/isNil';

export default (yargs: Yargs.Argv) =>
  yargs.command('rerun [run-id]', 'Reschedule pipeline run', (yargs) =>
    yargs
      .positional('run-id', {
        describe: 'ID of the run to reschedule',
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
      .option('wait', {
        describe: 'Wait until run execution finishes',
        type: 'boolean'
      })
  );
