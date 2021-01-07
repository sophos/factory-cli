import { createCommandResult, handler } from '../handler';
import fields from '../../fields';

type Arguments = {
  projectId: string;
  credentialId: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, credentialId }) => {
    const api = apiClient.credentials;
    const { data: credential } = await api.getCredential(
      projectId,
      credentialId
    );

    console.info(credential);

    return createCommandResult('view', credential, fields.credential);
  }
);
