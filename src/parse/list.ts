import Yargs from 'yargs';
import isNil from 'lodash/isNil';
import { CREDENTIAL_TYPES } from '../credential-type';

export default (yargs: Yargs.Argv) =>
  yargs.command('list', 'List resources of specified type', (yargs) =>
    yargs
      .usage('Usage: $0 list <command> [options]')
      .command('credentials', 'List credentials from a project', (yargs) =>
        yargs
          .usage('$0 credentials [options]')
          .option('project-id', {
            describe: 'Project credentials belong to',
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
      .command('pipeline-revisions', 'List runs for a project', (yargs) =>
        yargs
          .usage('$0 runs [options]')
          .option('project-id', {
            describe: 'Project pipelines belong to',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('pipeline-id', {
            describe: 'Pipeline revisions belong to',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
      )
      .command('runners', 'List runners for an organization', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'Project runners assigned to',
            type: 'string',
            requiresArg: true
          })
          .option('organization-id', {
            describe: 'Organization runners belong to',
            type: 'string',
            requiresArg: true
          })
          .check((args) => {
            if (isNil(args.projectId || args.organizationId)) {
              throw new Error(
                'Missing required argument: either organization-id or project-id'
              );
            }

            return true;
          })
          .conflicts('project-id', 'organization-id')
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
