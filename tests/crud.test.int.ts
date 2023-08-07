/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as faker from 'faker';
import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('factoryctl create', () => {
  jest.setTimeout(20000);
  describe('credential', () => {
    test('create & delete credential', async () => {
      const id = 'CRUDtestCredential';
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'credential',
            '--format=json',
            `--name="CI test credential"`,
            '--type=generic',
            '--data.text="hello world"',
            `--id=${id}`,
            `--project-id=${knownIds.project}`
          ],
          {
            token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
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
            `--project-id=${knownIds.project}`,
            createResult._id
          ],
          {
            token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
          }
        )
      );

      expect(deleteResult).toHaveProperty('id', createResult._id);

      const getAfterDeleteResult = JSON.parse(
        await execute(
          [
            'get',
            'credential',
            '--format=json',
            `--project-id=${knownIds.project}`,
            id
          ],
          {
            token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
          }
        )
      );

      expect(getAfterDeleteResult).toBeNull();
    });
  });

  describe('pipeline', () => {
    test('create & delete pipeline', async () => {
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'pipeline',
            '--project-id',
            knownIds.project,
            '--name',
            faker.random.word(),
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'pipeline',
            '--project-id',
            knownIds.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });
  });

  describe('job', () => {
    test('create & delete job (type: manual)', async () => {
      const createResult = JSON.parse(
        await execute(
          [
            'create',
            'job',
            '--project-id',
            knownIds.project,
            '--pipeline-id',
            knownIds.pipeline,
            '--revision-id',
            knownIds.pipelineRevision,
            '--name',
            faker.random.word(),
            '--type',
            'manual',
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
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
            knownIds.project,
            '--pipeline-id',
            knownIds.pipeline,
            '--revision-id',
            knownIds.pipelineRevision,
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
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
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
            knownIds.project,
            '--pipeline-id',
            knownIds.pipeline,
            '--revision-id',
            knownIds.pipelineRevision,
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
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(createResult).toHaveProperty('_id');

      const deleteResult = JSON.parse(
        await execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.project,
            createResult._id,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      expect(deleteResult).toHaveProperty('_id', createResult._id);
    });
  });
});
