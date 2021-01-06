import formatterMap from './formatterMap';
import { Formatter, FormatType, RawFormatType } from './formatter';

export type { Formatter, RawFormatType, FormatType };

export const DEFAULT_FORMATTER: RawFormatType = 'wide';

export default function formatter(formatType: FormatType, fields: string[]) {
  return (input: any): string => {
    try {
      return formatterMap[formatType](input, fields);
    } catch (err) {
      // TODO(.): should we print warning in all modes, or only human-readable one?
      console.warn('Unable to format provided value!');
      return input.toString();
    }
  };
}

export function toFormatType(
  format: RawFormatType,
  isLog: boolean = false
): FormatType {
  if (format === 'wide') {
    return isLog ? 'log' : 'table';
  }

  return format;
}
