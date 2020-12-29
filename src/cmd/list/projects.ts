import isNil from 'lodash/isNil';

import type Client from '../../client';
import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId?: string;
};

export default handler(
  async (apiClient: Client, { organizationId }: Arguments = {}) => {
    const api = apiClient.projects;

    const { data } = !isNil(organizationId)
      ? await api.listOrganizationProjects(organizationId)
      : await api.listProjects();
    const list = data?.projects ?? [];

    return createCommandResult('view', list, fields.project);
  }
);
