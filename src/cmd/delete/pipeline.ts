import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  pipelineId: string;
};

export default handler(
  async (apiClient, { projectId, pipelineId }: Arguments) => {
    const api = apiClient.pipelines;

    await api.deletePipeline(projectId, pipelineId);

    return createCommandResult('view', { _id: pipelineId }, ['_id']);
  }
);
