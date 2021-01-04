import isFunction from 'lodash/isFunction';
import omit from 'lodash/omit';
import flow from 'lodash/flow';

import commandMap from './cmd';
import Client from './client';
import formatter from './formatter';
import printer from './printer';
import filterer from './filter';
import type { CommandHandler } from './cmd/handler';
import asyncGenToArray from './util/asyncGenToArray';

export default async function executeCommand(args: any) {
  const methods = args._;
  const formatType = args.format;
  const filterPath = args.filter;
  const command: CommandHandler<any, any> =
    commandMap[methods?.[0]]?.[methods?.[1]];

  if (isFunction(command)) {
    const apiClient = new Client(args.address, args.authToken);
    const result = await command(apiClient, omit(args, ['_', '$0']));
    const { payload, fields } = result;
    const filter = filterer(filterPath, fields!);
    const format = formatter(formatType, fields!);
    const view = flow([filter, format, printer({ level: 'info' })]);

    switch (result.type) {
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
        console.error(result.payload);
        process.exit(1);
      }
    }
  } else {
    throw new Error('Unknown command!');
  }
}
