import isNil from 'lodash/isNil';
import fields from '../../fields';

import { createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId?: string;
};

export default handler(
  async (apiClient, { organizationId }: Arguments = {}) => {
    const api = apiClient.projects;

    const { data } = !isNil(organizationId)
      ? await api.listOrganizationProjects(organizationId)
      : await api.listProjects();
    const list = data?.projects ?? [];

    return createCommandResult('view', list, fields.project);
  }
);
