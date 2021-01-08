import { executeWithStdoutOnly } from '../helpers/execute';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl create', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['create'])).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['create', 'credential'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['create', 'pipeline'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['create', 'pipeline-revision'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['create', 'project'])
      ).rejects.toMatchSnapshot();
    });
  });
});
