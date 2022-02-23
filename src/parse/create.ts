import Yargs from 'yargs';
import isNil from 'lodash/isNil';

import { readStdin } from '../util/io';
import { CREDENTIAL_TYPES } from '../credential-type';
import { JOB_TRIGGER_TYPE } from '../job-trigger-type';
import {
  coercePipelineCreateInput,
  coerceRunPipelineVariables
} from './coercers';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (yargs: Yargs.Argv) =>
  yargs.command('create', 'Create specified resource', (yargs) =>
    yargs
      .command('project', 'Create a new project', (yargs) =>
        yargs
          .option('organization-id', {
            describe:
              'ID of organization under which the project will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the project',
            type: 'string',
            requiresArg: true,
            demandOption: true
          })
      )
      .command(
        'pipeline-revision [input]',
        'Create a new pipeline-revision',
        (yargs) =>
          yargs
            .positional('input', {
              description:
                'Pipeline workflow configuration. The configuration must be provided either in YAML or JSON formats. ' +
                'If supplied argument is starting with at symbol (`@`) argument is treated as path to configuration file.',
              coerce: coercePipelineCreateInput
            })
            .default('input', () => readStdin(), 'read from stdin')
            .check((argv) => {
              if (isNil(argv.input)) {
                throw new Error('Input data must be provided');
              }

              return true;
            }, false)
            .option('project-id', {
              describe: 'ID of the project containing the pipeline',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
            .option('pipeline-id', {
              describe: 'ID of the pipeline for the pipeline-revision',
              demandOption: true,
              requiresArg: true
            })
      )
      .command('pipeline [options]', 'Creates a new pipeline', (yargs) =>
        yargs
          .usage(
            '$0 pipeline --project-id <project-id> --name <name> [options]'
          )
          .option('project-id', {
            describe: 'ID of the project under which pipeline will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the pipeline',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('description', {
            describe: 'Description of the pipeline',
            type: 'string',
            requiresArg: true
          })
          .option('summary', {
            describe: 'Summary of the pipeline',
            type: 'string',
            requiresArg: true
          })
      )
      .command('credential', 'Create a new credential', (yargs) =>
        yargs
          .option('project-id', {
            describe:
              'ID of the project under which the credential will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the credential',
            type: 'string',
            requiresArg: true,
            demandOption: true
          })
          .option('data', {
            describe: 'Credential data. Must be valid JSON value.',
            type: 'string',
            requiresArg: true,
            demandOption: true,
            hidden: true
          })

          // username_password
          .option('data.username', {
            describe: 'Username for "username_password" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('data.password', {
            describe: 'Password for "username_password" credential type',
            type: 'string',
            requiresArg: true
          })

          // api_token
          .option('data.token', {
            describe: 'API token for "api_token" credential type',
            type: 'string',
            requiresArg: true
          })

          // aws_access_key
          .option('data.access-key', {
            describe: 'Access key for "aws_access_key" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('data.secret-key', {
            describe: 'Secret key for "aws_access_key" credential type',
            type: 'string',
            requiresArg: true
          })

          // azure_service_principal
          .option('data.subscription-id', {
            describe:
              'Subscription ID for "azure_service_principal" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('data.domain', {
            describe: 'Domain for "azure_service_principal" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('data.client-id', {
            describe: 'Client ID for "azure_service_principal" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('data.client-key', {
            describe:
              'Client key for "azure_service_principal" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('data.tenant-id', {
            describe:
              'Domain key for "azure_service_principal" credential type',
            type: 'string',
            requiresArg: true
          })

          // google_service_account
          .option('data.json', {
            describe: 'JSON key for "google_service_account" credential type',
            type: 'string',
            requiresArg: true
          })

          // vault_app_role
          .option('data.role-id', {
            describe: 'Role ID for "vault_app_role" credential type',
            requiresArg: true
          })
          .option('data.secret-id', {
            describe: 'Secret ID for "vault_app_role" credential type',
            requiresArg: true
          })

          // ssh_key
          .option('data.private-key', {
            describe: 'SSH key for "ssh_key" credential type',
            type: 'string',
            requiresArg: true
          })

          // bearer token
          .option('data.token', {
            describe: 'Token for "bearer_token" credential type',
            type: 'string',
            requiresArg: true
          })

          // generic
          .option('data.text', {
            describe: 'Text for "generic" credential type',
            type: 'string',
            requiresArg: true
          })
          .option('id', {
            describe: 'Credential reference id',
            requiresArg: true,
            demandOption: true
          })
          .option('type', {
            describe: 'Credential type',
            requiresArg: true,
            demandOption: true,
            choices: CREDENTIAL_TYPES
          })
      )
      .command('job', 'Create a new job', (yargs) =>
        yargs
          .option('project-id', {
            describe: 'ID of the project under which job will be created',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('pipeline-id', {
            type: 'string',
            describe: 'ID of the pipeline from which job will be created',
            demandOption: true,
            requiresArg: true
          })
          .option('revision-id', {
            describe: 'ID of the pipeline revision',
            demandOption: true,
            type: 'string',
            requiresArg: true
          })
          .option('name', {
            describe: 'Name of the job',
            type: 'string',
            demandOption: true,
            requiresArg: true
          })
          .option('type', {
            describe: 'Trigger type of the job',
            choices: JOB_TRIGGER_TYPE,
            demandOption: true,
            requiresArg: true
          })
          .option('var', {
            describe:
              'Pipeline variable in `key:value` format, where value is JSON data or valid JSON object.',
            type: 'string',
            requiresArg: true,
            coerce: coerceRunPipelineVariables
          })
          .option('schedule', { hidden: true })
          .option('schedule.start-day', {
            type: 'string',
            requiresArg: true
          })
          .option('schedule.start-time', {
            type: 'string',
            requiresArg: true
          })
          .option('schedule.offset', {
            type: 'string',
            requiresArg: true
          })
          .option('schedule.interval', {
            type: 'number',
            requiresArg: true
          })
          .option('schedule.interval-type', {
            choices: ['minute', 'hour', 'day', 'week', 'month'],
            requiresArg: true
          })
          .option('suppress-events', {
            describe: 'Suppress run events during job run',
            type: 'boolean',
            default: false
          })
          .option('suppress-outputs', {
            describe: 'Suppress outputs during job run',
            type: 'boolean',
            default: false
          })
          .option('suppress-variables', {
            describe: 'Suppress variables during job run',
            type: 'boolean',
            default: false
          })
          .option('disable-on-failure', {
            describe: 'Specifies whether job will be disabled on failed run',
            type: 'boolean',
            default: false
          })
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
