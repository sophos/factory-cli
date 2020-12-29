import { createCommandResult, CommandHandler, handler } from '../handler';
import fields from '../../fields';
import type Client from '../../client';

type Arguments = {
  organizationId?: string;
};

export default handler<Arguments, any>(
  async (apiClient: Client, { organizationId }) => {
    const api = apiClient.organizations;
    const { data: organization } = await api.getOrganization(organizationId);

    return createCommandResult('view', organization, fields.organization);
  }
);
