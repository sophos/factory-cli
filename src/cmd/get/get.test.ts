/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { execute } from '../../../tests/helpers/execute';
import knownIds from '../../../tests/helpers/knownIds';

describe('factoryctl get', () => {
  jest.setTimeout(60 * 1000);

  test('throws on missing subcommand', async () => {
    await expect(
      execute(['get'], { token: process.env.FACTORY_STATIC_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  describe('organization', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'organization', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'project'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'credential', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'credential', '--project-id', knownIds.project], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'job', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'job', '--project-id', knownIds.project, '--format', 'json'],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        )
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline-revision', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          [
            'get',
            'pipeline-revision',
            '--project-id',
            knownIds.project,
            '--pipeline-id',
            knownIds.pipeline,
            '--format',
            'json'
          ],
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'pipeline', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      await expect(
        execute(
          [
            'get',
            'pipeline',
            '--project-id',
            knownIds.project,
            '--format',
            'json'
          ],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        )
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'runner', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(['get', 'runner', '--organization-id', knownIds.organization], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner-pool', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'runner-pool', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'runner-pool', '--organization-id', knownIds.organization],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        )
      ).rejects.toMatchSnapshot();
    });
  });

  describe('run', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['get', 'run', '--format', 'json'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();

      // Missing positional
      await expect(
        execute(
          ['get', 'run', '--project-id', knownIds.project, '--format', 'json'],
          {
            token: process.env.FACTORY_STATIC_AUTH_TOKEN!
          }
        )
      ).rejects.toMatchSnapshot();
    });
  });
});
