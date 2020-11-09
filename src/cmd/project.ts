import { Command } from 'commander';
import { list } from '../actions/project';
import { error, handleAPIError } from '../utilities';
import { printTable } from 'console-table-printer';

const applyCommand = (program: Command) => {
    const command = new Command('project');

    command.description('project actions');

    command
        .command('list')
        .option('--organization <id>', 'Filter by organization')
        .description('list available projects')
        .action(async (cmd: Command) => {
            const organization = cmd.organization;
            const parent = cmd.parent;
            const accessToken = parent.parent.accessToken;
            const basePath = parent.parent.apiUrl;

            try {
                const projects = await list(accessToken, basePath, {
                    organizationId: organization
                });

                if (!projects || projects.length === 0) {
                    error('No projects were found!');
                    return;
                }

                printTable(projects);
            } catch (err) {
                handleAPIError(err);
                return;
            }
        });

    program.addCommand(command);
};

export default applyCommand;
