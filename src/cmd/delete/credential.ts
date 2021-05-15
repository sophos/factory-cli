import { createCommandResult, handler } from '../handler';

type Arguments = {
  projectId: string;
  credentialId: string;
};

export default handler(
  async (apiClient, { projectId, credentialId }: Arguments) => {
    const api = apiClient.credentials;

    await api.deleteCredential(projectId, credentialId);

    return createCommandResult('view', { id: credentialId }, ['id']);
  }
);
