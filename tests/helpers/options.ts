import * as assert from 'assert';
import { List } from 'lodash';
import isNil from 'lodash/isNil';

export const withAddress = (args: string[]): string[] => {
  assert.ok(!isNil(process.env.FACTORY_ADDRESS));

  const ret = [...args];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  ret.push('--address', process.env.FACTORY_ADDRESS!);

  return ret;
};

export const withFormat = (
  args: string[],
  format: 'json' | 'yaml' | 'wide'
): List<string> => {
  const ret = [...args];
  ret.push('--format', format);

  return ret;
};

export const withCmd = (args: string): string =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  `${process.env.FACTORY_CLI_PATH!} ${args}`;
