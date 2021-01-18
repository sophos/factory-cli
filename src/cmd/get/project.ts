import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId }): Promise<any> => {
    const api = apiClient.projects;
    const { data: project } = await api.getProject(projectId);

    return createCommandResult('view', project, fields.project);
  }
);
