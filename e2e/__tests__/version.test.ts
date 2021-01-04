import { executeWithStdoutOnly } from '../helpers/execute';

const pkg = require('../../package.json');

describe('refactrctl', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly([])).rejects.toContain(
      'Command must be specified'
    );
  });
});

describe('refactrctl --version', () => {
  test('prints correct version', async () => {
    await expect(
      executeWithStdoutOnly(['--version'], { trim: true })
    ).resolves.toBe(pkg.version);
  });
});
