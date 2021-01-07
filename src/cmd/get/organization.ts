import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { organizationId }) => {
    const api = apiClient.organizations;
    const { data: organization } = await api.getOrganization(organizationId);

    return createCommandResult('view', organization, fields.organization);
  }
);
