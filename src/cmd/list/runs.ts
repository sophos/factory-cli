import type Client from '../../client';
import { createCommandResult, handler, CommandResult } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  pipelineId?: string;
  jobId?: string;
};

export default handler<any, Arguments>(
  async (
    apiClient: Client,
    { projectId, pipelineId, jobId }
  ): Promise<CommandResult<any>> => {
    const api = apiClient.runs;

    const { data } = await api.listProjectRuns(projectId, pipelineId, jobId);
    const list = data?.runs ?? [];

    return createCommandResult('view', list, fields.run);
  }
);
