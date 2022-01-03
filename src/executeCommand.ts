import flow from 'lodash/flow';
import isFunction from 'lodash/isFunction';
import isNil from 'lodash/isNil';
import Client from './client';
import {
  commandsWithSubcommandsMap,
  executableCommandsMap,
  mustHaveSubcommand,
  TopLevelCommand
} from './cmd';
import filterer from './filterer';
import formatter from './formatter';
import type { Args } from './parse';
import printer from './printer';
import asyncGenToArray from './util/asyncGenToArray';

export default async function executeCommand(args: Args) {
  const methods: string[] = args._ as string[];
  const filterPath = args.filter ?? null;
  const command = methods[0] as TopLevelCommand;
  let handler;

  if (mustHaveSubcommand(command)) {
    const subcommand = methods[1];
    const subcommands = commandsWithSubcommandsMap[command];

    handler = subcommands[subcommand];
  } else {
    handler = executableCommandsMap[command];
  }

  const viewError = flow([
    formatter('log', ['code', 'message']),
    printer({ level: 'error' })
  ]);

  let isUnknownCmd = true;
  let error = null;
  try {
    if (isFunction(handler)) {
      isUnknownCmd = false;

      const apiClient = new Client(
        args.address as unknown as string,
        args.authToken as string
      );
      const result = await handler(apiClient, args);
      const { payload, fields, type, format: formatType } = result;
      const isJsonOrYamlFormat = formatType === 'json' || formatType === 'yaml';
      const isError = type === 'error';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const filter = filterer(filterPath, fields!, type);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const format = formatter(formatType, fields!);
      const view = flow([
        filter,
        format,
        printer({ level: isError ? 'error' : 'info' })
      ]);

      switch (type) {
        case 'view': {
          return view(payload);
        }

        case 'streaming':
          {
            // We cannot log each event separately in JSON/Yaml mode,
            // as it would otherwise be an invalid JSON/Yaml structure.
            if (isJsonOrYamlFormat) {
              view(await asyncGenToArray(payload));
            } else {
              for await (const run of payload) view(run);
            }
          }
          break;

        case 'error': {
          const { kind } = payload as { kind: 'api_error' | 'unknown_error' };

          switch (kind) {
            case 'api_error':
              if (isJsonOrYamlFormat) {
                view(payload.errors);
              } else {
                for (const error of payload.errors) view(error);
              }
              break;
            case 'unknown_error': {
              const message =
                payload.possiblyWrongAddress ?? false
                  ? 'The API address provided is invalid. ' +
                    'If this error is persistent, please report it via https://github.com/sophos-factory/cli/issues'
                  : 'An unknown error occurred. To report an issue, please visit https://github.com/sophos-factory/cli/issues';
              viewError({
                code: 'UnknownError',
                message: message
              });
              break;
            }
          }
        }
      }
    }
  } catch (err) {
    error = err;
  }

  if (isUnknownCmd) {
    viewError({
      code: 'UnknownCommand',
      error,
      message:
        'Unknown command. This may be a problem with the CLI. ' +
        'To report an issue, please visit https://github.com/sophos-factory/cli/issues'
    });
  }

  if (!isNil(error)) {
    viewError({
      code: 'UnknownError',
      error,
      stack: error.stack,
      message:
        'An unknown error occurred. To report an issue, please visit https://github.com/sophos-factory/cli/issues'
    });
  }
}
