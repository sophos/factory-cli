import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

export default handler(async (apiClient) => {
  const api = apiClient.organizations;

  const { data } = await api.listOrganizations();
  const organizations = data?.organizations ?? [];

  return createCommandResult('view', organizations, fields.organization);
});
