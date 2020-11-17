import { Command } from 'commander';
import { get } from '../actions/run';

const applyCommand = (program: Command) => {
    const command = new Command('run');

    command.description('Commands to view runs.');  // TODO: update once functionality expands

    command.requiredOption('-p, --project <id>', 'project id');
    command
        .command('get <id>')
        .description('Retrieve data about a run')
        .action((runId: string, cmd: Command) => {
            const parent = cmd.parent;
            const projectId = parent.project;
            const accessToken = parent.parent.accessToken ?? process.env.REFACTR_AUTH_TOKEN;
            if (!accessToken) {
                throw new Error('Auth token is required.');
            }
            const basePath = parent.parent.apiUrl;

            return get(projectId, runId, accessToken, basePath);
        });

    program.addCommand(command);
};

export default applyCommand;
