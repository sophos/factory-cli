import { join } from 'path';

import { Command } from 'commander';

import { create, run, findOrCreateRevision } from '../actions/revision';
import { error, handleAPIError, log } from '../utilities';
import { waitForRun } from '../waitForRun';
import { printTable } from 'console-table-printer';

const REFACTR_CI_FILE = '.refactr-ci.yml';

const applyCommand = (program: Command) => {
    const command = new Command('revision');

    command.description('Pipeline revision actions');
    command.requiredOption('-p, --project <id>', 'project id');
    command.requiredOption('-P, --pipeline <id>', 'pipeline id');
    command.option(
        '-c, --config-path <path>',
        '',
        join(process.cwd(), REFACTR_CI_FILE)
    );

    command
        .command('create')
        .description('create a new pipeline revision from file')
        .action(async (cmd: Command) => {
            const parent = cmd.parent;
            const configPath = parent.configPath;
            const projectId = parent.project;
            const pipelineId = parent.pipeline;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;

            try {
                const pipelineRevision = await create(
                    configPath,
                    projectId,
                    pipelineId,
                    accessToken,
                    basePath
                );

                printTable([pipelineRevision]);
            } catch (err) {
                handleAPIError(err);
                return;
            }
        });

    program.addCommand(command);

    command
        .command('run')
        .description('executes pipeline revision')
        .option('--revision <num>', 'Revision number')
        .option('--wait', 'Wait until the job run is finished', false)
        .option('--suppress-outputs', 'Suppress output', false)
        .option('--suppress-events', 'Suppress events', false)
        .option('--suppress-variables', 'Suppress variables', false)
        .option('--variables <vars>', 'Run variables')
        .action(async (cmd: Command) => {
            const parent = cmd.parent;
            const configPath = parent.configPath;
            const projectId = parent.project;
            const pipelineId = parent.pipeline;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;

            let revision = cmd.revision;
            const variables = cmd.variables;
            const waitUntilFinished = cmd.wait;
            const suppressOutputs = cmd.suppressOutputs;
            const suppressVariables = cmd.suppressVariables;
            const suppressEvents = cmd.suppressEvents;

            if (typeof revision === 'undefined') {
                const result = await findOrCreateRevision(
                    configPath,
                    projectId,
                    pipelineId,
                    accessToken,
                    basePath
                );

                if (typeof result === 'undefined') {
                    return;
                }

                revision = result.revision;
            }

            let vars;
            if (typeof variables === 'string') {
                try {
                    vars = JSON.parse(variables);
                } catch (err) {
                    throw new Error(
                        'Variables must be valid JSON object string!'
                    );
                }
            }

            let runId;
            try {
                const result = await run(
                    revision,
                    projectId,
                    pipelineId,
                    accessToken,
                    basePath,
                    {
                        suppressOutputs,
                        suppressVariables,
                        suppressEvents,
                        variables: vars
                    }
                );
                runId = result.id;
            } catch (err) {
                handleAPIError(err);
                return;
            }

            if (!runId) {
                error('Unable to schedule a run!');
                return;
            } else {
                log(runId);
            }

            if (waitUntilFinished) {
                await waitForRun(projectId, runId, basePath, accessToken);
            }
        });
};

export default applyCommand;
