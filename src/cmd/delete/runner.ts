import { createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId: string;
  runnerAgentId: string;
};

export default handler(
  async (apiClient, { organizationId, runnerAgentId }: Arguments) => {
    const api = apiClient.agents;

    await api.deleteRunnerAgent(organizationId, runnerAgentId);

    return createCommandResult('view', { _id: runnerAgentId }, ['_id']);
  }
);
