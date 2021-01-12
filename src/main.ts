/*! globals __VERSION__ */

import executeCommand from './executeCommand';
import parse from './parse';

declare const __VERSION__: string;

async function main(argv: string[]) {
  const args = parse(argv, { version: __VERSION__ });

  await executeCommand(args);
}

export default main;
export { main };
