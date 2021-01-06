import Yargs from 'yargs';

export default (yargs: Yargs.Argv) =>
  yargs.command('list', 'List resources of specified type', (yargs) =>
    yargs
      .usage('Usage: $0 list <command> [options]')
      .command('projects', '', (yargs) =>
        yargs.usage('$0 projects [options]').option('organization-id', {
          describe: 'Organization projects belong to',
          type: 'string',
          requiresArg: true
        })
      )
      .command('organizations', 'List organizations one belongs to')
      .command('jobs', 'List jobs for a project', (yargs) =>
        yargs.usage('$0 jobs [options]').option('project-id', {
          describe: 'Project runs belong to',
          demandOption: true,
          type: 'string',
          requiresArg: true
        })
      )
      .command('runs', 'List runs for a project', (yargs) =>
        yargs
          .usage('$0 runs [options]')
          .option('project-id', {
            describe: 'Project runs belong to',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('pipeline-id', {
            describe: 'Pipeline runs belong to',
            type: 'string',
            requiresArg: true
          })
          .option('job-id', {
            describe: 'Job runs belong to',
            type: 'string',
            requiresArg: true
          })
      )
      .command('pipelines', 'List pipelines for a project', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'Project pipelines belong to',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('sort', {
            describe: 'Order in which returned pipelines should be sorted',
            choices: ['modified_asc', 'modified_desc', 'name_asc', 'name_desc'],
            requiresArg: true
          })
          .option('limit', {
            type: 'number',
            requiresArg: true
          })
          .option('offset', { type: 'number', requiresArg: true })
          .option('search', { type: 'string', requiresArg: true })
      )
      .option('filter', {
        describe: 'Filter output based on conditions provided',
        type: 'string',
        requiresArg: true
      })
      .demandCommand(1, 'Command must be specified')
      .strict()
  );
