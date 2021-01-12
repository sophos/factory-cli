import { executeWithStdoutOnly } from '../helpers/execute';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl delete', () => {
  test('throws on missing subcommand', async () => {
    await expect(executeWithStdoutOnly(['delete'])).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'credential'])
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'credential', 'credential-id'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'job'])
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'job', 'job-id'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'pipeline'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'project'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'runner'])
      ).rejects.toMatchSnapshot();
    });

    test('throws on missing organization-id option', async () => {
      await expect(
        executeWithStdoutOnly(['delete', 'runner', 'runner-id'])
      ).rejects.toMatchSnapshot();
    });
  });
});
