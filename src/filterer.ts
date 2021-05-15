import isString from 'lodash/isString';
import { JSONPath as jsonFilter } from 'jsonpath-plus';
import { CommandResultType } from './cmd/handler';

export default function filterer(
  filter: string | null,
  fields: string[],
  type: CommandResultType
): Filterer {
  return (input) => {
    if (type !== 'error' && isString(filter)) {
      return jsonFilter({
        path: filter,
        json: input,
        flatten: false,
        wrap: false
      });
    }

    return input;
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Filterer = (input: any) => unknown;
