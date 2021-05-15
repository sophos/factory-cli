import isNil from 'lodash/isNil';

import formatterMap from './formatterMap';
import { Formatter, FormatType, RawFormatType } from './formatter';

export type { Formatter, RawFormatType, FormatType };

export const DEFAULT_FORMATTER: RawFormatType = 'wide';

export default function formatter(formatType: FormatType, fields: string[]) {
  return (input: unknown): string => {
    if (isNil(input)) {
      input = null;
    }

    try {
      return formatterMap[formatType](input, fields);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return isNil(input) ? 'null' : (input as any).toString();
    }
  };
}

export function toFormatType(format: RawFormatType, isLog = false): FormatType {
  if (format === 'wide') {
    return isLog ? 'log' : 'table';
  }

  return format;
}
