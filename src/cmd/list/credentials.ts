import isString from 'lodash/isString';
import { SharedArguments } from './shared-arguments';
import { CredentialType } from '../../credential-type';
import fields from '../../fields';
import { createCommandResult, handler } from '../handler';

type Arguments = SharedArguments & {
  projectId: string;
  type?: CredentialType | CredentialType[];
  sort?: 'created_asc' | 'created_desc';
};

export default handler(
  async (apiClient, { projectId, sort, type, limit, offset }: Arguments) => {
    const api = apiClient.credentials;
    if (isString(type)) {
      type = [type];
    }

    const { data } = await api.listCredentials(
      projectId,
      type,
      sort,
      offset,
      limit
    );
    const list = data?.credentials ?? [];

    return createCommandResult('view', list, fields.credential);
  }
);
