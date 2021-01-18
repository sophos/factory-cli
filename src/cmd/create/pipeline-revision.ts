import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId: string;
  inputFile?: string;
  input?: { [key: string]: any };
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, pipelineId, input }) => {
    const api = apiClient.pipelines;

    const { data: pipelineRevision } = await api.createPipelineRevision(
      projectId,
      pipelineId,
      {
        ...input,
      }
    );

    return createCommandResult(
      'view',
      pipelineRevision,
      fields.pipelineRevision
    );
  }
);
