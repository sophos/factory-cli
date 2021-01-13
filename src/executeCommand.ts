import isFunction from 'lodash/isFunction';
import flow from 'lodash/flow';

import {
  commandsWithSubcommandsMap,
  executableCommandsMap,
  mustHaveSubcommand,
  TopLevelCommand
} from './cmd';
import Client from './client';
import formatter from './formatter';
import printer from './printer';
import filterer from './filterer';
import asyncGenToArray from './util/asyncGenToArray';
import { readStdin } from './util/io';

export default async function executeCommand(args: any) {
  const methods: string[] = args._;
  const filterPath = args.filter;
  const command = methods[0] as TopLevelCommand;
  let handler;

  if (mustHaveSubcommand(command)) {
    const subcommand = methods[1];
    const subcommands = commandsWithSubcommandsMap[command];

    handler = subcommands[subcommand];
  } else {
    handler = executableCommandsMap[command];
  }

  if (isFunction(handler)) {
    const apiClient = new Client(args.address, args.authToken);
    const result = await handler(apiClient, args);
    const { payload, fields, type, format: formatType } = result;
    const filter = filterer(filterPath, fields!);
    const format = formatter(formatType, fields!);
    const view = flow([filter, format, printer({ level: 'info' })]);
    const viewError = flow([
      formatter('log', ['message']),
      printer({ level: 'error' })
    ]);

    switch (type) {
      case 'view': {
        return view(payload);
      }

      case 'streaming':
        {
          // We cannot log each event separately in JSON/Yaml mode,
          // as it would otherwise be an invalid JSON/Yaml structure.
          if (formatType === 'yaml' || formatType === 'json') {
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
            for (const error of payload.errors) viewError(error);
            break;
          case 'unknown_error':
            viewError({
              code: 'UnknownError',
              message:
                'An unknown error occurred. To report an issue, please visit https://github.com/refactr/refactr-cli/issues'
            });
            break;
        }
      }
    }
  } else {
    throw new Error('Unknown command!');
  }
}
