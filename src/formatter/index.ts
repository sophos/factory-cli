import formatterMap from './formatterMap';
import { Formatter, FormatType } from './formatter';

export type { Formatter, FormatType };

export const DATA_FORMATTER: FormatType = 'table';
export const EVENT_FORMATTER: FormatType = 'log';

export default function formatter(
  formatType: FormatType = DATA_FORMATTER,
  fields: string[]
) {
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
