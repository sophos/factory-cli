import fields from '../../fields';

import { createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId: string;
};

export default handler(async (apiClient, { organizationId }: Arguments) => {
  const api = apiClient.runnerManagers;

  const { data } = await api.listOrganizationRunnerManagers(organizationId);
  const list = data?.runner_managers ?? [];

  return createCommandResult('view', list, fields.runner);
});
