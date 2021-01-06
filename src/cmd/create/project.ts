import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  organizationId: string;
  name: string;
};

export default handler<Arguments, any>(
  async (apiClient, { organizationId, name }) => {
    const api = apiClient.projects;

    const { data: project } = await api.createOrganizationProject(
      organizationId,
      {
        name
      }
    );

    return createCommandResult('view', project, ['_id']);
  }
);
