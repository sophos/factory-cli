import type Client from '../../client';
import { createCommandResult, handler, CommandResult } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
};

export default handler<any, Arguments>(
  async (apiClient: Client, { projectId }): Promise<CommandResult<any>> => {
    const api = apiClient.jobs;

    const { data } = await api.listJobs(projectId);
    const list = data?.jobs ?? [];

    return createCommandResult('view', list, fields.job);
  }
);
