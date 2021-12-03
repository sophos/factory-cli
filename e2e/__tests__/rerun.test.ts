/* eslint-disable @typescript-eslint/no-non-null-assertion */

import isArray from 'lodash/isArray';
import { execute } from '../helpers/execute';
import knownIds from '../helpers/knownIds';

describe('refactrctl rerun', () => {
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
        { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
      )
    );

    runId = data._id;

    // Wait until run is finished.
    return await execute(
      ['get', 'run', '--project-id', knownIds.dynamic.project, '--wait', runId],
      { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
    );
  });

  test('throws on missing arguments', async () => {
    await expect(
      execute(['run', 'pipeline'], {
        token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN!
      })
    ).rejects.toMatchSnapshot();
  });

  test('returns run object with rerunning without --wait flag', async () => {
    await expect(
      execute(
        [
          'rerun',
          '--project-id',
          knownIds.dynamic.project,
          runId,
          '--format=json'
        ],
        { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
      ).then((value) => JSON.parse(value))
    ).resolves.toHaveProperty('status', 'Queued');
  });

  test('returns array of events when running with --wait flag', async () => {
    await expect(
      execute(
        [
          'rerun',
          '--project-id',
          knownIds.dynamic.project,
          runId,
          '--wait',
          '--format=json'
        ],
        { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
      ).then((value) => isArray(JSON.parse(value)))
    ).resolves.toBeTruthy();
  });
});
