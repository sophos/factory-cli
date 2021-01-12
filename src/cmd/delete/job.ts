import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  jobId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, jobId }) => {
    const api = apiClient.jobs;

    await api.deleteJob(projectId, jobId);

    return createCommandResult('view', { _id: jobId }, ['_id']);
  }
);
