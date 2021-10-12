import { exec } from 'child_process';

import isNil from 'lodash/isNil';
import isString from 'lodash/isString';

type Args = string[];

const command = process.env.REFACTR_CLI_PATH ?? 'refactrctl';

type Options = {
  token: string;
  address?: string;
  trimStdout?: boolean;
  trimStderr?: boolean;
};

export async function executeAsIs(
  cmd: string,
  options: Options
): Promise<string> {
  const env: { [key: string]: string | undefined } = {
    // inherit from parent process
    ...process.env,
    REFACTR_AUTH_TOKEN: options.token
  };

  if (isString(options.address)) {
    env.REFACTR_ADDRESS = options.address;
  }

  return new Promise<string>((resolve, reject) => {
    exec(
      cmd,
      {
        env
      },
      (err, stdout, stderr) => {
        stdout = options.trimStdout ?? false ? stdout.trim() : stdout;
        stderr = options.trimStderr ?? false ? stderr.trim() : stderr;

        if (!isNil(err)) {
          // Assuming all errors are forwarded to stderr.
          return reject(stderr);
        }

        return resolve(stdout);
      }
    );
  });
}

export async function execute(args: Args, options: Options): Promise<string> {
  const cmd = `${command} ${args.join(' ')}`;

  return executeAsIs(cmd, options);
}
