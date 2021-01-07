import isNil from 'lodash/isNil';

import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId?: string;
};

export default handler(
  async (apiClient, { organizationId }: Arguments = {}) => {
    const api = apiClient.projects;

    const { data } = !isNil(organizationId)
      ? await api.listOrganizationProjects(organizationId)
      : await api.listProjects();

    // @ts-expect-error: incorrect typings by `@refactr/api-client`.
    const list = data?.projects ?? [];

    return createCommandResult('view', list, fields.project);
  }
);
