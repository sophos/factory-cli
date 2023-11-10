/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';

describe('factoryctl rerun', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(300 * 1000);

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

    // Wait until run is finished.
    return await execute(
      ['get', 'run', '--project-id', knownIds.project, '--wait', runId],
      { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
    );
  });

  test('returns run object with rerunning without --wait flag', async () => {
    await expect(
      execute(
        ['rerun', '--project-id', knownIds.project, runId, '--format=json'],
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
          knownIds.project,
          runId,
          '--wait',
          '--format=json'
        ],
        { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
      ).then((value) => Array.isArray(JSON.parse(value)))
    ).resolves.toBeTruthy();
  });
});
