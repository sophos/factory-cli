/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from './helpers/execute';
import knownIds from './helpers/knownIds';
import parseOutput, { asJson } from './helpers/parseOutput';

describe('factoryctl rerun', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(300 * 1000);

  let runId: string;
  beforeAll(async () => {
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
    ).then((result) => {
      const data = parseOutput(result, asJson);
      runId = data._id;
      return data;
    });

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
      ).then((result) => parseOutput(result, asJson))
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
      ).then((result) => parseOutput(result, asJson))
    ).resolves.toBeInstanceOf(Array);
  });
});
