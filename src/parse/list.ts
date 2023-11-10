import Yargs from 'yargs';
import isNil from 'lodash/isNil';
import { CREDENTIAL_TYPES } from '../credential-type';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (yargs: Yargs.Argv) =>
  yargs.command('list', 'List specified resources', (yargs) =>
    yargs
      .usage('Usage: $0 list <command> [options]')
      .command('credentials', 'List credentials from a project', (yargs) =>
        yargs
          .usage('$0 credentials [options]')
          .option('project-id', {
            describe: 'ID of project containing the credentials',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('type', {
            type: 'string',
            requiresArg: true,
            choices: CREDENTIAL_TYPES
          })
          .option('sort', {
            describe: 'Sort order',
            requiresArg: true,
            type: 'string',
            choices: ['created_asc', 'created_desc']
          })
          .option('limit', {
            type: 'number',
            requiresArg: true
          })
          .option('offset', { type: 'number', requiresArg: true })
      )
      .command('projects', 'List projects from an organization', (yargs) =>
        yargs
          .usage('$0 projects [options]')
          .option('organization-id', {
            describe: 'ID of the organization containing the projects',
            type: 'string',
            requiresArg: true
          })
          .option('sort', {
            describe: 'Sort order',
            requiresArg: true,
            type: 'string',
            choices: ['modified_asc', 'modified_desc', 'name_asc', 'name_desc']
          })
          .option('limit', {
            type: 'number',
            requiresArg: true
          })
          .option('offset', { type: 'number', requiresArg: true })
      )
      .command(
        'organizations',
        'List organizations to which authenticated user belongs'
      )
      .command('jobs', 'List jobs for a project', (yargs) =>
        yargs.usage('$0 jobs [options]').option('project-id', {
          describe: 'ID of the project containing the jobs',
          demandOption: true,
          type: 'string',
          requiresArg: true
        })
      )
      .command('runs', 'List runs for a project', (yargs) =>
        yargs
          .usage('$0 runs [options]')
          .option('project-id', {
            describe: 'ID of the organization containing the runs',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('pipeline-id', {
            describe: 'ID of a pipeline used to filter the runs',
            type: 'string',
            requiresArg: true
          })
          .option('job-id', {
            describe: 'ID of a job used to filter the runs',
            type: 'string',
            requiresArg: true
          })
          .option('sort', {
            describe: 'Sort order',
            requiresArg: true,
            type: 'string',
            choices: ['created_asc', 'created_desc']
          })
          .option('limit', {
            type: 'number',
            requiresArg: true
          })
          .option('offset', { type: 'number', requiresArg: true })
      )
      .command(
        'pipeline-revisions',
        'List pipeline revisions for a pipeline',
        (yargs) =>
          yargs
            .usage('$0 pipeline-revisions [options]')
            .option('project-id', {
              describe: 'ID of the project containing the pipeline revision',
              demandOption: true,
              type: 'string',
              requiresArg: true
            })
            .option('pipeline-id', {
              describe: 'ID of the pipeline containing the pipeline revision',
              demandOption: true,
              type: 'string',
              requiresArg: true
            })
            .option('limit', {
              type: 'number',
              requiresArg: true
            })
            .option('offset', { type: 'number', requiresArg: true })
      )
      .command(
        'runner-managers',
        'List runner managers for an organization',
        (yargs) =>
          yargs
            .option('organization-id', {
              describe: 'ID of the organization containing the runner managers',
              type: 'string',
              requiresArg: true
            })
            .check((args) => {
              if (isNil(args.organizationId)) {
                throw new Error('Missing required argument: organization-id');
              }
              return true;
            })
      )
      .command('pipelines', 'List pipelines for a project', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'ID of the project containing the pipelines',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('sort', {
            describe: 'Sort order',
            choices: ['modified_asc', 'modified_desc', 'name_asc', 'name_desc'],
            requiresArg: true
          })
          .option('limit', {
            type: 'number',
            requiresArg: true
          })
          .option('offset', { type: 'number', requiresArg: true })
      )
      .option('filter', {
        describe: 'Filter output using JsonPath',
        type: 'string',
        requiresArg: true
      })
      .demandCommand(1, 'Command must be specified')
      .strict()
  );
