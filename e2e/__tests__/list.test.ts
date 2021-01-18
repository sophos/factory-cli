import { execute } from '../helpers/execute';
import { loadFixtures } from './fixtures';
import { withAddress, withFormat } from '../helpers/options';
import knownIds from '../helpers/knowIds';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl list', () => {
  jest.setTimeout(15000);

  test('throws on missing subcommand', async () => {
    await expect(execute(['list'])).rejects.toMatchSnapshot();
  });

  describe('credentials', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'credentials'])).rejects.toMatchSnapshot();
    });

    test('should work (default formatting)', async () => {
      await expect(
        execute(
          withAddress(['list', 'credentials', '--project-id', knownIds.project])
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
              knownIds.project
            ]),
            'wide'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              knownIds.project
            ]),
            'json'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              knownIds.project
            ]),
            'yaml'
          )
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('jobs', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'jobs'])).rejects.toMatchSnapshot();
    });

    test('should work (default formatting)', async () => {
      await expect(
        execute(['list', 'jobs', '--project-id', knownIds.project])
      ).resolves.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(
          withFormat(
            withAddress(['list', 'jobs', '--project-id', knownIds.project]),
            'wide'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress(['list', 'jobs', '--project-id', knownIds.project]),
            'json'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress(['list', 'jobs', '--project-id', knownIds.project]),
            'yaml'
          )
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('organizations', () => {
    test('should work (default formatting)', async () => {
      await expect(
        execute(['list', 'organizations'])
      ).resolves.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(withFormat(withAddress(['list', 'organizations']), 'wide'))
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'organizations']), 'json'))
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'organizations']), 'yaml'))
      ).resolves.toMatchSnapshot();
    });
  });

  describe('pipeline-revisions', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['list', 'pipeline-revisions'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipelines', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'pipelines'])).rejects.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'pipelines',
              '--project-id',
              knownIds.project
            ]),
            'wide'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'pipelines',
              '--project-id',
              knownIds.project
            ]),
            'json'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'pipelines',
              '--project-id',
              knownIds.project
            ]),
            'yaml'
          )
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('projects', () => {
    test('should work', async () => {
      await expect(
        execute(withFormat(withAddress(['list', 'projects']), 'wide'))
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'projects']), 'json'))
      ).resolves.toMatchSnapshot();

      await expect(
        execute(withFormat(withAddress(['list', 'projects']), 'yaml'))
      ).resolves.toMatchSnapshot();
    });
  });

  // TODO: implement tests for organizations.
  describe('runners', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'runners'])).rejects.toMatchSnapshot();
    });

    test('should work (by project)', async () => {
      await expect(
        execute(
          withFormat(
            withAddress(['list', 'runners', '--project-id', knownIds.project]),
            'wide'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress(['list', 'runners', '--project-id', knownIds.project]),
            'json'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress(['list', 'runners', '--project-id', knownIds.project]),
            'yaml'
          )
        )
      ).resolves.toMatchSnapshot();
    });
  });

  describe('runs', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'runs'])).rejects.toMatchSnapshot();
    });

    test('should work', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'runs',
              '--project-id',
              knownIds.project,
              '--pipeline-id',
              knownIds.pipeline
            ]),
            'wide'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'runs',
              '--project-id',
              knownIds.project,
              '--pipeline-id',
              knownIds.pipeline
            ]),
            'json'
          )
        )
      ).resolves.toMatchSnapshot();

      await expect(
        execute(
          withFormat(
            withAddress(['list', 'runs', '--project-id', knownIds.project]),
            'yaml'
          )
        )
      ).resolves.toMatchSnapshot();
    });
  });
});
