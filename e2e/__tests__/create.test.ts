/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as faker from 'faker';

import { execute } from '../helpers/execute';
import knownIds from '../helpers/knownIds';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('refactrctl create', () => {
  jest.setTimeout(10000);
  test('throws on missing subcommand', async () => {
    await expect(
      execute(['create'], { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! })
    ).rejects.toMatchSnapshot();
  });

  describe('credential', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'credential'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('create & delete credential', async () => {
      const id = faker.datatype.uuid();
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
            token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
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
            token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
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
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
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
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
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
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });
  });

  describe('pipeline-revision', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'pipeline-revision'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'job'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('create & delete job (type: manual)', async () => {
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'job',
            '--project-id',
            knownIds.dynamic.project,
            '--pipeline-id',
            knownIds.dynamic.pipeline,
            '--revision-id',
            knownIds.dynamic.pipelineRevision,
            '--name',
            faker.random.word(),
            '--type',
            'manual',
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.dynamic.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });

    test('create & delete job with variables', async () => {
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'job',
            '--project-id',
            knownIds.dynamic.project,
            '--pipeline-id',
            knownIds.dynamic.pipeline,
            '--revision-id',
            knownIds.dynamic.pipelineRevision,
            '--name',
            faker.random.word(),
            '--type',
            'manual',
            '--var',
            '\'string_array_variable:["string", "array"]\'',
            '--var',
            '\'string_variable:"string"\'',
            '--var',
            "'number_array_variable:[100, 123]'",
            '--var',
            "'number_variable:123'",
            '--var',
            "'boolean_variable:true'",
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.dynamic.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });

    test('create & delete job (type: scheduled)', async () => {
      const schedule = {
        startDay: new Date().toLocaleString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric'
        }),
        startTime: '12:00',
        interval: 1,
        intervalType: 'day',
        offset: '-08:00'
      };
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'job',
            '--project-id',
            knownIds.dynamic.project,
            '--pipeline-id',
            knownIds.dynamic.pipeline,
            '--revision-id',
            knownIds.dynamic.pipelineRevision,
            '--name',
            faker.random.word(),
            '--type=scheduled',
            '--format=json',
            '--schedule.start-day',
            schedule.startDay,
            '--schedule.start-time',
            schedule.startTime,
            '--schedule.interval',
            schedule.interval.toString(),
            '--schedule.interval-type',
            schedule.intervalType,
            '--schedule.offset',
            schedule.offset
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.dynamic.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });
  });

  describe('project', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['create', 'project'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });
  });
});
