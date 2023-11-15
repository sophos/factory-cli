import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId: string;
  runnerPoolId: string;
};

export default handler(
  async (apiClient, { organizationId, runnerPoolId }: Arguments) => {
    const api = apiClient.runnerManagers;
    const { data: run } = await api.getRunnerManager(
      organizationId,
      runnerPoolId
    );

    return createCommandResult('view', run, fields.runnerPool);
  }
);
