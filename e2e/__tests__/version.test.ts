import { execute } from '../helpers/execute';

const pkg = require('../../package.json');

describe('refactrctl --version', () => {
  test('prints correct version', async () => {
    await expect(execute(['--version'], { trimStdout: true })).resolves.toBe(
      pkg.version
    );
  });
});
