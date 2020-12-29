import isNil from 'lodash/isNil';

import humanify from './humanify';

export default function logFormatter(
  input: { [key: string]: any },
  fields: string[]
): string {
  return fields
    .map((f) =>
      input[f] === '' || isNil(input[f]) ? null : humanify(input[f])
    )
    .filter((f) => !isNil(f))
    .join(' ');
}