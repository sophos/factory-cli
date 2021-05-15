import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  revisionId: string;
};

export default handler(
  async (apiClient, { projectId, pipelineId, revisionId }: Arguments) => {
    const api = apiClient.pipelines;
    const { data: pipelineRevision } = await api.getPipelineRevision(
      projectId,
      pipelineId,
      revisionId
    );

    return createCommandResult(
      'view',
      pipelineRevision,
      fields.pipelineRevision
    );
  }
);
