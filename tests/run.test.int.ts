/* eslint-disable @typescript-eslint/no-non-null-assertion */
import isNil from 'lodash/isNil';
import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';

describe('factoryctl run', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(300 * 1000);
  describe('pipeline', () => {
    test('returns run object without --wait flag', async () => {
      await expect(
        execute(
          [
            'run',
            'pipeline',
            '--project-id',
            knownIds.project,
            '--revision-id',
            knownIds.pipelineRevision,
            knownIds.pipeline,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('status', 'Queued');
    });

    test('returns an array of events with --wait flag', async () => {
      await expect(
        execute(
          [
            'run',
            'pipeline',
            '--project-id',
            knownIds.project,
            '--revision-id',
            knownIds.pipelineRevision,
            knownIds.pipeline,
            '--wait',
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => Array.isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });

    test('correctly runs with variables', async () => {
      await expect(
        (async () => {
          const result = JSON.parse(
            await execute(
              [
                'run',
                'pipeline',
                '--project-id',
                knownIds.project,
                '--revision-id',
                knownIds.pipelineRevision,
                '--var',
                '\'string_variable:"string"\'',
                '--var',
                '\'string_array_variable:["string", "array"]\'',
                '--var',
                "'number_variable:123'",
                '--var',
                "'number_array_variable:[100, 123]'",
                '--var',
                "'boolean_variable:true'",
                knownIds.pipeline,
                '--wait',
                '--format=json'
              ],
              { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
            )
          );

          if (!Array.isArray(result)) {
            throw new Error('Expected array to be received!');
          }
          const ret = result.find(
            (entry) =>
              entry.message === 'Debug message' && entry.code === 'StepOutput'
          );
          if (isNil(ret)) {
            throw new Error('Expected debug step output to be presented!');
          }

          return JSON.parse(ret.details);
        })()
      ).resolves.toStrictEqual({
        string_variable: 'string',
        string_array_variable: ['string', 'array'],
        number_variable: 123,
        number_array_variable: [100, 123],
        boolean_variable: true
      });
    });
  });

  describe('with --wait', () => {
    let runId: string;
    beforeAll(async () => {
      const data = JSON.parse(
        await execute(
          [
            'run',
            'pipeline',
            '--project-id',
            knownIds.project,
            '--revision-id',
            knownIds.pipelineRevision,
            knownIds.pipeline,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        )
      );

      runId = data._id;
    });

    test('waits until run is finished', async () => {
      await expect(
        execute(
          [
            'get',
            'run',
            '--project-id',
            knownIds.project,
            '--wait',
            runId,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => Array.isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });
  });

  describe('job', () => {
    test('returns run object without --wait flag', async () => {
      await expect(
        execute(
          [
            'run',
            'job',
            '--project-id',
            knownIds.project,
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
            knownIds.job,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => JSON.parse(value))
      ).resolves.toHaveProperty('status', 'Queued');
    });

    test('returns an array of events with --wait flag', async () => {
      await expect(
        execute(
          [
            'run',
            'job',
            '--project-id',
            knownIds.project,
            '--wait',
            knownIds.job,
            '--format=json'
          ],
          { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => Array.isArray(JSON.parse(value)))
      ).resolves.toBeTruthy();
    });

    test('correctly runs with variables', async () => {
      await expect(
        (async () => {
          const result = JSON.parse(
            await execute(
              [
                'run',
                'job',
                '--project-id',
                knownIds.project,
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
                '--wait',
                knownIds.job,
                '--format=json'
              ],
              { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
            )
          );

          if (!Array.isArray(result)) {
            throw new Error('Expected array to be received!');
          }

          const ret = result.find(
            (entry) =>
              entry.message === 'Debug message' && entry.code === 'StepOutput'
          );
          if (isNil(ret)) {
            throw new Error('Expected debug step output to be presented!');
          }

          return JSON.parse(ret.details);
        })()
      ).resolves.toStrictEqual({
        string_array_variable: ['string', 'array'],
        string_variable: 'string',
        number_array_variable: [100, 123],
        number_variable: 123,
        boolean_variable: true
      });
    });
  });
});
