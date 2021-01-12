import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  name: string;
  description?: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, name, description }): Promise<any> => {
    const api = apiClient.pipelines;
    const { data: pipeline } = await api.createPipeline(projectId, {
      name,
      description
    });

    return createCommandResult('view', pipeline, ['_id']);
  }
);
