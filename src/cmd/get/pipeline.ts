import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, pipelineId }) => {
    const api = apiClient.pipelines;
    const { data: pipeline } = await api.getPipeline(projectId, pipelineId);

    return createCommandResult('view', pipeline, fields.pipeline);
  }
);
