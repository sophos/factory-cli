import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
};

export default handler<Arguments, any>(async (apiClient, { projectId }) => {
  const api = apiClient.projects;

  await api.deleteProject(projectId);

  return createCommandResult('view', { _id: projectId }, ['_id']);
});