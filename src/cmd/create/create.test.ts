/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from '../../../tests/helpers/execute';
import { loadFixtures } from '../../../tests/fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('factoryctl create', () => {
  test('throws on missing subcommand', async () => {
    await expect(
      execute(['create'], { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'credential'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'pipeline'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'pipeline-revision'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'job'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'project'], {
          token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
