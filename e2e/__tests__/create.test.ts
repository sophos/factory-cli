import { execute } from '../helpers/execute';
import { loadFixtures } from './fixtures';
import * as faker from 'faker';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl create', () => {
  test('throws on missing subcommand', async () => {
    await expect(execute(['create'])).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['create', 'credential'])).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['create', 'pipeline'])).rejects.toMatchSnapshot();
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'pipeline-revision'])
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(execute(['create', 'project'])).rejects.toMatchSnapshot();
    });

    test.skip('should create project', async () => {
      await expect(
        execute(['create', 'project', '--name', faker.name.title()])
      );
    });
  });
});
