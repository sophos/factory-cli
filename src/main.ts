/*! globals __VERSION__ */

import executeCommand from './executeCommand';
import parse from './parse';

declare const __VERSION__: string;

(async function main(argv: string[]) {
  const args = parse(argv, { version: __VERSION__ });

  // @ts-expect-error: TypeScript cannot correctly infer `authToken` type,
  // as we validate its' availability in the `check` function, i.e. outside
  // option definition.
  await executeCommand(args);
})(process.argv.slice(2));
