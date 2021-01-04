import { exec } from 'child_process';

import isNil from 'lodash/isNil';

type Args = string[];

const command = process.env.__REFACTR_COMMAND__ ?? 'refactrctl';

type Options = {
  trimStdout?: boolean;
  trimStderr?: boolean;
};

export default async function execute(
  args: Args,
  options: Options = { trimStdout: false, trimStderr: false }
): Promise<{
  stderr: string;
  stdout: string;
}> {
  return new Promise((resolve, reject) => {
    exec(`${command} ${args.join(' ')}`, (err, stdout, stderr) => {
      if (!isNil(err)) {
        // Assuming all errors are forwarded to stderr.
        return reject(stderr);
      }

      return resolve({
        stdout,
        stderr,
      });
    });
  });
}

export const executeWithStdoutOnly = (
  args: Args,
  { trim }: { trim: boolean } = { trim: false }
) => execute(args).then(({ stdout }) => (trim ? stdout.trim() : stdout));

export const executeWithStderrOnly = (
  args: Args,
  { trim }: { trim: boolean } = { trim: false }
) => execute(args).then(({ stderr }) => (trim ? stderr.trim() : stderr));
