import { execute } from '../helpers/execute';
import { loadFixtures } from './fixtures';
import { withAddress, withFormat } from '../helpers/options';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl list', () => {
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
          withAddress([
            'list',
            'credentials',
            '--project-id',
            '5ffc715d04ea5ca71d201bb3'
          ])
        )
      ).resolves.toMatchSnapshot();
    });

    test('should work (--format=table)', async () => {
      await expect(
        execute(
          withAddress([
            'list',
            'credentials',
            '--project-id',
            '5ffc715d04ea5ca71d201bb3'
          ])
        )
      ).resolves.toMatchSnapshot();
    });

    test('should work (--format=json)', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              '5ffc715d04ea5ca71d201bb3'
            ]),
            'json'
          )
        )
      ).resolves.toMatchSnapshot();
    });

    test('should work (--format=yaml)', async () => {
      await expect(
        execute(
          withFormat(
            withAddress([
              'list',
              'credentials',
              '--project-id',
              '5ffc715d04ea5ca71d201bb3'
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
  });

  describe('runners', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'runners'])).rejects.toMatchSnapshot();
    });
  });

  describe('runs', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['list', 'runs'])).rejects.toMatchSnapshot();
    });
  });
});
