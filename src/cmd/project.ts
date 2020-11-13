import { Command } from 'commander';
import { list } from '../actions/project';

const applyCommand = (program: Command) => {
    const command = new Command('project');

    command.description('project actions');

    command
        .command('list')
        .option('--organization <id>', 'Filter by organization')
        .description('list available projects')
        .action((cmd: Command) => {
            const organization = cmd.organization;
            const parent = cmd.parent;
            const accessToken = parent.parent.getAccessToken();
            const basePath = parent.parent.apiUrl;

            return list(accessToken, basePath, {
                organizationId: organization
            });
        });

    program.addCommand(command);
};

export default applyCommand;
