import { createCommandResult, CommandHandler, handler } from '../handler';
import fields from '../../fields';
import type Client from '../../client';

type Arguments = {
  projectId: string;
};

export default handler<Arguments, any>(
  async (apiClient: Client, { projectId }): Promise<any> => {
    const api = apiClient.projects;
    const { data: project } = await api.getProject(projectId);

    return createCommandResult('view', project, fields.project);
  }
);
