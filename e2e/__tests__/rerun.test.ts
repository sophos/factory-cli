/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { execute } from '../helpers/execute';
import knownIds from '../helpers/knowIds';
import isArray from 'lodash/isArray';

describe('refactrctl rerun', () => {
  // Give platform time to bootstrap runner.
  jest.setTimeout(60 * 1000);

  test('throws on missing arguments', async () => {
    await expect(
      execute(['run', 'pipeline'], {
        token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN!
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
          knownIds.dynamic.run,
          '--format=json'
        ],
        { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
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
          knownIds.dynamic.run,
          '--wait',
          '--format=json'
        ],
        { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
      ).then((value) => isArray(JSON.parse(value)))
    ).resolves.toBeTruthy();
  });
});
