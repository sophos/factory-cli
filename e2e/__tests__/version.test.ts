import { executeWithStdoutOnly } from '../helpers/execute';

const pkg = require('../../package.json');

describe('refactrctl --version', () => {
  test('prints correct version', async () => {
    await expect(
      executeWithStdoutOnly(['--version'], { trim: true })
    ).resolves.toBe(pkg.version);
  });
});
