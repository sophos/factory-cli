import { CredentialTypeEnum } from '@refactr/api-client';

import { createCommandResult, handler } from '../handler';
import { CredentialType } from '../../credential-type';

const credentialType = {
  'api_token': CredentialTypeEnum.ApiToken,
  'aws_access_key': CredentialTypeEnum.AwsAccessKey,
  'azure_service_principal': CredentialTypeEnum.AzureServicePrincipal,
  'bearer_token': CredentialTypeEnum.BearerToken,
  'generic': CredentialTypeEnum.Generic,
  'ssh_key': CredentialTypeEnum.SshKey,
  'username_password': CredentialTypeEnum.UsernamePassword,
  'vault_app_role': CredentialTypeEnum.VaultAppRole
};

type Arguments = {
  projectId: string;
  name: string;
  type: CredentialType;
  data: any;
  id: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, name, type, data, id }) => {
    const api = apiClient.credentials;

    const { data: credential } = await api.createCredential(projectId, {
      id,
      name,
      type: credentialType[type],
      data
    });

    console.info(credential);

    return createCommandResult('view', credential, ['_id']);
  }
);
