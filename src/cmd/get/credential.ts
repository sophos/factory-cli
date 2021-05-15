import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  credentialId: string;
};

export default handler(
  async (apiClient, { projectId, credentialId }: Arguments) => {
    const api = apiClient.credentials;
    const { data: credential } = await api.getCredential(
      projectId,
      credentialId
    );

    return createCommandResult('view', credential, fields.credential);
  }
);
