import Yargs from 'yargs';
import { readStdin } from '../util/io';
import isNil from 'lodash/isNil';
import { coerceRunPipelineVariables } from './coercers';

export default (yargs: Yargs.Argv) =>
  yargs.command('run', 'Execute pipeline or job', (yargs) =>
    yargs
      .option('wait', {
        describe: 'Wait until run execution is finished',
        type: 'boolean'
      })
      .option('suppress-events', {
        describe: 'Suppress run events during pipeline or job run',
        type: 'boolean'
      })
      .option('suppress-outputs', {
        describe: 'Suppress outputs during pipeline or job run',
        type: 'boolean'
      })
      .option('suppress-variables', {
        describe: 'Suppress variables during pipeline or job run',
        type: 'boolean'
      })
      .option('var', {
        describe:
          'Pipeline variable in `key:value` format. The value must be valid JSON data.',
        type: 'string',
        requiresArg: true,
        coerce: coerceRunPipelineVariables
      })
      .command('job [job-id]', 'Executes specified job', (yargs) =>
        yargs
          .positional('job-id', {
            describe: 'ID of the job to be run',
            type: 'string',
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
            demandOption: true
          })
      )
      .command(
        'pipeline [pipeline-id]',
        'Executes specified pipeline',
        (yargs) =>
          yargs
            .option('project-id', {
              describe: 'ID of the project containing the pipeline',
              type: 'string',
              demandOption: true
            })
            .positional('pipeline-id', {
              describe: 'ID of the pipeline to be executed',
              type: 'string',
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
            .option('revision-id', {
              describe: 'ID of the pipeline revision to be executed',
              type: 'string',
              demandOption: true,
              requiresArg: true
            })
            .strict()
      )
      .demandCommand(1, 'Command must be specified.')
      .strict()
  );
