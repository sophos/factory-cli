import { SharedArguments } from './shared-arguments';
import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = SharedArguments & {
  projectId: string;
  sort?: 'modified_asc' | 'modified_desc' | 'name_asc' | 'name_desc';
};

export default handler(
  async (apiClient, { projectId, sort, limit, offset }: Arguments) => {
    const api = apiClient.pipelines;

    const { data } = await api.listPipelines(projectId, sort, limit, offset);
    const list = data?.pipelines ?? [];

    return createCommandResult('view', list, fields.pipeline);
  }
);
