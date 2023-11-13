import { isNil } from 'lodash';

import { RunnerAgent } from '@sophos-factory/api-client/types/generated/api';

import fields from '../../fields';

import { CommandResult, createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId?: string;
  projectId?: string;
};

export default handler(
  async (
    apiClient,
    { projectId, organizationId }: Arguments
  ): Promise<CommandResult<RunnerAgent[]>> => {
    const api = apiClient.agents;

    if (!isNil(organizationId)) {
      return await getOrganizationRunnerAgents(api, organizationId);
    }

    if (!isNil(projectId)) {
      return await getProjectRunnerAgents(api, projectId);
    }

    // Neither organizationId nor projectId was passed. Error!
    throw new Error(
      'Missing parameter: Either Organization Id or Project Id must be provided.'
    );

    async function getOrganizationRunnerAgents(
      agentApi: typeof api,
      organizationId: string
    ) {
      const { data } = await agentApi.listOrganizationRunnerAgents(
        organizationId
      );
      const list = data?.runner_agents ?? [];
      return createCommandResult('view', list, fields.runnerAgent);
    }

    async function getProjectRunnerAgents(
      agentApi: typeof api,
      projectId: string
    ) {
      const { data } = await agentApi.listProjectRunnerAgents(projectId);
      const list = data?.runner_agents ?? [];
      return createCommandResult('view', list, fields.runnerAgent);
    }
  }
);
