import * as assert from 'assert';

import isNil from 'lodash/isNil';

export const withAddress = (args: string[]): string[] => {
  assert.ok(!isNil(process.env.REFACTR_ADDRESS));

  const ret = [...args];
  ret.push('--address', process.env.REFACTR_ADDRESS!);

  return ret;
};

export const withFormat = (
  args: string[],
  format: 'json' | 'yaml' | 'wide'
) => {
  const ret = [...args];
  ret.push('--format', format);

  return ret;
};

export const withCmd = (args: string) => {
  return `${process.env.__REFACTR_COMMAND__!} ${args}`;
};
