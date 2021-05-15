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
  args: A & { format: RawFormatType }
) => Promise<
  | HandlerResult<R>
  | HandlerResult<{
      stack: string;
      kind: ErrorKind;
      errors: unknown[];
    }>
  | HandlerResult<{
      stack: string;
      kind: ErrorKind;
      possiblyWrongAddress: boolean;
      error: unknown;
    }>
>;

export const createCommandResult = <T>(
  type: CommandResultType,
  payload: T,
  fields?: string[]
): CommandResult<T> => ({
  type,
  payload,
  fields: type === 'error' ? ['code', 'message'] : fields
});

const createHandlerResult = <T = unknown>(
  cmd: CommandResult<T>,
  format: RawFormatType
): CommandResult<T> & { format: FormatType } => ({
  format: toFormatType(
    format,
    cmd.type === 'streaming' || cmd.type === 'error'
  ),
  ...cmd
});

type HandlerResult<R> = CommandResult<R> & { format: FormatType };
export type ErrorKind = 'api_error' | 'unknown_error';

export const handler = <A, R>(
  fn: (apiClient: Client, args: A) => Promise<CommandResult<R>>
): CommandHandler<A, R> => async (apiClient, args) => {
  const format = args.format;
  try {
    const result = await fn(apiClient, args);
    return createHandlerResult(result, format);
  } catch (err) {
    const stack: string = err.stack;
    const isAxiosError: boolean = err.isAxiosError ?? false;
    if (isAxiosError) {
      const errors = (err as AxiosError).response?.data?.errors;
      if (!isNil(errors)) {
        return createHandlerResult(
          createCommandResult('error', {
            kind: 'api_error' as ErrorKind,
            errors,
            stack
          }),
          format
        );
      }
    }

    return createHandlerResult(
      createCommandResult('error', {
        kind: 'unknown_error' as ErrorKind,
        error: err,
        stack,
        possiblyWrongAddress: isAxiosError
      }),
      format
    );
  }
};
