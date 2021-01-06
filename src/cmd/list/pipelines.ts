import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  sort?: 'modified_asc' | 'modified_desc' | 'name_asc' | 'name_desc';
  limit?: number;
  offset?: number;
  search?: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, sort, limit, offset, search }) => {
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
