import isNil from 'lodash/isNil';

import humanify from './humanify';
import { Formatter } from './formatter';

const logFormatter: Formatter = function logFormatter(
  input: { [key: string]: unknown },
  fields: string[]
): string {
  return fields
    .map((f) =>
      input[f] === '' || isNil(input[f]) ? null : humanify(input[f])
    )
    .filter((f) => !isNil(f))
    .join(' ');
};

export default logFormatter;
