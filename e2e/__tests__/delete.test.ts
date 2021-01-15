import { execute } from '../helpers/execute';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl delete', () => {
  test('throws on missing subcommand', async () => {
    await expect(execute(['delete'])).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['delete', 'credential'])).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        execute(['delete', 'credential', 'credential-id'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['delete', 'job'])).rejects.toMatchSnapshot();
    });

    test('throws on missing --project-id option', async () => {
      await expect(
        execute(['delete', 'job', 'job-id'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['delete', 'pipeline'])).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['delete', 'project'])).rejects.toMatchSnapshot();
    });
  });

  describe('runner', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['delete', 'runner'])).rejects.toMatchSnapshot();
    });

    test('throws on missing organization-id option', async () => {
      await expect(
        execute(['delete', 'runner', 'runner-id'])
      ).rejects.toMatchSnapshot();
    });
  });
});
