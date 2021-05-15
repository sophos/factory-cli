import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  sort?: 'modified_asc' | 'modified_desc' | 'name_asc' | 'name_desc';
  limit?: number;
  offset?: number;
  search?: string;
};

export default handler(
  async (apiClient, { projectId, sort, limit, offset, search }: Arguments) => {
    const api = apiClient.pipelines;

    const { data } = await api.listPipelines(
      projectId,
      sort,
      limit,
      offset,
      search
    );
    const list = data?.pipelines ?? [];

    return createCommandResult('view', list, fields.pipeline);
  }
);
