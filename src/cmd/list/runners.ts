import isNil from 'lodash/isNil';

import { createCommandResult, handler, CommandResult } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId?: string;
  organizationId?: string;
};

export default handler<any, Arguments>(
  async (
    apiClient,
    { projectId, organizationId }
  ): Promise<CommandResult<any>> => {
    const api = apiClient.runners;

    const { data } = isNil(projectId)
      ? await api.listOrganizationRunnerAgents(organizationId)
      : await api.listProjectRunnerAgents(projectId);
    const list = data?.runner_agents ?? [];

    return createCommandResult('view', list, fields.runner);
  }
);
