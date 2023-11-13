import Yargs from 'yargs';
import { readStdin } from '../util/io';
import isNil from 'lodash/isNil';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (yargs: Yargs.Argv) =>
  yargs.command('delete', 'Delete specified resource', (yargs) =>
    yargs
      .command('credential [credential-id]', 'Delete a credential', (yargs) =>
        yargs
          .positional('credential-id', {
            describe: 'ID of the credential to deleted',
            type: 'string',
            required: true,
            demandOption: true
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
      .command('job [job-id]', 'Delete a job', (yargs) =>
        yargs
          .positional('job', {
            describe: 'ID of the job to delete',
            type: 'string',
            required: true,
            demandOption: true
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
      .command('pipeline [pipeline-id]', 'Delete a pipeline', (yargs) =>
        yargs
          .positional('pipeline-id', {
            describe: 'ID of the pipeline to delete',
            type: 'string',
            required: true,
            demandOption: true
          })
          .default('pipeline-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.pipelineId)) {
              throw new Error('Pipeline ID must be provided');
            }

            return true;
          }, false)
          .option('project-id', {
            describe: 'ID of the project containing the pipeline',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
      )
      .command('project [project-id]', 'Delete a project', (yargs) =>
        yargs
          .positional('project-id', {
            describe: 'ID of the project to delete',
            type: 'string',
            required: true,
            demandOption: true
          })
          .default('project-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.projectId)) {
              throw new Error('Project ID must be provided');
            }

            return true;
          }, false)
      )
      .command('runner [runner-id]', 'Delete a runner', (yargs) =>
        yargs
          .positional('runner-id', {
            describe: 'ID of the runner to delete',
            type: 'string',
            required: true,
            demandOption: true
          })
          .default('runner-id', () => readStdin(), 'read from stdin')
          .check((argv) => {
            if (isNil(argv.runnerPoolId)) {
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
      .command(
        'runner-pool [runner-pool-id]',
        'Delete a runner pool',
        (yargs) =>
          yargs
            .positional('runner-pool-id', {
              describe: 'ID of the runner pool to delete',
              type: 'string',
              required: true,
              demandOption: true
            })
            .default('runner-pool-id', () => readStdin(), 'read from stdin')
            .check((argv) => {
              if (isNil(argv.runnerPoolId)) {
                throw new Error('Runner Pool ID must be provided');
              }

              return true;
            }, false)
            .option('organization-id', {
              describe: 'ID of the organization containing the runner pool',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
