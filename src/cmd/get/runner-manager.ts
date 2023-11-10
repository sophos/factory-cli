import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId: string;
  runnerManagerId: string;
};

export default handler(
  async (apiClient, { organizationId, runnerManagerId }: Arguments) => {
    const api = apiClient.runnerManagers;
    const { data: run } = await api.getRunnerManager(
      organizationId,
      runnerManagerId
    );

    return createCommandResult('view', run, fields.runner);
  }
);
