import type Client from '../../client';
import fields from '../../fields';
import { createCommandResult, handler } from '../handler';
import { SharedArguments } from './shared-arguments';

type Arguments = SharedArguments & {
  projectId: string;
  pipelineId?: string;
  jobId?: string;
  sort?: 'created_asc' | 'created_desc';
};

export default handler(
  async (
    apiClient: Client,
    { projectId, pipelineId, jobId, sort, limit, offset }: Arguments
  ) => {
    const api = apiClient.runs;

    const { data } = await api.listProjectRuns(
      projectId,
      pipelineId,
      jobId,
      sort,
      limit,
      offset
    );
    const list = data?.runs ?? [];

    return createCommandResult('view', list, fields.run);
  }
);
