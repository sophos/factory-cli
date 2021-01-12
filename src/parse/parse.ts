import isString from 'lodash/isString';
import Yargs, { terminalWidth } from 'yargs';
import yargs from 'yargs/yargs';

import { DEFAULT_FORMATTER } from '../formatter';
import create from './create';
import get from './get';
import list from './list';
import run from './run';
import rerun from './rerun';
import remove from './remove';

const apply = (yargs: Yargs.Argv) =>
  // NOTE: using manual chaining instead of `_.flow` because it cannot
  //       infer type correctly.
  create(get(list(remove(rerun(run(yargs))))));

const parse = (argv: string[], { version }: { version: string }) => {
  return apply(yargs(argv))
    .strict(true)
    .scriptName('refactrctl')
    .version(version)
    .usage('Usage: $0 <command> [options]')
    .middleware((argv) => {
      if (!isString(argv.address) && isString(process.env.REFACTR_ADDRESS)) {
        argv.address = process.env.REFACTR_ADDRESS;
      } else if (!isString(argv.address)) {
        argv.address = 'https://api.refactr.it/v1';
      }

      if (
        !isString(argv.authToken) &&
        isString(process.env.REFACTR_AUTH_TOKEN)
      ) {
        argv.authToken = argv['auth-token'] = process.env.REFACTR_AUTH_TOKEN;
      }
    })
    .option('verbose', {
      alias: 'v',
      describe: 'Print detailed output',
      type: 'boolean'
    })
    .option('format', {
      describe: 'Specifies output format',
      default: DEFAULT_FORMATTER,
      choices: ['wide', 'json', 'yaml']
    })
    .option('address', {
      describe:
        'Address of the Refactr API server. This can also be specified via the REFACTR_ADDRESS environment variable. Defaults to https://api.refactr.it/v1',
      type: 'string',
      requiresArg: true
    })
    .option('auth-token', {
      describe:
        'Authentication token. This can also be specified via the REFACTR_AUTH_TOKEN environment variable',
      type: 'string',
      requiresArg: true
    })
    .demandCommand(1, 'Command must be specified.')
    .help()
    .wrap(Math.min(120, terminalWidth())).argv;
};

export default parse;
