/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from '../../../tests/helpers/execute';
import { loadFixtures } from '../../../tests/fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('factoryctl list', () => {
  test('throws on missing subcommand', async () => {
    await expect(
      execute(['list'], { token: process.env.FACTORY_STATIC_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  describe('credentials', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'credentials'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('jobs', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'jobs'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revisions', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'pipeline-revisions'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipelines', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'pipelines'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner managers', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'runner-managers'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runs', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'runs'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
