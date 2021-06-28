/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from '../helpers/execute';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('../../package.json');

describe('refactrctl --version', () => {
  test('prints correct version', async () => {
    await expect(
      execute(['--version'], {
        token: process.env.REFACTR_STATIC_AUTH_TOKEN!,
        trimStdout: true
      })
    ).resolves.toBe(pkg.version);
  });
});
