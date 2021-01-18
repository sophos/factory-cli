import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  revision: number;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, pipelineId, revision }) => {
    const api = apiClient.pipelines;
    const { data: pipelineRevision } = await api.getPipelineRevision(
      projectId,
      pipelineId,
      revision
    );

    return createCommandResult(
      'view',
      pipelineRevision,
      fields.pipelineRevision
    );
  }
);
