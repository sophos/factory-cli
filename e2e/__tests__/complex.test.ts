import * as faker from 'faker';

import { executeAsIs } from '../helpers/execute';
import { withCmd } from '../helpers/options';
import knownIds from '../helpers/knowIds';

describe('complex', () => {
  jest.setTimeout(20000);

  test('get -> get (project)', async () => {
    await expect(
      executeAsIs(
        `echo $(${withCmd(
          `get project --filter _id --format yaml ${knownIds.static.project}`
        )}) | ${withCmd('get project --format json')}`,
        { token: process.env.STATIC_REFACTR_AUTH_TOKEN! }
      ).then((str) => JSON.parse(str))
    ).resolves.toHaveProperty('_id', knownIds.static.project);
  });

  test('create -> get -> delete (pipeline)', async () => {
    await expect(
      executeAsIs(
        `${withCmd(
          `create pipeline --name=${faker.random.word()} --project-id ${
            knownIds.dynamic.project
          } --filter='$._id' --format=json`
        )} | ${withCmd(
          `get pipeline --project-id ${knownIds.dynamic.project} --filter='$._id' --format=json`
        )} | ${withCmd(
          `delete pipeline --project-id ${knownIds.dynamic.project} --format=json`
        )}`,
        { token: process.env.DYNAMIC_REFACTR_AUTH_TOKEN! }
      ).then((data) => JSON.parse(data))
    ).resolves.toHaveProperty('_id');
  });
});
