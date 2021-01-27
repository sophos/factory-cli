export type CredentialType =
  | 'google_service_account'
  | 'api_token'
  | 'aws_access_key'
  | 'azure_service_principal'
  | 'bearer_token'
  | 'generic'
  | 'ssh_key'
  | 'username_password'
  | 'vault_app_role';

export const CREDENTIAL_TYPES = [
  'api_token',
  'aws_access_key',
  'azure_service_principal',
  'bearer_token',
  'generic',
  'ssh_key',
  'username_password',
  'vault_app_role',
  'google_service_account'
];
