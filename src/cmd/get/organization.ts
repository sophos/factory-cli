import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId: string;
};

export default handler(async (apiClient, { organizationId }: Arguments) => {
  const api = apiClient.organizations;
  const { data: organization } = await api.getPublicOrganizationById(
    organizationId
  );

  return createCommandResult('view', organization, fields.organization);
});
