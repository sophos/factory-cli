import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId: string;
  runnerId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { organizationId, runnerId }) => {
    const api = apiClient.runners;
    const { data: run } = await api.getRunnerAgent(organizationId, runnerId);

    return createCommandResult('view', run, fields.runner);
  }
);
