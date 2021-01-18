import { exec } from 'child_process';

import isNil from 'lodash/isNil';

type Args = string[];

const command = process.env.__REFACTR_COMMAND__ ?? 'refactrctl';

type Options = {
  trimStdout?: boolean;
  trimStderr?: boolean;
};

export async function executeAsIs(
  cmd: string,
  options: Options = { trimStdout: false, trimStderr: false }
) {
  return new Promise<string>((resolve, reject) => {
    exec(cmd, (err, stdout, stderr) => {
      stdout = options?.trimStdout ? stdout.trim() : stdout;
      stderr = options?.trimStderr ? stderr.trim() : stderr;

      if (!isNil(err)) {
        // Assuming all errors are forwarded to stderr.
        return reject(stderr);
      }

      return resolve(stdout);
    });
  });
}

export async function execute(args: Args, options?: Options): Promise<string> {
  return executeAsIs(`${command} ${args.join(' ')}`, options);
}

export const getAuthToken = () => process.env.__REFACTR_AUTH_TOKEN__;
