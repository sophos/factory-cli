import Yargs from 'yargs';
import isNil from 'lodash/isNil';

import { readStdin } from '../util/io';

export default (yargs: Yargs.Argv) =>
  yargs.command('get', 'Get specified resource', (yargs) =>
    yargs
      .usage('Usage: $0 get <command> [options]')
      .command(
        'credential [credential-id]',
        'Get credential details',
        (yargs) =>
          yargs
            .usage('Usage: $0 get credential <credential-id> [options]')
            .positional('credential-id', {
              type: 'string',
              describe:
                'ID of the credential to fetch. ' +
                'Unlike IDs for other resources (which are mechanically generated), ' +
                'credential ID is user-provided reference ID.',
              demandOption: true,
              requiresArg: true
            })
            .default('credential-id', () => readStdin(), 'read from stdin')
            .check((argv) => {
              if (isNil(argv.credentialId)) {
                throw new Error('Credential ID must be provided');
              }

              return true;
            }, false)
            .option('project-id', {
              describe: 'ID of the project containing the credential',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
      )
      .command('job [job-id]', 'Get job details', (yargs) =>
        yargs
          .usage('Usage: $0 get job <job-id> [options]')
          .positional('job-id', {
            type: 'string',
            describe: 'ID of the job to fetch',
            demandOption: true,
            requiresArg: true
          })
          .default('job-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.jobId)) {
              throw new Error('Job ID must be provided');
            }

            return true;
          }, false)
          .option('project-id', {
            describe: 'ID of the project containing the job',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('project [project-id]', 'Get project details', (yargs) =>
        yargs
          .usage('Usage: $0 get project <project-id> [options]')
          .positional('project-id', {
            type: 'string',
            describe: 'ID of the project to fetch',
            demandOption: true,
            requiresArg: true
          })
          .default('project-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.projectId)) {
              throw new Error('Project ID must be provided');
            }

            return true;
          }, false)
      )
      .command('pipeline [pipeline-id]', 'Get pipeline details', (yargs) =>
        yargs
          .usage('Usage: $0 get pipeline <pipeline-id> [options]')
          .positional('pipeline-id', {
            type: 'string',
            describe: 'ID of the pipeline to fetch',
            demandOption: true,
            requiresArg: true
          })
          .default('pipeline-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.pipelineId)) {
              throw new Error('Pipeline ID must be provided');
            }

            return true;
          }, false)
          .option('project-id', {
            type: 'string',
            describe: 'ID of the project to fetch',
            demandOption: true,
            requiresArg: true
          })
      )
      .command(
        'organization [organization-id]',
        'Get organization details',
        (yargs) =>
          yargs
            .usage('Usage: $0 get organization <organization-id> [options]')
            .positional('organization-id', {
              type: 'string',
              describe: 'ID of the organization to fetch',
              demandOption: true,
              requiresArg: true
            })
            .default('organization-id', () => readStdin(), 'read from stdin')
            .check((argv) => {
              if (isNil(argv.organizationId)) {
                throw new Error('Organization ID must be provided');
              }

              return true;
            }, false)
      )
      .command('run [run-id]', 'Get run details', (yargs) =>
        yargs
          .usage('Usage: $0 get run <run-id> [options]')
          .positional('run-id', {
            type: 'string',
            describe: 'ID of the run to fetch',
            demandOption: true,
            requiresArg: true
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
            demandOption: true,
            requiresArg: true
          })
      )
      .command(
        'pipeline-revision [revision]',
        'Get pipeline-revision details',
        (yargs) =>
          yargs
            .usage('Usage: $0 get pipeline-revision <revision> [options]')
            .positional('revision', {
              type: 'number',
              describe: 'Revision number of the pipeline revision to fetch',
              demandOption: true,
              requiresArg: true
            })
            .default('revision', () => readStdin(), 'read from stdin')
            .check((argv) => {
              if (isNil(argv.revision)) {
                throw new Error('Revision must be provided');
              }

              return true;
            }, false)
            .option('project-id', {
              describe: 'ID of the project containing the pipeline revision',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
            .option('pipeline-id', {
              describe: 'ID of the pipeline for the pipeline revision',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
      )
      .command('runner [runner-id]', 'Get runner details', (yargs) =>
        yargs
          .usage('Usage: $0 get runner <runner-id> [options]')
          .positional('runner-id', {
            type: 'string',
            describe: 'ID of the runner to fetch',
            demandOption: true,
            requiresArg: true
          })
          .default('runner-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.runnerId)) {
              throw new Error('Runner ID must be provided');
            }

            return true;
          }, false)
          .option('organization-id', {
            describe: 'ID of the organization containing the runner',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .demandCommand(1, 'Command must be specified')
      .strict()
  );
