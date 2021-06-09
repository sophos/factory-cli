/* eslint-disable @typescript-eslint/no-non-null-assertion */

import isArray from 'lodash/isArray';
import { execute } from '../helpers/execute';
import knownIds from '../helpers/knowIds';

describe('refactrctl wait-run', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(60 * 1000);

  let runId: string;
  beforeAll(async () => {
    const data = JSON.parse(
      await execute(
        [
          'run',
          'pipeline',
          '--project-id',
          knownIds.dynamic.project,
          '--revision-id',
          knownIds.dynamic.pipelineRevision,
          knownIds.dynamic.pipeline,
          '--format=json'
        ],
        { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
      )
    );

    runId = data._id;
  });

  test('throws on missing arguments', async () => {
    await expect(
      execute(['wait-run'], {
        token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
      })
    ).rejects.toMatchSnapshot();
  });

  test('should work', async () => {
    await expect(
      execute(
        [
          'wait-run',
          '--project-id',
          knownIds.dynamic.project,
          runId,
          '--format=json'
        ],
        { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
      ).then((value) => isArray(JSON.parse(value)))
    ).resolves.toBeTruthy();
  });
});
