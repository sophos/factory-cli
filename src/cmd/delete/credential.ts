import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  credentialId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, credentialId }) => {
    const api = apiClient.credentials;

    await api.deleteCredential(projectId, credentialId);

    return createCommandResult('view', { _id: credentialId }, ['_id']);
  }
);
