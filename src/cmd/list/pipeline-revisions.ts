import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, pipelineId }) => {
    const api = apiClient.pipelines;

    const { data } = await api.getPipelineRevisions(projectId, pipelineId);
    const list = data?.pipeline_revisions ?? [];

    return createCommandResult('view', list, fields.pipelineRevision);
  }
);
