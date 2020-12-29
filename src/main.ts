/*! globals __VERSION__ */

import executeCommand from './executeCommand';
import parse from './parse';

declare const __VERSION__: string;

async function main(argv: string[]) {
  const args = parse(argv, { version: __VERSION__ });

  try {
    await executeCommand(args);
  } catch (err) {
    // TODO: remove
    console.error(err);
    process.exit(1);
  }
}

export default main;
export { main };
