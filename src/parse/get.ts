import Yargs from 'yargs';
import { JOB_TRIGGER_TYPE } from '../job-trigger-type';

export default (yargs: Yargs.Argv) =>
  yargs.command('get', 'Get specified resource', (yargs) =>
    yargs
      .usage('Usage: $0 get <command> [options]')
      .command(
        'credential <credential-id>',
        'Get credential details',
        (yargs) =>
          yargs
            .usage('Usage: $0 <credential-id> [options]')
            .positional('credential-id', {
              type: 'string',
              describe: 'Credential to get',
              demandOption: true,
              requiresArg: true
            })
            .option('project-id', {
              describe: 'Project this credential belongs to',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
      )
      .command('job <job-id>', 'Get job details', (yargs) =>
        yargs
          .usage('Usage: $0 <job-id> [options]')
          .positional('job-id', {
            type: 'string',
            describe: 'Job to get',
            demandOption: true,
            requiresArg: true
          })
          .option('project-id', {
            describe: 'Project this job belongs to',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
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
      .command(
        'pipeline-revision <revision>',
        'Get pipeline-revision details',
        (yargs) =>
          yargs
            .usage('Usage: $0 <revision> [options]')
            .positional('revision', {
              type: 'string',
              describe: 'Pipeline revision to get',
              demandOption: true,
              requiresArg: true
            })
            .option('project-id', {
              describe: 'Project this pipeline revision belongs to',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
            .option('pipeline-id', {
              describe: 'Pipeline this revision belongs to',
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
