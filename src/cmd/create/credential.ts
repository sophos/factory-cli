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
  'vault_app_role': CredentialTypeEnum.VaultAppRole,
  'google_service_account': CredentialTypeEnum.GoogleServiceAccount
};

const mapData = (
  credentialType: CredentialType,
  data: { [key: string]: string }
) =>
  ({
    ['api_token']: () => ({
      token: data.token
    }),
    ['aws_access_key']: () => ({
      access_key: data.accessKey,
      secret_key: data.secretKey
    }),
    ['azure_service_principal']: () => ({
      subscription_id: data.subscriptionId,
      domain: data.domain,
      client_id: data.clientId,
      client_key: data.clientKey,
      tenant_id: data.tenantId
    }),
    ['bearer_token']: () => ({
      token: data.token
    }),
    ['generic']: () => ({
      text: data.text
    }),
    ['ssh_key']: () => ({
      text: data.privateKey
    }),
    ['username_password']: () => ({
      username: data.username,
      password: data.password
    }),
    ['vault_app_role']: () => ({
      role_id: data.roleId,
      secret_id: data.secretId
    }),

    ['google_service_account']: () => ({
      json: data.json
    })
  }[credentialType]());

type Arguments = {
  projectId: string;
  name: string;
  type: CredentialType;
  data: { [key: string]: string };
  id: string;
};

export default handler<Arguments, any>(
  async (apiClient, { projectId, name, type, data, id }) => {
    const api = apiClient.credentials;

    const { data: credential } = await api.createCredential(projectId, {
      id,
      name,
      type: credentialType[type],
      data: mapData(type, data)
    });

    return createCommandResult('view', credential, ['_id']);
  }
);
