import isNil from 'lodash/isNil';

import fields from '../../fields';
import { createCommandResult, handler } from '../handler';
import { SharedArguments } from './shared-arguments';

type Arguments = SharedArguments & {
  organizationId?: string;
  sort?: 'modified_asc' | 'modified_desc' | 'name_asc' | 'name_desc';
};

export default handler(
  async (
    apiClient,
    { organizationId, offset, limit, sort }: Arguments = {}
  ) => {
    const api = apiClient.projects;

    const { data } = !isNil(organizationId)
      ? await api.listOrganizationProjects(
          organizationId,
          sort,
          void 0,
          offset,
          limit
        )
      : await api.listProjects(sort, void 0, limit, offset);
    const list = data?.projects ?? [];

    return createCommandResult('view', list, fields.project);
  }
);
