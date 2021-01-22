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
          `get project --filter _id --format yaml ${knownIds.project}`
        )}) | ${withCmd('get project --format json')}`
      ).then((str) => JSON.parse(str))
    ).resolves.toHaveProperty('_id', knownIds.project);
  });

  test.skip('create -> get -> delete (project)', async () => {
    await executeAsIs(
      `${withCmd(
        `create --name=${faker.name.title()} --filter='_id' --format=yaml`
      )} | ${withCmd('')}`
    );
  });
});
