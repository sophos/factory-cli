import { executeWithStdoutOnly } from '../helpers/execute';
import { loadFixtures } from './fixtures';

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
