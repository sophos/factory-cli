import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  inputFile?: string;
  input?: { [key: string]: unknown };
};

export default handler(
  async (apiClient, { projectId, pipelineId, input }: Arguments) => {
    const api = apiClient.pipelines;

    const { data: pipelineRevision } = await api.createPipelineRevision(
      projectId,
      pipelineId,
      {
        ...input
      }
    );

    return createCommandResult(
      'view',
      pipelineRevision,
      fields.pipelineRevision
    );
  }
);
