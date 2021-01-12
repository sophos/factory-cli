import isString from 'lodash/isString';
import { JSONPath as jsonFilter } from 'jsonpath-plus';

type Filterer = (input: any) => any;

export default function filterer(filter: string, fields: string[]): Filterer {
  return (input: any) => {
    if (isString(filter)) {
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
