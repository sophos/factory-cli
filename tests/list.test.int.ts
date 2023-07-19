/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { isArray } from 'lodash';
import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';
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
        ).then((value) => isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
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
        ).then((value) => isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });
  });

  describe('organizations', () => {
    test('returns array of organizations', async () => {
      await expect(
        execute(['list', 'organizations', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }).then((value) => isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
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
        ).then((value) => isArray(JSON.parse(value)))
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
        ).then((value) => isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });
  });

  describe('projects', () => {
    test('returns array of projects', async () => {
      await expect(
        execute(['list', 'projects', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }).then((value) => isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });
  });

  describe('runners', () => {
    test('returns array of runners', async () => {
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
        ).then((value) => isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });
  });
  test('returns array of runs', async () => {
    await expect(
      execute(
        [
          'list',
          'runs',
          '--project-id',
          knownIds.project,
          '--format',
          'json'
        ],
        {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        }
      ).then((value) => isArray(JSON.parse(value)))
    ).resolves.toBeTruthy();
  });
});