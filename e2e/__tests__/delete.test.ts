/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from '../helpers/execute';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl delete', () => {
  test('throws on missing subcommand', async () => {
    await expect(
      execute(['delete'], { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['delete', 'credential'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        execute(['delete', 'credential', 'credential-id'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['delete', 'job'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        execute(['delete', 'job', 'job-id'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['delete', 'pipeline'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['delete', 'project'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['delete', 'runner'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing organization-id option', async () => {
      await expect(
        execute(['delete', 'runner', 'runner-id'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
