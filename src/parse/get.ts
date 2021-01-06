import Yargs from 'yargs';

export default (yargs: Yargs.Argv) =>
  yargs.command('get', 'Get specified resource', (yargs) =>
    yargs
      .usage('Usage: $0 get <command> [options]')
      .command('project <project-id>', 'Get project details', (yargs) =>
        yargs
          .usage('Usage: $0 <project-id> [options]')
          .positional('project-id', {
            type: 'string',
            describe: 'Project to get',
            demandOption: true,
            requiresArg: true
          })
      )
      .command(
        'organization <organization-id>',
        'Get organization details',
        (yargs) =>
          yargs
            .usage('Usage: $0 <organization-id> [options]')
            .positional('organization-id', {
              type: 'string',
              describe: 'Organization to get',
              demandOption: true,
              requiresArg: true
            })
      )
      .command('run <run-id>', 'Get run details', (yargs) =>
        yargs
          .usage('Usage: $0 <run-id> [options]')
          .positional('run-id', {
            type: 'string',
            describe: 'Run to get',
            demandOption: true,
            requiresArg: true
          })
          .option('project-id', {
            describe: 'Project this run belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .option('filter', {
        describe: 'Filter output based on conditions provided',
        type: 'string',
        requiresArg: true
      })
      .demandCommand(1, 'Command must be specified')
      .strict()
  );
