/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as faker from 'faker';
import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';
import parseOutput, { asJson } from './helpers/parseOutput';
import { loadFixtures } from './fixtures';

beforeAll(async () => {
  return await loadFixtures();
});

describe('factoryctl create', () => {
  jest.setTimeout(20000);
  describe('credential', () => {
    test('create & delete credential', async () => {
      const credentialId = 'CRUDtestCredential';
      let credential_id = '';
      await expect(
        execute(
          [
            'create',
            'credential',
            '--format=json',
            `--name="CI test credential"`,
            '--type=generic',
            '--data.text="hello world"',
            `--id=${credentialId}`,
            `--project-id=${knownIds.project}`
          ],
          {
            token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
          }
        ).then((result) => {
          const credential = parseOutput(result, asJson);
          credential_id = credential._id;
          return credential;
        })
      ).resolves.toHaveProperty('_id');

      await expect(
        execute(
          [
            'delete',
            'credential',
            '--format=json',
            `--project-id=${knownIds.project}`,
            credential_id
          ],
          {
            token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toHaveProperty('id', credential_id);

      await expect(
        execute(
          [
            'get',
            'credential',
            '--format=json',
            `--project-id=${knownIds.project}`,
            credentialId
          ],
          {
            token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
          }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toBeNull();
    });
  });

  describe('pipeline', () => {
    test('create & delete pipeline', async () => {
      let pipelineId = 'pipelineId';
      await expect(
        execute(
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
        ).then((result) => {
          const pipeline = parseOutput(result, asJson);
          pipelineId = pipeline._id;
          return pipeline;
        })
      ).resolves.toHaveProperty('_id');

      await expect(
        execute(
          [
            'delete',
            'pipeline',
            '--project-id',
            knownIds.project,
            pipelineId,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toHaveProperty('_id', pipelineId);
    });
  });

  describe('job', () => {
    test('create & delete job (type: manual)', async () => {
      let jobId = 'jobId';
      await expect(
        execute(
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
        ).then((result) => {
          const job = parseOutput(result, asJson);
          jobId = job._id;
          return job;
        })
      ).resolves.toHaveProperty('_id');

      await expect(
        execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.project,
            jobId,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toHaveProperty('_id', jobId);
    });

    test('create & delete job with variables', async () => {
      let jobId = 'jobId';
      await expect(
        execute(
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
        ).then((result) => {
          const job = parseOutput(result, asJson);
          jobId = job._id;
          return job;
        })
      ).resolves.toHaveProperty('_id');

      await expect(
        execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.project,
            jobId,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toHaveProperty('_id', jobId);
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
      let jobId = 'jobId';
      await expect(
        execute(
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
        ).then((result) => {
          const job = parseOutput(result, asJson);
          jobId = job._id;
          return job;
        })
      ).resolves.toHaveProperty('_id');

      await expect(
        execute(
          [
            'delete',
            'job',
            '--project-id',
            knownIds.project,
            jobId,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((result) => parseOutput(result, asJson))
      ).resolves.toHaveProperty('_id', jobId);
    });
  });
});
