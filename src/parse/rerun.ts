import Yargs from 'yargs';

export default (yargs: Yargs.Argv) =>
  yargs.command('rerun <run-id>', 'Reschedule pipeline run', (yargs) =>
    yargs
      .positional('run-id', {
        describe: 'ID of the run to reschedule',
        type: 'string',
        demandOption: true
      })
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
