import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
};

export default handler(async (apiClient, { projectId }: Arguments) => {
  const api = apiClient.projects;
  const { data: project } = await api.getProject(projectId);

  return createCommandResult('view', project, fields.project);
});
