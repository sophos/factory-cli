import { URL } from 'url';

import isNil from 'lodash/isNil';
import type Yargs from 'yargs';

import { DEFAULT_FORMATTER } from '../formatter';
import create from './create';
import get from './get';
import list from './list';
import run from './run';
import rerun from './rerun';
import del from './delete';

// NOTE: using commonjs import here as rollup cannot correctly resolve
//       yargs when importing with ES6 imports for some reason.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const yargs = require('yargs');

const DEFAULT_ADDRESS = 'https://api.refactr.it/v1';

const apply = (yargs: Yargs.Argv) =>
  // NOTE: using manual chaining instead of `_.flow` because it cannot
  //       infer type correctly.
  create(get(list(del(rerun(run(yargs))))));

const parse = (argv: string[], { version }: { version: string }) => {
  return apply(yargs(argv))
    .strict(true)
    .scriptName('refactrctl')
    .version(version)
    .usage('Usage: $0 <command> [options]')
    .option('verbose', {
      alias: 'v',
      describe: 'Print detailed output',
      type: 'boolean'
    })
    .option('format', {
      describe: 'Output format',
      default: DEFAULT_FORMATTER,
      choices: ['wide', 'json', 'yaml']
    })
    .option('filter', {
      describe: 'Filter output using JsonPath',
      type: 'string',
      requiresArg: true
    })
    .option('address', {
      describe: 'Address of the Refactr API server',
      type: 'string',
      requiresArg: true,
      coerce: (address: string) => {
        if (
          !(address.startsWith('http://') || address.startsWith('https://'))
        ) {
          address = `https://${address}`;
        }

        try {
          const url = new URL(address);

          address = url.toString();
        } catch (err) {
          throw new Error('Invalid API address provided!');
        }

        return address;
      }
    })
    .default(
      'address',
      () => process.env.REFACTR_ADDRESS ?? DEFAULT_ADDRESS,
      `REFACTR_ADDRESS environment variable if set, otherwise ${DEFAULT_ADDRESS}`
    )
    .option('auth-token', {
      describe: 'Authentication token',
      type: 'string',
      requiresArg: true
    })
    .default(
      'auth-token',
      () => process.env.REFACTR_AUTH_TOKEN,
      'REFACTR_AUTH_TOKEN environment variable'
    )
    .check((argv) => {
      if (!isNil(argv.filter) && argv.format === 'wide') {
        throw new Error(
          'Filter option cannot be used in conjunction with format option set to `wide`'
        );
      }

      if (isNil(argv.authToken)) {
        throw new Error('Authentication token must be specified!');
      }

      return true;
    })
    .demandCommand(1, 'Command must be specified.')
    .help()
    .wrap(Math.min(120, yargs.terminalWidth())).argv;
};

export type Args = ReturnType<typeof parse>;
export default parse;
