import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  jobId: string;
};

export default handler(async (apiClient, { projectId, jobId }: Arguments) => {
  const api = apiClient.jobs;
  const { data: job } = await api.getJob(projectId, jobId);

  return createCommandResult('view', job, fields.job);
});
