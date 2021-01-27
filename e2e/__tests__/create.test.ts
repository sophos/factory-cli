import * as faker from 'faker';

import { execute } from '../helpers/execute';
import { loadFixtures } from './fixtures';
import knownIds from '../helpers/knowIds';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl create', () => {
  jest.setTimeout(10000);
  test('throws on missing subcommand', async () => {
    await expect(
      execute(['create'], { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'credential'], {
          token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('create & delete credential', async () => {
      const id = faker.random.uuid();
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'credential',
            '--format=json',
            `--name="${faker.random.word()}"`,
            '--type=generic',
            '--data.text="hello world"',
            `--id=${id}`,
            `--project-id=${knownIds.dynamic.project}`
          ],
          {
            token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
          }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'credential',
            '--format=json',
            `--project-id=${knownIds.dynamic.project}`,
            id
          ],
          {
            token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
          }
        )
      );

      expect(deleteResult).toHaveProperty('id', id);
    });
  });

  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'pipeline'], {
          token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('create & delete pipeline', async () => {
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'pipeline',
            '--project-id',
            knownIds.dynamic.project,
            '--name',
            faker.random.word(),
            '--format=json'
          ],
          { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'pipeline',
            '--project-id',
            knownIds.dynamic.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'pipeline-revision'], {
          token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'project'], {
          token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test.skip('should create project', async () => {
      const result = JSON.parse(
        await execute(['create', 'project', '--name', faker.name.title()], {
          token: process.env.DYNAMIC_AUTH_TOKEN!
        })
      );
    });
  });
});
