import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  name: string;
  description?: string;
  summary?: string;
};

export default handler<Arguments, any>(
  async (
    apiClient,
    { projectId, name, description, summary }
  ): Promise<any> => {
    const api = apiClient.pipelines;
    const { data: pipeline } = await api.createPipeline(projectId, {
      name,
      description,
      summary
    });

    return createCommandResult('view', pipeline, ['_id']);
  }
);
