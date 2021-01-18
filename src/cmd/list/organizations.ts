import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {};

export default handler<Arguments, any>(async (apiClient) => {
  const api = apiClient.organizations;

  const { data } = await api.listOrganizations();
  const organizations = data?.organizations ?? [];

  return createCommandResult('view', organizations, fields.organization);
});
