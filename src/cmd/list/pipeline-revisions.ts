import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  pipelineId: string;
};

export default handler(
  async (apiClient, { projectId, pipelineId }: Arguments) => {
    const api = apiClient.pipelines;

    const { data } = await api.getPipelineRevisions(projectId, pipelineId);
    const list = data?.pipeline_revisions ?? [];

    return createCommandResult('view', list, fields.pipelineRevision);
  }
);
