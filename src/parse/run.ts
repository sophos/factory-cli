import Yargs from 'yargs';

export default (yargs: Yargs.Argv) =>
  yargs.command('run', 'Execute pipeline or job', (yargs) =>
    yargs
      .option('wait', {
        describe: 'Wait until run execution finishes',
        type: 'boolean'
      })
      .option('suppress-events', {
        describe: 'Suppress run events',
        type: 'boolean'
      })
      .option('suppress-output', {
        describe: 'Suppress run output',
        type: 'boolean'
      })
      .option('suppress-variables', {
        describe: 'Suppress variables',
        type: 'boolean'
      })
      .command('job <job-id>', '', (yargs) =>
        yargs
          .positional('job-id', {
            describe: 'Job to run',
            type: 'string',
            demandOption: true
          })
          .option('project-id', {
            describe: 'Project this job belongs to',
            type: 'string',
            demandOption: true
          })
      )
      .command('pipeline', 'Executes specified pipeline', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'Project this pipeline belongs to',
            type: 'string',
            demandOption: true
          })
          .option('pipeline-id', {
            describe: 'Pipeline to execute',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('revision', {
            describe: 'Revision number',
            type: 'number',
            demandOption: true,
            requiresArg: true
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
            }
          })
          .strict()
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
