import { createCommandResult, handler } from '../handler';

type Arguments = {
  organizationId: string;
  name: string;
};

export default handler(
  async (apiClient, { organizationId, name }: Arguments) => {
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
