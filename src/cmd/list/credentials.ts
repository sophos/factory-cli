import { createCommandResult, handler, CommandResult } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  type?: string;
  sort?: 'created_asc' | 'created_desc';
  limit?: number;
  offset?: number;
};

export default handler<any, Arguments>(
  async (
    apiClient,
    { projectId, type, sort, limit, offset }
  ): Promise<CommandResult<any>> => {
    const api = apiClient.credentials;

    const { data } = await api.listCredentials(
      projectId,
      type,
      sort,
      offset,
      limit
    );

    // @ts-expect-error: invalid types from `@refactr/api-client`.
    const list = data?.credentials ?? [];

    return createCommandResult('view', list, fields.credential);
  }
);
