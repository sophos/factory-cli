import { createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId: string;
  runnerManagerId: string;
};

export default handler(
  async (apiClient, { organizationId, runnerManagerId }: Arguments) => {
    const api = apiClient.runnerManagers;

    await api.deleteRunnerManager(organizationId, runnerManagerId);

    return createCommandResult('view', { _id: runnerManagerId }, ['_id']);
  }
);
