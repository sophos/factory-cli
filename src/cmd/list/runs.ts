import type Client from '../../client';
import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  pipelineId?: string;
  jobId?: string;
};

export default handler(
  async (apiClient: Client, { projectId, pipelineId, jobId }: Arguments) => {
    const api = apiClient.runs;

    const { data } = await api.listProjectRuns(projectId, pipelineId, jobId);
    const list = data?.runs ?? [];

    return createCommandResult('view', list, fields.run);
  }
);
