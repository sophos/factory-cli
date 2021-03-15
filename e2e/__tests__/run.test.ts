import isArray from 'lodash/isArray';
import isNil from 'lodash/isNil';

import { execute } from '../helpers/execute';
import knownIds from '../helpers/knowIds';

describe('refactrctl run', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(60 * 1000);
  describe('pipeline', () => {
    test('it should correctly run with variables', async () => {
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
              { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
            )
          );

          if (!isArray(result)) {
            throw new Error('Expected array to be received!');
          }

          const ret = result.find(
            (entry: any) =>
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
    test('it should correctly run with variables', async () => {
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
              { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
            )
          );

          if (!isArray(result)) {
            throw new Error('Expected array to be received!');
          }

          const ret = result.find(
            (entry: any) =>
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
