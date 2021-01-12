import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  pipelineId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, pipelineId }) => {
    const api = apiClient.pipelines;

    await api.deletePipeline(projectId, pipelineId);

    return createCommandResult('view', { _id: pipelineId }, ['_id']);
  }
);
