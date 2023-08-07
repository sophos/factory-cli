/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { execute } from '../../../tests/helpers/execute';

describe('factoryctl run', () => {
  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['run', 'pipeline'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['run', 'job'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
