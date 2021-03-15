import isString from 'lodash/isString';
import { JSONPath as jsonFilter } from 'jsonpath-plus';
import { CommandResultType } from './cmd/handler';

export default function filterer(
  filter: string | null,
  fields: string[],
  type: CommandResultType
): Filterer {
  return (input: any) => {
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

type Filterer = (input: any) => any;
