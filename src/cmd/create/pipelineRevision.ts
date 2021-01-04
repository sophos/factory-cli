import { createCommandResult, handler } from '../handler';
import fields from '../../fields';
import type Client from '../../client';

type Arguments = {
  projectId: string;
  inputFile?: string;
  input?: { [key: string]: any };
};

export default handler<Arguments, any>(
  async (apiClient: Client, { projectId, input }): Promise<any> => {
    const api = apiClient.pipelines;
    const { data: pipeline } = await api.createPipeline(projectId, {});
    const { data: pipelineRevision } = await api.createPipelineRevision(
      pipeline.projectId,
      pipeline._id,
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
