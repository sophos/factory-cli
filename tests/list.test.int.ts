/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';
import parseOutput, { asJson } from './helpers/parseOutput';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('factoryctl list', () => {
  jest.setTimeout(15000);

  describe('credentials', () => {
    test('returns array of credentials', async () => {
      await expect(
        execute(
          [
            'list',
            'credentials',
            '--project-id',
            knownIds.project,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  describe('jobs', () => {
    test('returns array of jobs', async () => {
      await expect(
        execute(
          [
            'list',
            'jobs',
            '--project-id',
            knownIds.project,
            '--format',
            'json'
          ],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  describe('organizations', () => {
    test('returns array of organizations', async () => {
      await expect(
        execute(['list', 'organizations', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }).then((result) => parseOutput(result, asJson))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  describe('pipeline-revisions', () => {
    test('returns array of pipeline revisions', async () => {
      await expect(
        execute(
          [
            'list',
            'pipeline-revisions',
            '--project-id',
            knownIds.project,
            '--pipeline-id',
            knownIds.pipeline,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeTruthy();
    });
  });

  describe('pipelines', () => {
    test('returns array of pipelines', async () => {
      await expect(
        execute(
          [
            'list',
            'pipelines',
            '--project-id',
            knownIds.project,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  describe('projects', () => {
    test('returns array of projects', async () => {
      await expect(
        execute(['list', 'projects', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }).then((result) => parseOutput(result, asJson))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  describe('runners', () => {
    test('returns array of runners for project', async () => {
      await expect(
        execute(
          [
            'list',
            'runners',
            '--project-id',
            knownIds.project,
            '--format',
            'json'
          ],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeTruthy();
    });
    test('returns array of runners for organization', async () => {
      await expect(
        execute(
          [
            'list',
            'runners',
            '--organization-id',
            knownIds.organization,
            '--format',
            'json'
          ],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  describe('runner pools', () => {
    test('returns array of runner pools', async () => {
      await expect(
        execute(
          [
            'list',
            'runner-pools',
            '--organization-id',
            knownIds.organization,
            '--format',
            'json'
          ],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeInstanceOf(Array);
    });
  });

  test('returns array of runs', async () => {
    await expect(
      execute(
        ['list', 'runs', '--project-id', knownIds.project, '--format', 'json'],
        {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }
      ).then((result) => parseOutput(result, asJson))
    ).resolves.toBeInstanceOf(Array);
  });
});
