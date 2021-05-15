import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
};

export default handler(async (apiClient, { projectId }: Arguments) => {
  const api = apiClient.jobs;

  const { data } = await api.listJobs(projectId);
  const list = data?.jobs ?? [];

  return createCommandResult('view', list, fields.job);
});
