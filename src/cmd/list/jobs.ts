import fields from '../../fields';
import { createCommandResult, handler } from '../handler';
import { SharedArguments } from './shared-arguments';

type Arguments = SharedArguments & {
  projectId: string;
  sort?: 'created_asc' | 'created_desc' | 'last_run_asc' | 'last_run_desc';
};

export default handler(
  async (apiClient, { projectId, limit, offset, sort }: Arguments) => {
    const api = apiClient.jobs;

    const { data } = await api.listJobs(projectId, sort, limit, offset);
    const list = data?.jobs ?? [];

    return createCommandResult('view', list, fields.job);
  }
);
