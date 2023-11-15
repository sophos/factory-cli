/* eslint-disable @typescript-eslint/no-non-null-assertion */

import * as faker from 'faker';
import { executeAsIs } from './helpers/execute';
import knownIds from './helpers/knownIds';
import { withCmd } from './helpers/options';
import parseOutput, { asJson } from './helpers/parseOutput';

describe('complex', () => {
  jest.setTimeout(20000);

  test('get -> get (project)', async () => {
    await expect(
      executeAsIs(
        `echo $(${withCmd(
          `get project --filter _id --format yaml ${knownIds.project}`
        )}) | ${withCmd('get project --format json')}`,
        { token: process.env.FACTORY_STATIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result, asJson))
    ).resolves.toHaveProperty('_id', knownIds.project);
  });

  test('create -> get -> delete (pipeline)', async () => {
    await expect(
      executeAsIs(
        `${withCmd(
          `create pipeline --name=${faker.random.word()} --project-id ${
            knownIds.project
          } --filter='$._id' --format=json`
        )} | ${withCmd(
          `get pipeline --project-id ${knownIds.project} --filter='$._id' --format=json`
        )} | ${withCmd(
          `delete pipeline --project-id ${knownIds.project} --format=json`
        )}`,
        { token: process.env.FACTORY_DYNAMIC_AUTH_TOKEN! }
      ).then((result) => parseOutput(result, asJson))
    ).resolves.toHaveProperty('_id');
  });
});
