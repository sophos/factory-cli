import isNil from 'lodash/isNil';

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
    let result = { pipeline_id: pipeline._id };
    const isWithPipelineRevision = !isNil(input);

    if (isWithPipelineRevision) {
      const { data: pipelineRevision } = await api.createPipelineRevision(
        projectId,
        pipeline._id!,
        {
          ...input
        }
      );

      // @ts-expect-error: incorrect types from @refactr/api-client,
      //                   see gh:refactr/refactr-api-client#12
      result = { ...result, ...pipelineRevision };
    }

    return createCommandResult(
      'view',
      result,
      isWithPipelineRevision ? fields.pipelineRevision : ['_id']
    );
  }
);
