import { execute } from '../helpers/execute';
import { withAddress } from '../helpers/options';

describe('authentication', () => {
  test('rejects if token is not provided', async () => {
    await expect(
      // @ts-expect-error: We intentionally providing undefined as token here.
      execute(withAddress(['list', 'projects']), { token: undefined })
    ).rejects.toMatchSnapshot();
  });

  test('accepts if token is provided with --auth-token', async () => {
    await expect(
      execute(withAddress(['list', 'projects', '--auth-token', 'tokenabc']), {
        // @ts-expect-error: We intentionally providing undefined as token here.
        token: undefined
      })
    ).resolves;
  });
});
