import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId: string;
  runnerId: string;
};

export default handler(
  async (apiClient, { organizationId, runnerId }: Arguments) => {
    const api = apiClient.agents;
    const { data: run } = await api.getRunnerAgent(organizationId, runnerId);

    return createCommandResult('view', run, fields.runnerAgent);
  }
);
