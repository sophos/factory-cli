import fields from '../../fields';
import { createCommandResult, handler } from '../handler';
import { SharedArguments } from './shared-arguments';

type Arguments = SharedArguments & {
  projectId: string;
  pipelineId: string;
};

export default handler(
  async (apiClient, { projectId, pipelineId, offset, limit }: Arguments) => {
    const api = apiClient.pipelines;

    const { data } = await api.getPipelineRevisions(
      projectId,
      pipelineId,
      void 0,
      limit,
      offset
    );
    const list = data?.pipeline_revisions ?? [];

    return createCommandResult('view', list, fields.pipelineRevision);
  }
);
