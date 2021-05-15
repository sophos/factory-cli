import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
};

export default handler(
  async (apiClient, { projectId, pipelineId }: Arguments) => {
    const api = apiClient.pipelines;
    const { data: pipeline } = await api.getPipeline(projectId, pipelineId);

    return createCommandResult('view', pipeline, fields.pipeline);
  }
);
