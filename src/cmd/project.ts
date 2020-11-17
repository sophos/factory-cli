import { resolve } from 'path';
import { writeFileSync } from 'fs';

import { Command } from 'commander';

import { list } from '../actions/project';
import { format } from '../utils/print';

const applyCommand = (program: Command) => {
    const command = new Command('project');

    command.description('Commands to view and modify projects.');

    command
        .command('list')
        .option('--organization <id>', 'Filter by organization')
        .description('List projects. If --organization is provided, the list is filtered by the organization ID.')
        .option('--format', 'output format', 'json')
        .option('--out-file', 'output file path')
        .action(async (cmd: Command) => {
            const organization = cmd.organization;
            const parent = cmd.parent;
            const accessToken = parent.parent.accessToken ?? process.env.REFACTR_AUTH_TOKEN;
            if (!accessToken) {
                throw new Error('Auth token is required.');
            };
            const basePath = parent.parent.apiUrl;

            const { data } = await list(accessToken, basePath, {
                organizationId: organization
            });

            const formatted = format(
                cmd.format,
                data.projects.map(({ _id, name, organization_id }) => ({
                    id: _id,
                    name,
                    organization_id
                }))
            );
            if (cmd.outFile) {
                const outputPath = resolve(cmd.outFile);
                writeFileSync(outputPath, formatted, 'utf8');
            } else {
                console.log(formatted);
            }
        });

    program.addCommand(command);
};

export default applyCommand;
