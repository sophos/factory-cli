import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  name: string;
  description?: string;
  input?: { [key: string]: any };
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, input, name, description }): Promise<any> => {
    const api = apiClient.pipelines;
    const { data: pipeline } = await api.createPipeline(projectId, {
      name,
      description
    });
    const { data: pipelineRevision } = await api.createPipelineRevision(
      projectId,
      pipeline._id!,
      {
        ...input
      }
    );

    return createCommandResult(
      'view',

      // @ts-expect-error: incorrect types from @refactr/api-client,
      //                   see gh:refactr/refactr-api-client#12
      { pipeline_id: pipeline._id, ...pipelineRevision },
      fields.pipelineRevision
    );
  }
);
