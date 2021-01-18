import { AxiosError } from 'axios';
import isNil from 'lodash/isNil';

import type Client from '../client';
import { FormatType, RawFormatType, toFormatType } from '../formatter';

export type CommandResultType = 'view' | 'error' | 'streaming';

export type CommandResult<T> = {
  type: CommandResultType;
  payload: T;
  fields?: string[];
  format?: FormatType;
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
  fields
});

const createHandlerResult = <T extends any>(
  cmd: CommandResult<T>,
  format: RawFormatType
): CommandResult<T> & { format: FormatType } => ({
  format: toFormatType(
    format,
    cmd.type === 'streaming' || cmd.type === 'error'
  ),
  ...cmd
});

export const handler = <A, R>(fn: CommandHandler<A, R>) => async (
  apiClient: Client,
  args: A & { format: RawFormatType }
) => {
  const format = args.format;
  try {
    const result = await fn(apiClient, args);
    return createHandlerResult(result, format);
  } catch (err) {
    const stack = err.stack;
    if (err.isAxiosError) {
      const errors = (err as AxiosError).response?.data?.errors;
      const payload = {
        kind: 'api_error',
        errors,
        stack
      };

      if (!isNil(errors)) {
        return createHandlerResult(
          createCommandResult('error', payload),
          format
        );
      }
    }

    return createHandlerResult(
      createCommandResult('error', {
        kind: 'unknown_error',
        error: err,
        stack
      }),
      format
    );
  }
};
