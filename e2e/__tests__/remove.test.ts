import { executeWithStdoutOnly } from '../helpers/execute';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl remove', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['remove'])).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'credential'])
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'credential', 'credential-id'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'job'])
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'job', 'job-id'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'pipeline'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'project'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'runner'])
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing organization-id option', async () => {
      await expect(
        executeWithStdoutOnly(['remove', 'runner', 'runner-id'])
      ).rejects.toMatchSnapshot();
    });
  });
});
