import { Command } from 'commander';
import { list, run } from '../actions/job';

const applyCommand = (program: Command) => {
    const command = new Command('job');

    command.description('job actions');

    command.requiredOption('-p, --project <id>', 'project id');
    command
        .command('list')
        .description('list available jobs')
        .action((cmd: Command) => {
            const parent = cmd.parent;
            const projectId = parent.project;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;

            return list(projectId, accessToken, basePath);
        });

    command
        .command('run <id>')
        .description('create a new run for given job')
        .option('--wait', 'wait until the job run is finished', false)
        .option('--suppress-outputs', 'Suppress output', false)
        .option('--suppress-events', 'Suppress events', false)
        .option('--suppress-variables', 'Suppress variables', false)
        .option('--variables <vars>', 'run variables')
        .action((jobId: string, cmd: Command) => {
            const parent = cmd.parent;
            const projectId = parent.project;
            const variables = parent.variables;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;
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

            return run(projectId, jobId, accessToken, basePath, {
                suppressOutputs,
                suppressVariables,
                suppressEvents,
                variables: vars,
                waitUntilFinished
            });
        });

    program.addCommand(command);
};

export default applyCommand;
