import { executeWithStdoutOnly } from '../helpers/execute';
import { loadFixtures } from './fixtures';
import { withAddress, withFormat } from '../helpers/options';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl list', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['list'])).rejects.toMatchSnapshot();
  });

  describe('credentials', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['list', 'credentials'])
      ).rejects.toMatchSnapshot();
    });

    test('should work (default formatting)', async () => {
      await expect(
        executeWithStdoutOnly(
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
        executeWithStdoutOnly(
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
        executeWithStdoutOnly(
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
        executeWithStdoutOnly(
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
      await expect(
        executeWithStdoutOnly(['list', 'jobs'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revisions', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['list', 'pipeline-revisions'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipelines', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['list', 'pipelines'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runners', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['list', 'runners'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runs', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['list', 'runs'])
      ).rejects.toMatchSnapshot();
    });
  });
});
