import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  revision: number;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, pipelineId, revision }) => {
    console.info(projectId, pipelineId, revision);

    const api = apiClient.pipelines;
    const { data: run } = await api.getPipelineRevision(
      projectId,
      pipelineId,
      revision
    );

    return createCommandResult('view', run, fields.pipelineRevision);
  }
);
