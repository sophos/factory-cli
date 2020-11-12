import { Command } from 'commander';
import { list } from '../actions/project';

const applyCommand = (program: Command) => {
    const command = new Command('project');

    command.description('Commands to view and modify projects.');

    command
        .command('list')
        .option('--organization <id>', 'Filter by organization')
        .description('List projects. If --organization is provided, the list is filtered by the organization ID.')
        .action((cmd: Command) => {
            const organization = cmd.organization;
            const parent = cmd.parent;
            const accessToken = parent.parent.accessToken ?? process.env.REFACTR_AUTH_TOKEN;
            if (!accessToken) {
                throw new Error('Auth token is required.');
            };
            const basePath = parent.parent.apiUrl;

            return list(accessToken, basePath, {
                organizationId: organization
            });
        });

    program.addCommand(command);
};

export default applyCommand;
