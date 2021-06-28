/* eslint-disable @typescript-eslint/no-non-null-assertion */
import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

import { execute } from '../helpers/execute';
import knownIds from '../helpers/knowIds';

describe('refactrctl run', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(60 * 1000);
  describe('pipeline', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['run', 'pipeline'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('returns run object without --wait flag', async () => {
      await expect(
        execute(
          [
            'run',
            'pipeline',
            '--project-id',
            knownIds.dynamic.project,
            '--revision-id',
            knownIds.dynamic.pipelineRevision,
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
            knownIds.dynamic.pipeline,
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
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
            knownIds.dynamic.project,
            '--revision-id',
            knownIds.dynamic.pipelineRevision,
            knownIds.dynamic.pipeline,
            '--wait',
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => isArray(JSON.parse(value)))
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
                knownIds.dynamic.project,
                '--revision-id',
                knownIds.dynamic.pipelineRevision,
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
                knownIds.dynamic.pipeline,
                '--wait',
                '--format=json'
              ],
              { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
            )
          );

          if (!isArray(result)) {
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

  describe('job', () => {
    test('throws on missing arguments', async () => {
      await expect(
        execute(['run', 'job'], {
          token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN!
        })
      ).rejects.toMatchSnapshot();
    });

    test('returns run object without --wait flag', async () => {
      await expect(
        execute(
          [
            'run',
            'job',
            '--project-id',
            knownIds.dynamic.project,
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
            knownIds.dynamic.job,
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
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
            knownIds.dynamic.project,
            '--wait',
            knownIds.dynamic.job,
            '--format=json'
          ],
          { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
        ).then((value) => isArray(JSON.parse(value)))
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
                knownIds.dynamic.project,
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
                knownIds.dynamic.job,
                '--format=json'
              ],
              { token: process.env.REFACTR_DYNAMIC_AUTH_TOKEN! }
            )
          );

          if (!isArray(result)) {
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
