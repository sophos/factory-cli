import isNil from 'lodash/isNil';
import fields from '../../fields';

import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId?: string;
  organizationId?: string;
};

export default handler(
  async (apiClient, { projectId, organizationId }: Arguments) => {
    const api = apiClient.runners;

    const { data } = isNil(projectId)
      ? // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        await api.listOrganizationRunnerAgents(organizationId!)
      : await api.listProjectRunnerAgents(projectId);
    const list = data?.runner_agents ?? [];

    return createCommandResult('view', list, fields.runner);
  }
);
