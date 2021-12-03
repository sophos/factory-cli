/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from '../helpers/execute';
import knownIds from '../helpers/knownIds';
import { withAddress, withFormat } from '../helpers/options';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl list', () => {
  jest.setTimeout(15000);

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

    test('should work (default formatting)', async () => {
      await expect(
        execute(
          withAddress([
            'list',
            'credentials',
            '--project-id',
            knownIds.static.project
          ]),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              knownIds.static.project
            ]),
            'wide'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              knownIds.static.project
            ]),
            'json'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              knownIds.static.project
            ]),
            'yaml'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
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

    test('should work (default formatting)', async () => {
      await expect(
        execute(['list', 'jobs', '--project-id', knownIds.static.project], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'jobs',
              '--project-id',
              knownIds.static.project
            ]),
            'wide'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'jobs',
              '--project-id',
              knownIds.static.project
            ]),
            'json'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'jobs',
              '--project-id',
              knownIds.static.project
            ]),
            'yaml'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('organizations', () => {
    test('should work (default formatting)', async () => {
      await expect(
        execute(['list', 'organizations'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(withFormat(withAddress(['list', 'organizations']), 'wide'), {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'organizations']), 'json'), {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'organizations']), 'yaml'), {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
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

    test('should work', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'pipelines',
              '--project-id',
              knownIds.static.project
            ]),
            'wide'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'pipelines',
              '--project-id',
              knownIds.static.project
            ]),
            'json'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'pipelines',
              '--project-id',
              knownIds.static.project
            ]),
            'yaml'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('projects', () => {
    test('should work', async () => {
      await expect(
        execute(withFormat(withAddress(['list', 'projects']), 'wide'), {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'projects']), 'json'), {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'projects']), 'yaml'), {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).resolves.toMatchSnapshot();
    });
  });

  // TODO: implement tests for organizations.
  describe('runners', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'runners'], {
          token: process.env.FACTORY_STATIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('should work (by project)', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'runners',
              '--project-id',
              knownIds.static.project
            ]),
            'wide'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'runners',
              '--project-id',
              knownIds.static.project
            ]),
            'json'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'runners',
              '--project-id',
              knownIds.static.project
            ]),
            'yaml'
          ),
          { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
        )
      ).resolves.toMatchSnapshot();
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
