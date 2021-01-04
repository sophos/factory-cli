import { AxiosError } from 'axios';

import type Client from '../client';

export type CommandResultType = 'view' | 'error' | 'streaming';

export type CommandResult<T> = {
  type: CommandResultType;
  payload: T;
  fields?: string[];
};

export type CommandHandler<A, R> = (
  apiClient: Client,
  args: A
) => Promise<CommandResult<R>>;

export const createCommandResult = <T>(
  type: CommandResultType,
  payload: T,
  fields?: string[]
): CommandResult<T> => ({
  type,
  payload,
  fields,
});

export const handler = <A, R>(
  fn: CommandHandler<A, R>
): CommandHandler<A, R | {}> => async (apiClient, args: A) => {
  try {
    return await fn(apiClient, args);
  } catch (err) {
    console.info(err);

    // TODO: handle error
    if (err.isAxiosError) {
      const errors = (err as AxiosError).response?.data?.errors ?? [
        { message: '' },
      ];
      return createCommandResult('error', { errors });
    }

    // TODO: handle error
    return createCommandResult('error', {});
  }
};
