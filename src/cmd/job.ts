import { Command } from 'commander';
import { list, run } from '../actions/job';
import { printTable } from 'console-table-printer';
import { waitForRun } from '../waitForRun';
import { error, handleAPIError, log } from '../utilities';

const applyCommand = (program: Command) => {
    const command = new Command('job');

    command.description('job actions');

    command.requiredOption('-p, --project <id>', 'project id');
    command
        .command('list')
        .description('list available jobs')
        .action(async (cmd: Command) => {
            const parent = cmd.parent;
            const projectId = parent.project;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;

            const jobs = await list(projectId, accessToken, basePath);
            if (!jobs || jobs.length === 0) {
                error('No jobs were found!');
                return;
            }

            printTable(jobs);
        });

    command
        .command('run <id>')
        .description('create a new run for given job')
        .option('--wait', 'Wait until the job run is finished', false)
        .option('--suppress-outputs', 'Suppress output', false)
        .option('--suppress-events', 'Suppress events', false)
        .option('--suppress-variables', 'Suppress variables', false)
        .option('--variables <vars>', 'Run variables')
        .action(async (jobId: string, cmd: Command) => {
            const parent = cmd.parent;
            const projectId = parent.project;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;
            const variables = cmd.variables;
            const waitUntilFinished = cmd.wait;
            const suppressOutputs = cmd.suppressOutputs;
            const suppressVariables = cmd.suppressVariables;
            const suppressEvents = cmd.suppressEvents;

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
                    projectId,
                    jobId,
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
                error('Unable to schedule a job!');
                return;
            } else {
                log(runId);
            }

            if (waitUntilFinished) {
                await waitForRun(projectId, runId, basePath, accessToken);
            }
        });

    program.addCommand(command);
};

export default applyCommand;
