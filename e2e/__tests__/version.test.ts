import { execute } from '../helpers/execute';

const pkg = require('../../package.json');

describe('refactrctl --version', () => {
  test('prints correct version', async () => {
    await expect(
      execute(['--version'], {
        token: process.env.STATIC_REFACTR_AUTH_TOKEN!,
        trimStdout: true
      })
    ).resolves.toBe(pkg.version);
  });
});
